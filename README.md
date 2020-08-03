
# Vue Color Picker

Color Picker base on Vue2.x

## Take a glance

<a href="https://duoani.github.io/vue-color-picker/index.html" target="_blank">Online Demo</a>

## Installation

```bash
npm i -S @duoa/vue-color-picker
```

## Usage

Register the component

```js
import Vue from 'vue'
import VueColorPicker from '@duoa/vue-color-picker'
// Because this components has its styles, you must also import the css file.
import '@duoa/vue-color-picker/dist/vue-color-picker.css'

// Register
Vue.use(VueColorPicker)
```

Declare the component

```html
<template>
  <vue-color-picker v-model="color" />
</template>
<script>
export default {
  data () {
    return {
      color: '#ff00ff
    }
  }
}
</script>
```

That's all you need to do!

If you want to customize the component name. Here is an example.

```js
import Vue from 'vue'
import { component } from '@duoa/vue-color-picker'
import '@duoa/vue-color-picker/dist/vue-color-picker.css'

// Register
Vue.component('MyColorPicker', component)
```

## Configuration

|  Name   | Type  | Default Value | Required | Description |
|  ----  | ----  | --- | --- | -- |
| value / v-model | string | '' | -- | binding value |
| colorFormat  | string | hex (when show-alpha is false)/ rgb (when show-alpha is true) | -- | color format of v-model, `hsl` / `hsv` / `hex` / `rgb` is accepted |
| showAlpha | boolean | false | -- | whether to display the alpha slider |
| disabled  | boolean | false | -- | whether to disable the picker |
| appendToBody  | boolean | false | -- | whether to append picker popup itself to body. A nested picker popup should have this attribute set to `true` |
| predefine  | array | [] | -- | predefined color options |

## Events
| Event Name | Description | Parameters |
| ---------- | ----------- | ---------- |
| before-open | triggers before the picker opens | -- |
| change | triggers when the selected color changes | current selected color |
| close | triggers when the picker closes | -- |