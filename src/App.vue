<template lang='pug'>
  #app
    .content
      //- 都道府県選択エリア
      prefectures(
        :list="prefectureList"
        :selected-list="selectedPrefCodeList"
        @click="clickPrefecture($event)"
      )
      //- グラフエリア
      graph(
        :boundary-year="boundaryYear"
        :total-population="totalPopulation"
      )
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs
} from '@vue/composition-api';

import Prefectures from '@/components/Prefectures';
import Graph from '@/components/Graph';

import axiosBase from 'axios';

export default defineComponent({
  name: 'App',

  components: { Prefectures, Graph },

  setup() {
    // APIインスタンスの作成
    const axios = axiosBase.create({
      baseURL: process.env.RESAS_API_BASE_URL,
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY
      }
    });

    const state = reactive({
      // 都道府県情報
      prefectureList: [],
      // 選択された都道府県コード
      selectedPrefCodeList: [],
      // 実測値と推定値の境界年
      boundaryYear: null,
      // 総人口情報
      totalPopulation: []
    });

    /**
     * 都道府県情報を取得
     */
    const getPrefectureData = () => {
      axios.get('api/v1/prefectures').then((response) => {
        state.prefectureList = response.data.result;
      });
    };

    /**
     * 人口情報を取得・格納
     *
     * @param {number} prefCode 都道府県コード
     * @return {void}
     */
    const getPopulationData = (prefCode) => {
      axios
        .get('/api/v1/population/composition/perYear', {
          params: {
            prefCode: prefCode,
            cityCode: '-'
          }
        })
        .then((response) => {
          const result = response.data.result;
          if (!state.boundaryYear) {
            state.boundaryYear = result.boundaryYear;
          }
          state.totalPopulation.push({
            prefCode: prefCode,
            prefName: getPrefName(prefCode),
            data: result.data[0].data
          });
        });
    };

    onMounted(() => {
      // 都道府県データ取得
      getPrefectureData();
    });

    /**
     * 都道府県をクリック
     *
     * @param {number} prefCode 都道府県コード
     * @return {void}
     */
    const clickPrefecture = (prefCode) => {
      // 選択済み都道府県コードに含まれているかの確認
      const prefCodeIndex = state.selectedPrefCodeList.indexOf(prefCode);

      if (prefCodeIndex > -1) {
        // 含まれている場合(チェックあり → なし)
        state.selectedPrefCodeList.splice(prefCodeIndex, 1);

        // グラフデータからデータを削除
        const totalPopulationIndex = state.totalPopulation.findIndex(
          (v) => v.prefCode === prefCode
        );
        if (totalPopulationIndex > -1) {
          state.totalPopulation.splice(totalPopulationIndex, 1);
        }
      } else {
        // 含まれていない場合(チェックなし → あり)
        state.selectedPrefCodeList.push(prefCode);
        // グラフデータにデータを追加
        getPopulationData(prefCode);
      }
    };

    /**
     * 都道府県コードから都道府県名を取得
     *
     * @param {number} prefCode 都道府県コード
     * @return {object} 都道府県名
     */
    const getPrefName = (prefCode) => {
      const prefData = state.prefectureList.find(
        (v) => v.prefCode === prefCode
      );
      return prefData == null ? '' : prefData.prefName;
    };

    return {
      ...toRefs(state),
      clickPrefecture
    };
  }
});
</script>

<style>
.content {
  padding: 0 20px;
  color: #333333;
}
.content > *:nth-child(n + 2) {
  margin-top: 40px;
}
</style>
