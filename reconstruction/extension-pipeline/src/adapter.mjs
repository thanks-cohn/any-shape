import {join} from 'node:path';
import {readFile, lstat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {readTree, fail, digest} from './safety.mjs';
import {validateContract, planContract} from './contract.mjs';

export const TARGETS=Object.freeze(['windows','linux','android']);
export const RELEASE_CHECKS=Object.freeze(['architecture','build','package','install','launch','domain','ui','persistence','effects','denied-permissions','security','accessibility','resources','upgrade','recovery','license','release-review']);
const projectTree=root=>readTree(root,{}, {excludeDirectories:['bin','obj']});
const xml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
// TargetAdapter is a replaceable implementation interface, not part of EIR.
export class TargetAdapter {
  assess() { throw new Error('TargetAdapter.assess must be implemented'); }
  generate() { throw new Error('TargetAdapter.generate must be implemented'); }
}
export class AvaloniaAdapter extends TargetAdapter {
  assess(contract,target) {
    if (!TARGETS.includes(target)) fail('INVALID_TARGET','Expected windows, linux or android.');
    return planContract(contract).targets[target];
  }
  generate(contract,target) {
    validateContract(contract,{accepted:true});
    const assessment=this.assess(contract,target);
    const active=assessment.capabilities.filter(x=>['preserve','correct'].includes(x.disposition));
    const label=xml(contract.source.name);
    const mobile=target==='android';
    const project=`<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>${mobile?'Exe':'WinExe'}</OutputType>
    <TargetFramework>${mobile?'net10.0-android':'net10.0'}</TargetFramework>
    <Nullable>enable</Nullable><ImplicitUsings>enable</ImplicitUsings>
    <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
    ${mobile?'<SupportedOSPlatformVersion>23</SupportedOSPlatformVersion><ApplicationId>org.anyshape.candidate</ApplicationId><ApplicationVersion>1</ApplicationVersion><ApplicationDisplayVersion>0.1</ApplicationDisplayVersion>':''}
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Avalonia" Version="12.1.4" />
    <PackageReference Include="${mobile?'Avalonia.Android':'Avalonia.Desktop'}" Version="12.1.4" />
    <ProjectReference Include="Domain/Domain.csproj" />
    <Compile Remove="Domain/**/*.cs" />
  </ItemGroup>
</Project>
`;
    const files={
      'Candidate.csproj':project,
      'global.json':JSON.stringify({sdk:{version:'10.0.402',rollForward:'latestPatch'}},null,2)+'\n',
      'Domain/Domain.csproj':'<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework><Nullable>enable</Nullable><ImplicitUsings>enable</ImplicitUsings></PropertyGroup></Project>\n',
      'Domain/Contract.cs':`namespace Candidate.Domain;\n// Traceability metadata only; application behavior remains unimplemented.\npublic static class Contract { public const string Hash = "${digest(contract)}"; public static readonly string[] Requirements = [${active.map(x=>JSON.stringify(x.id)).join(',')}]; }\n`,
      'App.cs':`using Avalonia;\nusing Avalonia.Controls;\nusing Avalonia.Controls.ApplicationLifetimes;\nnamespace Candidate;\npublic sealed class App : Application {\n public override void OnFrameworkInitializationCompleted() {\n  var notice = new TextBlock { Text = "INCOMPLETE reconstruction candidate. No extension behavior implemented.", TextWrapping = Avalonia.Media.TextWrapping.Wrap, Margin = new Thickness(24) };\n  if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop) desktop.MainWindow = new Window { Content = notice, Title = "Incomplete candidate" };\n  else if (ApplicationLifetime is ISingleViewApplicationLifetime mobile) mobile.MainView = notice;\n  base.OnFrameworkInitializationCompleted();\n }\n}\n`,
      'README.md':`# ${label}: ${target} candidate\n\nINCOMPLETE SKELETON. This is a native host and traceability starting point, not a reconstructed application. ${active.length} accepted capabilities still require implementation. Never promote this candidate.\n\nDependencies: .NET 10 SDK, Avalonia 12.1.4; Android additionally needs the Android workload, SDK and JDK. These candidate pins have not been validated on all hosts.\n\nFrom this directory: dotnet restore Candidate.csproj --use-lock-file; dotnet build Candidate.csproj --no-restore. Retain the resolved packages.lock.json and verify package provenance. For Windows publish use win-x64 on Windows, Linux linux-x64 on Linux; Android requires signed APK/AAB packaging and a device/emulator. A desktop build proves nothing about mobile.\n\nImplement obligations in context.json; replace the incomplete notice with reviewed behavior. Every target requires separate install, runtime, effect, accessibility, security and release evidence.\n`,
      'architecture.json':JSON.stringify({schemaVersion:1,target,layers:{Domain:{scope:'shared-domain',references:[]},Host:{scope:target,references:['Domain/Domain.csproj']}}},null,2)+'\n',
      'context.json':JSON.stringify({extensionId:contract.extensionId,sourceHash:contract.source.sha256,contractHash:digest(contract),...assessment},null,2)+'\n'
    };
    if (mobile) {
      files['MainActivity.cs']=`using Android.App;\nusing Android.Content.PM;\nusing Avalonia;\nusing Avalonia.Android;\nnamespace Candidate;\n[Activity(Label = "Incomplete candidate", MainLauncher = true, ConfigurationChanges = ConfigChanges.Orientation | ConfigChanges.ScreenSize | ConfigChanges.UiMode)]\npublic class MainActivity : AvaloniaMainActivity<App> { protected override AppBuilder CustomizeAppBuilder(AppBuilder builder) => base.CustomizeAppBuilder(builder); }\n`;
      files['Properties/AndroidManifest.xml']='<manifest xmlns:android="http://schemas.android.com/apk/res/android"><application android:label="Incomplete candidate" android:allowBackup="false" /></manifest>\n';
    } else files['Program.cs']='using Avalonia;\nnamespace Candidate;\ninternal static class Program { [System.STAThread] public static void Main(string[] args) => AppBuilder.Configure<App>().UsePlatformDetect().StartWithClassicDesktopLifetime(args); }\n';
    files['product.json']=JSON.stringify({format:'any-shape-candidate',schemaVersion:1,extensionId:contract.extensionId,target,sourceHash:contract.source.sha256,contractHash:digest(contract),framework:'avalonia',frameworkVersion:'12.1.4',status:'INCOMPLETE',implementedCapabilities:[],remainingCapabilities:active.map(x=>x.id),releaseEligible:false},null,2)+'\n';
    return files;
  }
}
// Conservative source/dependency boundary lint, not a C# compiler or security sandbox.
// Generated projects are deliberately restricted to inward Domain references.
export async function lintArchitecture(root,target) {
  if (!TARGETS.includes(target)) fail('INVALID_TARGET','Invalid architecture target.');
  const tree=await projectTree(root), violations=[];
  for (const file of tree) {
    const text=file.content.toString('utf8');
    if (/\.(cs|csproj|props|targets)$/.test(file.path)) {
      const domain=file.path.startsWith('Domain/');
      const patterns=domain?[/\b(?:Avalonia|Android|Microsoft\.Win32|System\.Windows|Windows|Gtk|System\.IO|System\.Net|System\.Diagnostics)\b/g]:target==='android'?[/\b(?:Avalonia\.Desktop|Microsoft\.Win32|System\.Windows|Windows|Gtk)\b/g]:[/\b(?:Avalonia\.Android|Android)\b/g];
      for (const pattern of patterns) for (const match of text.matchAll(pattern)) violations.push({code:'FORBIDDEN_TARGET_DEPENDENCY',path:file.path,reference:match[0]});
      for (const match of text.matchAll(/<ProjectReference\b[^>]*Include\s*=\s*["']([^"']+)["']/g)) {
        if (domain || match[1]!=='Domain/Domain.csproj') violations.push({code:'FORBIDDEN_PROJECT_REFERENCE',path:file.path,reference:match[1]});
      }
      for (const match of text.matchAll(/<PackageReference\b[^>]*Include\s*=\s*["']([^"']+)["']/g)) {
        const allowed=target==='android'?['Avalonia','Avalonia.Android']:['Avalonia','Avalonia.Desktop'];
        if (domain || !allowed.includes(match[1])) violations.push({code:'FORBIDDEN_PACKAGE_REFERENCE',path:file.path,reference:match[1]});
      }
      if (/<(?:Reference|HintPath)\b|<(?:Compile|Content|None)\b[^>]*Include\s*=\s*["'][^"']*(?:\.\.|[A-Za-z]:|\\)/.test(text)) violations.push({code:'UNSAFE_PROJECT_ITEM',path:file.path});
      if (/<(?:Import|Exec|UsingTask)\b|\b(?:DllImport|LibraryImport)\s*\(/.test(text)) violations.push({code:'UNREVIEWED_BUILD_OR_NATIVE_CODE',path:file.path});
    }
  }
  return {target,status:violations.length?'FAIL':'PASS',violations,note:'Conservative lexical dependency check; compiler, dynamic access, native integrations and host security need independent checks.'};
}
export async function verifyCandidate(root,target,{build=false}={}) {
  const architecture=await lintArchitecture(root,target);
  const product=JSON.parse(await readFile(join(root,'product.json'),'utf8'));
  if (product.target!==target) fail('TARGET_MISMATCH','Candidate evidence cannot be reused for another target.');
  const tree=await projectTree(root);
  let sourceHash=digest(tree.map(({content,...file})=>file));
  const checks=Object.fromEntries(RELEASE_CHECKS.map(check=>[check,{status:'NOT_RUN',reason:'No independent target evidence collected.'}]));
  checks.architecture=architecture;
  let command=null;
  if (build) {
    const probe=spawnSync('dotnet',['--version'],{encoding:'utf8',timeout:15000});
    if (probe.error?.code==='ENOENT') checks.build={status:'NOT_RUN',reason:'.NET SDK is not installed.'};
    else if (architecture.status!=='PASS') checks.build={status:'NOT_RUN',reason:'Architecture gate failed.'};
    else {
      command=['dotnet','build','Candidate.csproj','--nologo',...(target==='android'?[]:['--runtime',target==='windows'?'win-x64':'linux-x64'])];
      const run=spawnSync(command[0],command.slice(1),{cwd:root,encoding:'utf8',timeout:120000,maxBuffer:2*1024*1024});
      checks.build={status:run.status===0?'PASS':'FAIL',exitCode:run.status,sdk:probe.stdout?.trim(),stdout:run.stdout||'',stderr:run.stderr||'',error:run.error?.message||null};
    }
  }
  const builtTree=await projectTree(root);
  sourceHash=digest(builtTree.map(({content,...file})=>file));
  const dependencyLocks=builtTree.filter(file=>file.path.endsWith('packages.lock.json')).map(({content,...file})=>file);
  return {format:'any-shape-target-evidence',schemaVersion:1,target,buildHost:{os:process.platform,architecture:process.arch},sourceHash,contractHash:product.contractHash,sourceExtensionHash:product.sourceHash,candidateStatus:product.status,command,dependencyLocks,checks,releaseEligible:false};
}
export function assertPromotable(product,evidence) {
  if (product.status!=='IMPLEMENTED' || product.releaseEligible!==true) fail('INCOMPLETE_CANDIDATE','Incomplete scaffolds cannot be packaged as releases or promoted.');
  if (product.target!==evidence.target || product.contractHash!==evidence.contractHash || product.sourceHash!==evidence.sourceExtensionHash) fail('EVIDENCE_MISMATCH','Evidence is not bound to this target, source and contract.');
  for (const check of RELEASE_CHECKS) if (evidence.checks?.[check]?.status!=='PASS') fail('RELEASE_GATE_FAILED',`Missing independent ${check} PASS for ${product.target}.`);
  // Importing user-authored PASS JSON is not independent proof. No trusted
  // evaluator attestation adapter has been implemented yet; fail closed.
  fail('EVALUATOR_NOT_CONFIGURED','Trusted independent evaluator/attestation integration is required before release promotion.');
}
