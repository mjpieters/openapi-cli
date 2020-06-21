import { outdent } from 'outdent';

import { LintConfig } from '../../../config/config';

import { validateDocument } from '../../../validate';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../__tests__/utils';

describe('Oas3 operation-operationId-unique', () => {
  it('should report on for non-unique opid', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths:
            '/test':
              get:
                operationId: test
              post:
                summary: no id
            '/test2':
              get:
                operationId: test2
              post:
                operationId: test2
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'operation-operationId-unique': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/paths/~1test2/post/test2",
              "reportOnKey": false,
              "source": "foobar.yaml",
            },
          ],
          "message": "Every operation must have a unique \`operationId\`",
          "ruleId": "operation-operationId-unique",
          "severity": "error",
          "suggest": Array [],
        },
      ]
    `);
  });

  it('should not report on operation object if only one tag', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths:
            '/test':
              get:
                operationId: test
              post:
                operationId: test2
            '/test2':
              post:
                operationId: test3
        `,
      'foobar.yaml',
    );

    const results = await validateDocument({
      document,
      config: new LintConfig({ extends: [], rules: { 'peration-operationId-unique': 'error' } }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });
});