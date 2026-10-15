#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(readFileSync(join(root,'toolchains.json'),'utf8'));
const run=(cmd,args)=>{const r=spawnSync(cmd,args,{encoding:'utf8',timeout:30000});return {ok:r.status===0,detail:(r.stdout||r.stderr||'').trim().slice(0,2000)}};
const dotnet=run('dotnet',['--version']);
const templates=dotnet.ok?run('dotnet',['new','list','avalonia.xplat']):{ok:false,detail:'dotnet unavailable'};
const workloads=dotnet.ok?run('dotnet',['workload','list']):{ok:false,detail:'dotnet unavailable'};
const report={format:'any-shape-avalonia-preflight',schemaVersion:1,requiredAvaloniaVersion:config.avaloniaVersion,dotnet,templates:{...templates,available:templates.ok&&templates.detail.includes('avalonia.xplat')},androidWorkload:{...workloads,available:workloads.ok&&/^android\s/m.test(workloads.detail)},cachePresent:existsSync(join(root,'.cache/avalonia/nuget')),note:'Environment report, not a platform runtime acceptance test'};
process.stdout.write(JSON.stringify(report,null,2)+'\n');
process.exitCode=dotnet.ok?0:2;
