
<a name="Preset"></a>

## Preset
Represents preset

**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | Index of preset |
| [live] | <code>number</code> |  | - |
| [name] | <code>string</code> |  | Name of preset |
| [pip_mode] | <code>string</code> |  | Pip mode |
| [type] | <code>string</code> | <code>&quot;free_pip&quot;</code> | Type of preset. See [constants.md/#presetTypes.md](constants.md/#presetTypes.md) |
| layers | [<code>Array.&lt;Layer&gt;</code>](#Layer) |  | Array of layers |


* [Preset](#Preset)
    * [new Preset(props, manyCam)](#new_Preset_new)
    * [.getLayer(pip_number)](#Preset+getLayer) ⇒ [<code>Layer</code>](#Layer)
    * [.layers](#Preset+layers) : [<code>Array.&lt;Layer&gt;</code>](#Layer)


* * *

<a name="new_Preset_new"></a>

### new Preset(props, manyCam)
Creates a Preset instance


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Preset fields |
| props.index | <code>number</code> | Index of preset |
| [props.name] | <code>string</code> | Name of preset |
| [props.type] | <code>string</code> | Type of preset |
| manyCam | [<code>ManyCam</code>](#ManyCam) | ManyCam instance |


* * *

<a name="Preset+getLayer"></a>

### preset.getLayer(pip_number) ⇒ [<code>Layer</code>](#Layer)
Gets layer by pip_number

**Kind**: instance method of [<code>Preset</code>](#Preset)  
**Returns**: [<code>Layer</code>](#Layer) - [Layer.md](Layer.md) instance  

| Param | Type | Description |
| --- | --- | --- |
| pip_number | <code>number</code> | Pip number |


* * *

<a name="Preset+layers"></a>

### preset.layers : [<code>Array.&lt;Layer&gt;</code>](#Layer)
**Kind**: instance property of [<code>Preset</code>](#Preset)  

* * *

