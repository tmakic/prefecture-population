import { createLocalVue, mount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api';
import Graph from "@/components/Graph";

import graphData from './mockData/graph'

// composition APIを使えるようにする
const localVue = createLocalVue();
localVue.use(VueCompositionApi);

// モックデータ
const { mockTotalPopulation } = graphData();

describe("Graph.vue", () => {
  it("コンポーネントがmountされること", () => {
    const wrapper = mount (Graph, {
      localVue,
      propsData: {
        totalPopulation: mockTotalPopulation
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("boundaryYear以前の年度のみがX軸になること", () => {
    const wrapper = mount (Graph, {
      localVue,
      propsData: {
        totalPopulation: mockTotalPopulation,
        boundaryYear: 2015
      }
    });

    const xAxisLabels = wrapper.findAll('.highcharts-xaxis-labels text');

    expect(xAxisLabels.length).toBe(12); // 1960, 1965, ... 2015までの12目盛り
    expect(xAxisLabels.wrappers[0].text()).toBe('1960');
    expect(xAxisLabels.wrappers[11].text()).toBe('2015');
  });

  it("都道府県データの数だけグラフが表示されること", () => {
    const wrapper = mount (Graph, {
      localVue,
      propsData: {
        totalPopulation: mockTotalPopulation
      }
    });

    const graphLines = wrapper.findAll('.highcharts-tracker-line');

    expect(graphLines.length).toBe(3);
  });
});
