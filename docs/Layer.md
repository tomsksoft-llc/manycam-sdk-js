
<a name="Layer"></a>

## Layer
Represents a layer in a preset

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of preset |
| pip_number | <code>number</code> | Pip number of layer (Id) |
| x | <code>number</code> | X value |
| y | <code>number</code> | Y value |
| width | <code>number</code> | Width of layer |
| height | <code>number</code> | Height of layer |
| order | <code>string</code> | Order in preset |
| sources | [<code>Array.&lt;Source&gt;</code>](#Source) | Array of sources |


* [Layer](#Layer)
    * [new Layer(props, manyCam)](#new_Layer_new)
    * [.activatePlaylistItem(id)](#Layer+activatePlaylistItem) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.flip([horizontally])](#Layer+flip) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.rotateLeft()](#Layer+rotateLeft) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.rotateRight()](#Layer+rotateRight) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setColor(color)](#Layer+setColor) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setDesktop([isCursorArea])](#Layer+setDesktop) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setSource(source)](#Layer+setSource) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.sources](#Layer+sources) : [<code>Array.&lt;Source&gt;</code>](#Source)


* * *

<a name="new_Layer_new"></a>

### new Layer(props, manyCam)
Creates a Layer instance


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Layer fields |
| props.index | <code>number</code> | Index of preset |
| props.pip_number | <code>number</code> | Pip number of layer (Id) |
| props.x | <code>number</code> | X value |
| props.y | <code>number</code> | Y value |
| props.width | <code>number</code> | Width of layer |
| props.height | <code>number</code> | Height of layer |
| props.order | <code>string</code> | Order in preset |
| manyCam | [<code>ManyCam</code>](#ManyCam) | ManyCam instance |


* * *

<a name="Layer+activatePlaylistItem"></a>

### layer.activatePlaylistItem(id) ⇒ <code>Promise.&lt;boolean&gt;</code>
Activates playlist

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Id of playlist |


* * *

<a name="Layer+flip"></a>

### layer.flip([horizontally]) ⇒ <code>Promise.&lt;boolean&gt;</code>
Flips layer horizontally or vertically

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [horizontally] | <code>boolean</code> | <code>false</code> | If true - flips horizontally, false - flips vertically. False by default |


* * *

<a name="Layer+rotateLeft"></a>

### layer.rotateLeft() ⇒ <code>Promise.&lt;boolean&gt;</code>
Rotates layer left

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="Layer+rotateRight"></a>

### layer.rotateRight() ⇒ <code>Promise.&lt;boolean&gt;</code>
Rotates layer right

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

* * *

<a name="Layer+setColor"></a>

### layer.setColor(color) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets color as a source

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | Color of layer. See [constants.md/#colors](constants.md/#colors) |


* * *

<a name="Layer+setDesktop"></a>

### layer.setDesktop([isCursorArea]) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets desktop as a source

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [isCursorArea] | <code>boolean</code> | <code>false</code> | a - If true - sets only cursor area, false - fullscreen. False by default |


* * *

<a name="Layer+setSource"></a>

### layer.setSource(source) ⇒ <code>Promise.&lt;boolean&gt;</code>
Sets source

**Kind**: instance method of [<code>Layer</code>](#Layer)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Success of the command  

| Param | Type | Description |
| --- | --- | --- |
| source | [<code>Source</code>](#Source) | Source instance |


* * *

<a name="Layer+sources"></a>

### layer.sources : [<code>Array.&lt;Source&gt;</code>](#Source)
**Kind**: instance property of [<code>Layer</code>](#Layer)  

* * *

