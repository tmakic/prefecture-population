<template lang='pug'>
  .graph-area
    highcharts(
      :options="options"
    )
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { Chart } from 'highcharts-vue';

export default defineComponent({
  name: 'Graph',

  components: {
    highcharts: Chart
  },

  props: {
    /**
     * 実測値と推定値の境界年
     */
    boundaryYear: {
      type: Number,
      required: false,
      default: 2015
    },
    /**
     * 選択している都道府県の総人口情報
     */
    totalPopulation: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  setup(props) {
    /**
     * highchartsのオプション
     */
    const options = computed(() => {
      return {
        // NOTE: y軸ラベルが見切れないようにダミーのタイトルを入れている
        title: {
          text: 'dummy',
          style: {
            color: 'transparent'
          }
        },

        yAxis: {
          title: {
            text: '人口数',
            align: 'high',
            offset: 0,
            rotation: 0,
            x: -8,
            y: -20,
            style: {
              'font-size': '16px',
              'font-weight': '600'
            }
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          }
        },

        xAxis: {
          categories: xAxisCategory.value,
          title: {
            text: '年度',
            align: 'high',
            offset: 6,
            x: 50,
            style: {
              'font-size': '16px',
              'font-weight': '600'
            }
          }
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            }
          }
        },

        series: chartData.value,

        tooltip: {
          formatter: function () {
            return `<p>${this.series.name}</p><br><p>${this.x}年: ${this.y} 人</p>`;
          }
        },

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          ]
        }
      };
    });

    /**
     * X軸の目盛り
     */
    const xAxisCategory = computed(() => {
      let array = [];
      const firstPrefData = props.totalPopulation[0];

      if (!firstPrefData) return [];

      firstPrefData.data.forEach((v) => {
        if (v.year <= props.boundaryYear) {
          array.push(v.year);
        }
      });

      return array;
    });

    /**
     * グラフデータ
     */
    const chartData = computed(() => {
      let array = [];

      props.totalPopulation.forEach((prefData) => {
        // 全部の年の値を1つの配列にまとめる
        let dataArray = [];
        prefData.data.forEach((v) => {
          // boundaryYearより前の年（実績値）だけ追加
          if (v.year <= props.boundaryYear) {
            dataArray.push(v.value);
          }
        });

        array.push({
          name: prefData.prefName,
          data: dataArray
        });
      });

      return array;
    });

    return {
      options,
      xAxisCategory,
      chartData
    };
  }
});
</script>

<style></style>
