import { mergeWith, Rule, SchematicContext, Tree, url, apply, template, strings, SchematicsException, move } from '@angular-devkit/schematics';
import { parseName } from "@schematics/angular/utility/parse-name";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function crud(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceAsBuffer = tree.read('angular.json');
    if (!workspaceAsBuffer) {
      throw new SchematicsException('We are not inside of Angular CLI workspace');
    }

    const workspace = JSON.parse(workspaceAsBuffer.toString());
    const projectName = _options.project || workspace.defaultProject;
    const project = workspace.projects[projectName];
    const sourceRoot = project.sourceRoot;
    const projectType = project.projectType;
    const type = projectType === 'application' ? 'app' : 'lib';
    const path = `${sourceRoot}/${type}`;
    const parsed = parseName(path, _options.name);
    _options.name = parsed.name;

    const sourceTpl = url('./files');
    const sourceTplParametrized = apply(sourceTpl, [
      template({ ..._options, ...strings }),
      move(parsed.path)
    ]);

    return mergeWith(sourceTplParametrized)(tree, _context);
  };
}
