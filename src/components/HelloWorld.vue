<template lang='pug'>
  p {{ msg }}
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'HelloWorld',

  setup () {
    const msg = ref('Welcome to Composition API')

    return {
      msg
    }
  }
})
</script>
