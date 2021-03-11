
<a name="ManyCam"></a>

## ManyCam
Main class containing control methods

**Kind**: global class  

* [ManyCam](#ManyCam)
    * [new ManyCam(settings)](#new_ManyCam_new)
    * [.activateSubscription(subscription)](#ManyCam+activateSubscription) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.autoLaunchGame(isAuto)](#ManyCam+autoLaunchGame) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.clearLayer(layer)](#ManyCam+clearLayer) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.clearPreset(preset)](#ManyCam+clearPreset) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.connect()](#ManyCam+connect) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.createLayer(layer)](#ManyCam+createLayer) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.createLayerInstance(props)](#ManyCam+createLayerInstance) ⇒ [<code>Layer</code>](#Layer)
    * [.createPreset(preset)](#ManyCam+createPreset) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.createPresetInstance(props)](#ManyCam+createPresetInstance) ⇒ [<code>Preset</code>](#Preset)
    * [.deactivateSubscription(subscription)](#ManyCam+deactivateSubscription) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.deleteLayer(layer)](#ManyCam+deleteLayer) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.deletePreset(preset)](#ManyCam+deletePreset) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.disableMotionDetection(preset)](#ManyCam+disableMotionDetection) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.disableSwitchOnMotion(preset)](#ManyCam+disableSwitchOnMotion) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.editLayer(layer)](#ManyCam+editLayer) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.editPreset(preset)](#ManyCam+editPreset) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.enableMotionDetection(preset)](#ManyCam+enableMotionDetection) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.enableSwitchOnMotion(preset)](#ManyCam+enableSwitchOnMotion) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.exitApp()](#ManyCam+exitApp) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getApplicationSources()](#ManyCam+getApplicationSources) ⇒ <code>Promise.&lt;Array.&lt;Source&gt;&gt;</code>
    * [.getAvailableWebcams()](#ManyCam+getAvailableWebcams) ⇒ [<code>Promise.&lt;Source&gt;</code>](#Source)
    * [.getCurrentPreset()](#ManyCam+getCurrentPreset) ⇒ [<code>Promise.&lt;Preset&gt;</code>](#Preset)
    * [.getCurrentPresetIndex()](#ManyCam+getCurrentPresetIndex) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.getCurrentResolution()](#ManyCam+getCurrentResolution) ⇒ [<code>Promise.&lt;Resolution&gt;</code>](#Resolution)
    * [.getPresetState(preset)](#ManyCam+getPresetState) ⇒ [<code>Promise.&lt;Preset&gt;</code>](#Preset)
    * [.getSubscriptions()](#ManyCam+getSubscriptions) ⇒ <code>Promise.&lt;Array.&lt;Subscription&gt;&gt;</code>
    * [.getUiState()](#ManyCam+getUiState) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getVideoResolutions()](#ManyCam+getVideoResolutions) ⇒ <code>Promise.&lt;Array.&lt;Resolution&gt;&gt;</code>
    * [.hideUI()](#ManyCam+hideUI) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.login(account, password)](#ManyCam+login) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.logout()](#ManyCam+logout) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.makePresetActive(preset, transiently)](#ManyCam+makePresetActive) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.onAuthChanged(callback)](#ManyCam+onAuthChanged)
    * [.onError(callback)](#ManyCam+onError)
    * [.onMotionDetected(callback)](#ManyCam+onMotionDetected)
    * [.onNotification(callback)](#ManyCam+onNotification)
    * [.onPresetChanged(callback)](#ManyCam+onPresetChanged)
    * [.onSubscriptionChanged(callback)](#ManyCam+onSubscriptionChanged)
    * [.saveLastImageOnMotionDetected(preset, path)](#ManyCam+saveLastImageOnMotionDetected) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.saveSnapshot(preset, path)](#ManyCam+saveSnapshot) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setTransition(duration, type)](#ManyCam+setTransition) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setVideoResolution(resolution)](#ManyCam+setVideoResolution) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.showUI()](#ManyCam+showUI) ⇒ <code>Promise.&lt;boolean&gt;</code>


* * *

<a name="new_ManyCam_new"></a>

### new ManyCam(settings)

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | Settings |
| settings.host | <code>string</code> | Host |
| settings.port | <code>string</code> | Port |
| settings.access_key | <code>string</code> | Access Key provided by ManyCam |


* * *

<a name="ManyCam+activateSubscription"></a>

### manyCam.activateSubscription(subscription) ⇒ <code>Promise.&lt;boolean&gt;</code>
Activate proper subscription

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| subscription | [<code>Subscription</code>](#Subscription) \| <code>string</code> | Class or id of subscription |


* * *

<a name="ManyCam+autoLaunchGame"></a>

### manyCam.autoLaunchGame(isAuto) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets auto launch game option

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| isAuto | <code>boolean</code> | <code>true</code> | True by default |


* * *

<a name="ManyCam+clearLayer"></a>

### manyCam.clearLayer(layer) ⇒ <code>Promise.&lt;boolean&gt;</code>
Clears layer

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| layer | [<code>Layer</code>](#Layer) | [Layer.md](Layer.md) instance or object |
| layer.index | <code>number</code> | Index of preset |
| layer.pip_number | <code>number</code> | Pip number of layer |


* * *

<a name="ManyCam+clearPreset"></a>

### manyCam.clearPreset(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Clears chosen preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | [Preset.md](Preset.md) instance or index of preset |


* * *

<a name="ManyCam+connect"></a>

### manyCam.connect() ⇒ <code>Promise.&lt;boolean&gt;</code>
Connects to ManyCam API

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="ManyCam+createLayer"></a>

### manyCam.createLayer(layer) ⇒ <code>Promise.&lt;boolean&gt;</code>
Creates layer

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| layer | [<code>Layer</code>](#Layer) | [Layer.md](Layer.md) instance |


* * *

<a name="ManyCam+createLayerInstance"></a>

### manyCam.createLayerInstance(props) ⇒ [<code>Layer</code>](#Layer)
Creates a Layer instance

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Layer</code>](#Layer) - New Layer instance  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Preset props |
| props.index | <code>number</code> | Index of preset |
| props.pip_number | <code>number</code> | Pip number of layer (Id) |
| [props.x] | <code>number</code> | X value |
| [props.y] | <code>number</code> | Y value |
| [props.width] | <code>number</code> | Width of layer |
| [props.height] | <code>number</code> | Height of layer |
| [props.order] | <code>string</code> | Order in preset |


* * *

<a name="ManyCam+createPreset"></a>

### manyCam.createPreset(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Creates chosen preset or edit existing preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) | [Preset.md](Preset.md) instance |


* * *

<a name="ManyCam+createPresetInstance"></a>

### manyCam.createPresetInstance(props) ⇒ [<code>Preset</code>](#Preset)
Creates a Preset instance

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Preset</code>](#Preset) - New Preset instance  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Preset props |
| [props.index] | <code>number</code> | Index |
| [props.name] | <code>string</code> | Name |
| [props.type] | <code>string</code> | Type. See [constants.md#presetTypes](constants.md#presetTypes) |


* * *

<a name="ManyCam+deactivateSubscription"></a>

### manyCam.deactivateSubscription(subscription) ⇒ <code>Promise.&lt;boolean&gt;</code>
Deactivate proper subscription

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| subscription | [<code>Subscription</code>](#Subscription) \| <code>string</code> | Class or id of subscription |


* * *

<a name="ManyCam+deleteLayer"></a>

### manyCam.deleteLayer(layer) ⇒ <code>Promise.&lt;boolean&gt;</code>
Deletes layer

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| layer | [<code>Layer</code>](#Layer) | [Layer.md](Layer.md) instance or object |
| layer.index | <code>number</code> | Index of preset |
| layer.pip_number | <code>number</code> | Pip number of layer |


* * *

<a name="ManyCam+deletePreset"></a>

### manyCam.deletePreset(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Deletes chosen preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | [Preset.md](Preset.md) instance or index of preset |


* * *

<a name="ManyCam+disableMotionDetection"></a>

### manyCam.disableMotionDetection(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Disables motion detection on chosen preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |


* * *

<a name="ManyCam+disableSwitchOnMotion"></a>

### manyCam.disableSwitchOnMotion(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Disables auto switch to preset on motion detected

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |


* * *

<a name="ManyCam+editLayer"></a>

### manyCam.editLayer(layer) ⇒ <code>Promise.&lt;boolean&gt;</code>
Edits layer

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| layer | [<code>Layer</code>](#Layer) | [Layer.md](Layer.md) instance |


* * *

<a name="ManyCam+editPreset"></a>

### manyCam.editPreset(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Edits chosen preset or create new one if not exist

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) | [Preset.md](Preset.md) instance |


* * *

<a name="ManyCam+enableMotionDetection"></a>

### manyCam.enableMotionDetection(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Enables motion detection on chosen preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |


* * *

<a name="ManyCam+enableSwitchOnMotion"></a>

### manyCam.enableSwitchOnMotion(preset) ⇒ <code>Promise.&lt;boolean&gt;</code>
Enables auto switch to preset on motion detected

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |


* * *

<a name="ManyCam+exitApp"></a>

### manyCam.exitApp() ⇒ <code>Promise.&lt;boolean&gt;</code>
Exit from ManyCam

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="ManyCam+getApplicationSources"></a>

### manyCam.getApplicationSources() ⇒ <code>Promise.&lt;Array.&lt;Source&gt;&gt;</code>
Gets available application sources

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;Array.&lt;Source&gt;&gt;</code> - Array of Sources  

* * *

<a name="ManyCam+getAvailableWebcams"></a>

### manyCam.getAvailableWebcams() ⇒ [<code>Promise.&lt;Source&gt;</code>](#Source)
Gets available webcams

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Promise.&lt;Source&gt;</code>](#Source) - Array of webcam Sources  

* * *

<a name="ManyCam+getCurrentPreset"></a>

### manyCam.getCurrentPreset() ⇒ [<code>Promise.&lt;Preset&gt;</code>](#Preset)
Gets current preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Promise.&lt;Preset&gt;</code>](#Preset) - Preset  

* * *

<a name="ManyCam+getCurrentPresetIndex"></a>

### manyCam.getCurrentPresetIndex() ⇒ <code>Promise.&lt;number&gt;</code>
Gets current preset index

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;number&gt;</code> - Index of preset  

* * *

<a name="ManyCam+getCurrentResolution"></a>

### manyCam.getCurrentResolution() ⇒ [<code>Promise.&lt;Resolution&gt;</code>](#Resolution)
Gets current resolution

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Promise.&lt;Resolution&gt;</code>](#Resolution) - Resolution  

* * *

<a name="ManyCam+getPresetState"></a>

### manyCam.getPresetState(preset) ⇒ [<code>Promise.&lt;Preset&gt;</code>](#Preset)
Gets state of preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: [<code>Promise.&lt;Preset&gt;</code>](#Preset) - Preset  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset instance or index |


* * *

<a name="ManyCam+getSubscriptions"></a>

### manyCam.getSubscriptions() ⇒ <code>Promise.&lt;Array.&lt;Subscription&gt;&gt;</code>
Gets available subscriptions

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;Array.&lt;Subscription&gt;&gt;</code> - Array of Subscriptions  

* * *

<a name="ManyCam+getUiState"></a>

### manyCam.getUiState() ⇒ <code>Promise.&lt;boolean&gt;</code>
Gets UI state

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True - hidden, false - expanded  

* * *

<a name="ManyCam+getVideoResolutions"></a>

### manyCam.getVideoResolutions() ⇒ <code>Promise.&lt;Array.&lt;Resolution&gt;&gt;</code>
Gets available video resolutions

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;Array.&lt;Resolution&gt;&gt;</code> - Array of Resolutions  

* * *

<a name="ManyCam+hideUI"></a>

### manyCam.hideUI() ⇒ <code>Promise.&lt;boolean&gt;</code>
Hides UI

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="ManyCam+login"></a>

### manyCam.login(account, password) ⇒ <code>Promise.&lt;boolean&gt;</code>
Login into account

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | Your email |
| password | <code>string</code> | Your password |


* * *

<a name="ManyCam+logout"></a>

### manyCam.logout() ⇒ <code>Promise.&lt;boolean&gt;</code>
Logout from account

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="ManyCam+makePresetActive"></a>

### manyCam.makePresetActive(preset, transiently) ⇒ <code>Promise.&lt;boolean&gt;</code>
Makes chosen preset active

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> |  | [Preset.md](Preset.md) instance or index of preset |
| transiently | <code>boolean</code> | <code>false</code> | If true transition is smooth, false by default |


* * *

<a name="ManyCam+onAuthChanged"></a>

### manyCam.onAuthChanged(callback)
Authentication listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+onError"></a>

### manyCam.onError(callback)
Error listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+onMotionDetected"></a>

### manyCam.onMotionDetected(callback)
Motion detection listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+onNotification"></a>

### manyCam.onNotification(callback)
All notifications listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+onPresetChanged"></a>

### manyCam.onPresetChanged(callback)
Preset change listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+onSubscriptionChanged"></a>

### manyCam.onSubscriptionChanged(callback)
Subscriptions listener

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  

| Param | Type |
| --- | --- |
| callback | [<code>notificationCallback</code>](#notificationCallback) | 


* * *

<a name="ManyCam+saveLastImageOnMotionDetected"></a>

### manyCam.saveLastImageOnMotionDetected(preset, path) ⇒ <code>Promise.&lt;boolean&gt;</code>
Saves last motion detected image

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |
| path | <code>string</code> | Save folder path |


* * *

<a name="ManyCam+saveSnapshot"></a>

### manyCam.saveSnapshot(preset, path) ⇒ <code>Promise.&lt;boolean&gt;</code>
Saves snapshot of chosen preset

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>Preset</code>](#Preset) \| <code>number</code> | Preset or preset index |
| path | <code>string</code> | Save folder path |


* * *

<a name="ManyCam+setTransition"></a>

### manyCam.setTransition(duration, type) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets transition

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | Duration of transition in `milliseconds`. |
| type | <code>string</code> | Transition type. See [constants.md#transitionTypes](constants.md#transitionTypes) |


* * *

<a name="ManyCam+setVideoResolution"></a>

### manyCam.setVideoResolution(resolution) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets video resolution

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type |
| --- | --- |
| resolution | <code>string</code> | 


* * *

<a name="ManyCam+showUI"></a>

### manyCam.showUI() ⇒ <code>Promise.&lt;boolean&gt;</code>
Shows UI

**Kind**: instance method of [<code>ManyCam</code>](#ManyCam)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

