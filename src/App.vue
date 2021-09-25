<template lang='pug'>
  #app
    h2 都道府県情報のテスト
    p {{ prefectureList[0] }}

    h2 人口情報のテスト
    p {{ totalPopulation.label }}
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'
import axiosBase from 'axios'

export default defineComponent({
  name: 'App',

  setup () {
    const axios = axiosBase.create({
      baseURL: process.env.RESAS_API_BASE_URL,
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY
      }
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
     * 人口情報を取得
     */
    const getPopulationData = prefCode => {
      axios.get('/api/v1/population/composition/perYear', {
        params: {
          prefCode: prefCode,
          cityCode: '-'
        }
      }).then(response => {
        state.totalPopulation = response.data.result.data[0]
      })
    }

    onMounted(() => {
      getPrefectureData()
      getPopulationData(11)
    })

    const state = reactive({
      // 都道府県情報
      prefectureList: [],
      // 総人口情報
      totalPopulation: []
    })

    return { ...toRefs(state) }
  }
})
</script>
