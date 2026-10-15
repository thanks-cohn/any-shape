#!/usr/bin/env node
import {inspectExtension} from '../src/inspect.mjs';
try {
  if(process.argv.length!==3)throw new Error('usage: node inspect.mjs <unpacked-extension-directory>');
  process.stdout.write(JSON.stringify(await inspectExtension(process.argv[2]),null,2)+'\n');
} catch(e){process.stderr.write('Inspection failed: '+e.message+'\n');process.exitCode=1;}
