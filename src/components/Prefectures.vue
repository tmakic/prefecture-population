<template lang='pug'>
  .prefecture-area
    .prefecture-option(v-for='item in list')
      input(
        :id='`prefecture-${item.prefCode}`'
        name='prefecture'
        type='checkbox'
        :value='selectedList.includes(item.prefCode)'
        @input='input(item.prefCode)'
      )
      label(:for='`prefecture-${item.prefCode}`')
        | {{ item.prefName }}
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Prefectures',

  props: {
    /**
     * 都道府県のリスト
     */
    list: {
      type: Array,
      required: false,
      default: () => ([])
    },
    /**
     * 選択している都道府県コードのリスト
     */
    selectedList: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },

  setup (_props, { emit }) {
    /**
     * チェックボックスをクリック
     *
     * @param {number} prefCode 都道府県コード
     * @return {void}
     */
    const input = prefCode => {
      emit('click', prefCode)
    }

    return {
      input
    }
  }
})
</script>

<style>
.prefecture-area {
  display: flex;
  flex-wrap: wrap;
}
.prefecture-option {
  width: 100px;
}
</style>
