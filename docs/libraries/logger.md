# Logger

Logging library to handle various log levels.

## Reference

### Object - levels

Levels constants - see [src/constants/logLevels.js](../../src/constants/logLevels.js) for all log levels.

### Function - log (default)

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| level | Log level from `levels` | String | ✗ | INFO |
| context | Object containing log context, must have key `id` | Object | ✓ | - |

### Function - debug

Useful for development, will not log in production

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| context | Object containing log context, must have key `id` | Object | ✓ | - |

### Function - info

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| context | Object containing log context, must have key `id` | Object | ✓ | - |

### Function - warn

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| context | Object containing log context, must have key `id` | Object | ✓ | - |

### Function - error

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| context | Object containing log context | Object | ✓ | - |
| context.id | Context id | String | ✓ | - |
| context.error | Error object | Error | ✓ | - |
| context.description | Description of the error | String | ✗ | Defaults to context.error.message |
| context.fatal | Is the Error fatal? | Boolean | ✗ | false |
| context.args | List of arguments to provide context to the error | Array | ✗ | [] |
