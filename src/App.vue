<template lang='pug'>
  #app
    .content
      //- グラフエリア
      graph(
        :total-population='formattedTotalPopulation'
      )
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

import Graph from '@/components/Graph'

import axiosBase from 'axios'

export default defineComponent({
  name: 'App',

  components: { Graph },

  setup () {
    // APIインスタンスの作成
    const axios = axiosBase.create({
      baseURL: process.env.RESAS_API_BASE_URL,
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY
      }
    })

    const state = reactive({
      // 都道府県情報
      prefectureList: [],
      // 選択された都道府県
      selectedPrefCodeList: [11, 12], // 仮データ
      // 総人口情報
      totalPopulation: []
    })

    /**
     * 都道府県情報を取得
     */
    const getPrefectureData = () => {
      axios.get('api/v1/prefectures').then(response => {
        state.prefectureList = response.data.result
      })
    }

    /**
     * 人口情報を取得・格納
     *
     * @param {number} prefCode 都道府県コード
     * @return {void}
     */
    const getPopulationData = prefCode => {
      axios.get('/api/v1/population/composition/perYear', {
        params: {
          prefCode: prefCode,
          cityCode: '-'
        }
      }).then(response => {
        state.totalPopulation.push({
          prefCode: prefCode,
          data: response.data.result.data[0].data
        })
      })
    }

    onMounted(() => {
      // 都道府県データ取得
      getPrefectureData()

      // 人口データ取得
      // TODO: 都道府県を選択したタイミングで、その都道府県のデータだけ取得するようにする
      state.selectedPrefCodeList.forEach(code => {
        getPopulationData(code)
      })
    })

    /**
     * 都道府県コードから都道府県名を取得
     *
     * @param {number} prefCode 都道府県コード
     * @return {object} 都道府県名
     */
    const getPrefName = prefCode => {
      const prefData = state.prefectureList.find(v => v.prefCode === prefCode)
      return prefData ? prefData.prefName : ''
    }

    /**
     * グラフ用の整形済み人口データ
     */
    const formattedTotalPopulation = computed(() => {
      return state.totalPopulation.map(v => {
        v.prefName = getPrefName(v.prefCode)
        return v
      })
    })

    return {
      ...toRefs(state),
      formattedTotalPopulation
    }
  }
})
</script>
