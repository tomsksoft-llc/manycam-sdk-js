## Examples

-   **[Connect](#Connect)**
-   **[Create layer](#Create-layer)**
-   **[Create preset](#Create-preset)**
-   **[Delete preset](#Delete-preset)**
-   **[Edit preset](#Edit-preset)**
-   **[Hide UI](#Hide-UI)**
-   **[Save snapshot on motion detected](#Save-snapshot-on-motion-detected)**
-   **[Set color for layer](#Set-color-for-layer)**
-   **[Set desktop for layer](#Set-desktop-for-layer)**
-   **[Set source for layer](#set-source-for-layer)**
-   **[Set transition](#Set-transition)**
-   **[Set video resolution](#Set-video-resolution)**

## Connect

Before calling methods you need to call `connect` method, then wait for the resolve of Promise or chain by using `then`.

```js
await manyCam.connect();
```

or

```js
manyCam.connect().then(async () => {
	// ... your code
});
```

Don't forget to catch errors of the `Promise` chain, or by using `async/await` and a `try...catch`.

## Create layer

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

let preset = await manyCam();
let myLayer = manyCam.createLayerInstance({
	index: preset.index,
	pip_number: 4,
	x: 123,
	y: 321,
	width: 1003,
	height: 1003,
	order: "front",
});
await manyCam.createLayer(myLayer); // or editLayer(myLayer)
```

## Create preset

```js
const { ManyCam, presetTypes } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Set new preset
let myPreset = manyCam.createPresetInstance({
	name: "Horizontally splitted preset",
	index: 12,
	type: presetTypes.horizontally_splitted,
});

await manyCam.createPreset(myPreset);
```

## Delete preset

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

let preset = await manyCam();
await manyCam.delete(preset);
```

## Edit preset

```js
const { ManyCam, presetTypes } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

let preset = await manyCam.getCurrentPreset();

// Set name and type for preset
preset.name = "Edited preset";
preset.type = presetTypes.cross_splitted;
await manyCam.editPreset(preset);
```

## Hide UI

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Show UI if it's hidden
let isHidden = await manyCam.getUiState();
if (isHidden) await manyCam.showUI();
```

## Save snapshot on motion detected

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

let preset = await manyCam.getCurrentPreset();
let layer = preset.layers[0];

// Get webcams available on your device
let webcams = await manyCam.getAvailableWebcams();

// Set webcam as a source
await layer.setSource(webcams[0]);
// Enable motion detection for current preset
await manyCam.enableMotionDetection(preset);

// Set motion detection listener
manyCam.onMotionDetected(async (message) => {
	await manyCam
		.saveSnapshot(message.data.index, `path/to/directory`)
		.catch((ex) => {
			console.log(ex);
		});
});
```

## Set color for layer

```js
const { ManyCam, colors } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Get current preset
let preset = await manyCam.getCurrentPreset();

// Get layer in preset
let layer = preset.layers[0];

await layer.setColor(colors.fuchsia);
```

## Set desktop for layer

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Get current preset
let preset = await manyCam.getCurrentPreset();

// Get layer in preset
let layer = preset.layers[0];

// Set desktop as source
await layer.setDesktop();

// Set cursor area as source
await layer.setDesktop(true);
```

## Set source for layer

```js
const { ManyCam, sources } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Get current preset
let preset = await manyCam.getCurrentPreset();

// Get layer in preset
let layer = preset.layers[0];
// or by pip number if layer exist
// let layer = preset.getLayer(1);

// Init youtube source and set it to layer
let yt = new Source(sources.youtube, {
	url: "https://www.youtube.com/watch?v=GEWpQp1yW9U&ab_channel=ManyCam",
});
let answer = await layer.setSource(yt); // returns true
```

## Set transition

```js
const { ManyCam, transitionTypes } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Duration - 1s, popup from center
await manyCam.setTransition(1000, transitionTypes.popup_center);
```

## Set video resolution

```js
const { ManyCam } = require("manycam-sdk");
// ...
let manyCam = new ManyCam(settings);
// ...

// Get array of available resolutions
let resolutions = await manyCam
	.getVideoResolution()
	.catch((error) => console.log(error));

// Set chosen resolution
await manyCam
	.setVideoResolution(resolution[0].toString())
	.catch((error) => console.log(error));
```
