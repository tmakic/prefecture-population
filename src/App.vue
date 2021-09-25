<template lang='pug'>
  #app
    img(src="./assets/logo.png")
    HelloWorld
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import HelloWorld from './components/HelloWorld'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld
  }
})
</script>
