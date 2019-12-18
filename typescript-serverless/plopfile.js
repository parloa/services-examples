module.exports = function(plop) {
  plop.setGenerator("service", {
    description: "add a new service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name (folder/class/path name):"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/services/{{name}}/index.ts",
        templateFile: "plop-templates/service/index.hbs"
      },
      {
        type: "add",
        path: "src/services/{{name}}/index.test.ts",
        templateFile: "plop-templates/service/index.test.hbs"
      },
      {
        type: "add",
        path: "src/services/{{name}}/interfaces.ts",
        templateFile: "plop-templates/service/interfaces.ts"
      },
      {
        type: "append",
        pattern: /export const routes \= \{/,
        path: "src/services/routes.ts",
        template: "  {{name}},"
      },
      {
        type: "append",
        pattern: /import \{ .* \} from \'\.\/.*\/index';/,
        path: "src/services/routes.ts",
        template: "import { {{name}} } from './{{name}}/index';"
      },
      {
        type: "append",
        pattern: /functions\:/,
        path: "serverless.yml",
        template: `  {{name}}:
    handler: handler.entry
    events:
      - http:
          path: /{{name}}/
          method: ANY
          private: true`
      }
    ]
  });
  plop.setGenerator("rename-project", {
    description: "change the name of the project",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "project name:"
      }
    ],
    actions: [
      {
        type: "modify",
        pattern: /service\: .*/,
        path: "serverless.yml",
        template: "service: {{name}}"
      },
      {
        type: "modify",
        pattern: /  apiKeys:\n    - name:.*/,
        path: "serverless.yml",
        template: "  apiKeys:\n    - name: {{name}}"
      }
    ]
  });
};
