# Analytics

Analytics tracker which tracks to GA using [react-ga](http://npmjs.com/package/react-ga)

## Reference

### Function - initialize

Must be called first to initialize GA instance.

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| trackingID | GA tracking id | String | ✓ | - |
| options | Options passed to `ReactGA.initialize` | Object | ✗ | {} |

### Function - pageView

Tracks a page view

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| path | Path to the page | String | ✓ | - |

### Function - modalView

Tracks a modal view

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| name | Name of the modal | String | ✓ | - |

### Function - capture

An event triggered by a users action

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| params | Params object | Object | ✓ | - |
| params.category | Category of the event | String | ✓ | - |
| params.action | The action taken | String | ✓ | - |
| params.label | Further categorization | String | ✗ | - |
| params.value | Value attached to the event | Integer | ✗ | - |

### Function - click

Click event, will track the event as well as DOM co-ordinates where window dimensions can be retrieved

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| params | Params object | Object | ✓ | - |
| params.category | Category of the event | String | ✓ | - |
| params.label | Further categorization | String | ✗ | - |
| params.event | The click event | Event | ✗ | - |

### Function - autoCapture

An event not triggered by a users action

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| params | Params object | Object | ✓ | - |
| params.category | Category of the event | String | ✓ | - |
| params.action | The action taken | String | ✓ | - |
| params.label | Further categorization | String | ✗ | - |
| params.value | Value attached to the event | Integer | ✗ | - |

### Function - timing

Captures a timing

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| params | Params object | Object | ✓ | - |
| params.category | Category of the event | String | ✓ | - |
| params.label | Further categorization | String | ✗ | - |
| params.value | Time in ms | Integer | ✓ | - |
| params.variable | Name of the timing variable | String | ✓ | - |

### Function - exception

Tracks an exception

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| params | Params object | Object | ✓ | - |
| params.description | Description of the exception | String | ✓ | - |
| params.fatal | Was the exception fatal? | Boolean | ✓ | - |
| params.args | Array of args on the function which threw the error | Array | ✗ | - |
| params.error | The Error which caused the exception | Error | ✓ | - |

### Object - constants

Keyed list of constants to be used for categories. See [src/constants/analytics.js](../../src/constants/analytics.js) for available constants.
