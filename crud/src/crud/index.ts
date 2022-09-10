import { mergeWith, Rule, SchematicContext, Tree, url, apply, template, strings } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function crud(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('Running schematics with following options', _options);

    const sourceTpl = url('./files');
    const sourceTplParametrized = apply(sourceTpl, [template({
      ..._options,
      ...strings
    })]);

    return mergeWith(sourceTplParametrized)(tree, _context);
  };
}
