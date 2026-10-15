import {AdapterCatalog} from './registry.mjs';
import {ChromeExtensionSourceAdapter} from '../sources/chrome-extension.mjs';
import {SpecificationSourceAdapter} from '../sources/specification.mjs';
import {PlannedSourceAdapter} from '../sources/planned.mjs';
import {AvaloniaTargetAdapter} from '../targets/avalonia.mjs';
import {PlannedTargetAdapter} from '../targets/planned.mjs';
export function builtinAdapters() {
  return new AdapterCatalog()
    .register('source',new ChromeExtensionSourceAdapter())
    .register('source',new SpecificationSourceAdapter())
    .register('source',new PlannedSourceAdapter('android-source',['android-source','android-binary']))
    .register('source',new PlannedSourceAdapter('desktop-source',['desktop-source','desktop-binary']))
    .register('target',new AvaloniaTargetAdapter())
    .register('target',new PlannedTargetAdapter('browser-extension',['browser-extension']));
}
