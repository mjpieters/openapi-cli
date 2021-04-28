// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E path-not-include-query-error 1`] = `

No configurations were defined in extends -- using built in recommended configuration by default.

validating /openapi.yaml...
[1] openapi.yaml:10:3 at #/paths/~1ping~1items?id=###

Don't put query string items in the path, they belong in parameters with \`in: query\`.

 8 |
 9 | paths:
10 |   '/ping/items?id=###':
   |   ^^^^^^^^^^^^^^^^^^^^
11 |     get:
12 |       operationId: getUserProfileById

Error was generated by the path-not-include-query rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 1 error.
run with \`--generate-ignore-file\` to add all problems to ignore file.


`;