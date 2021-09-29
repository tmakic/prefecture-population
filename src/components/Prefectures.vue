<template lang='pug'>
  .prefecture-area
    h2.prefecture-title 都道府県
    .prefecture-body
      .prefecture-option(v-for="item in list")
        input(
          :ref="`prefecture-${item.prefCode}`"
          :id="`prefecture-${item.prefCode}`"
          name="prefecture"
          type="checkbox"
          :checked="selectedList.includes(item.prefCode)"
          @change="input(item.prefCode)"
        )
        label(:for="`prefecture-${item.prefCode}`")
          | {{ item.prefName }}
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Prefectures',

  props: {
    /**
     * 都道府県のリスト
     */
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * 選択している都道府県コードのリスト
     */
    selectedList: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  setup(_props, { emit }) {
    /**
     * チェックボックスをクリック
     *
     * @param {number} prefCode 都道府県コード
     * @return {void}
     */
    const input = (prefCode) => {
      emit('click', prefCode);
    };

    return {
      input
    };
  }
});
</script>

<style>
.prefecture-body {
  display: flex;
  flex-wrap: wrap;
}
.prefecture-option {
  width: 100px;
}
</style>
