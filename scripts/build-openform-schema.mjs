import ts from 'typescript';
import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const source = fileURLToPath(new URL('../examples/openform-schema/app.ts', import.meta.url));
const destination = fileURLToPath(new URL('../examples/openform-schema/app.js', import.meta.url));
const input = await readFile(source,'utf8');
const result = ts.transpileModule(input,{
 fileName:'app.ts',reportDiagnostics:true,
 compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022,strict:true}
});
if(result.diagnostics?.some(d=>d.category===ts.DiagnosticCategory.Error)){
 for(const d of result.diagnostics)console.error(ts.flattenDiagnosticMessageText(d.messageText,'\n'));
 process.exitCode=1;
}else{
 await writeFile(destination,'// Generated from app.ts by npm run build:openform-schema. Do not hand edit.\n'+result.outputText);
 console.log('Built examples/openform-schema/app.js from TypeScript source');
}
