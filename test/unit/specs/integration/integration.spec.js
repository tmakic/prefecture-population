import { createLocalVue, mount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api';
import flushPromises from 'flush-promises'

import App from "@/App";

import mockAxios from 'axios'
import mockData from '../mockData'

const { mockPrefectureList, mockPopulationResult } = mockData();

// composition APIを使えるようにする
const localVue = createLocalVue();
localVue.use(VueCompositionApi);

// axiosのモック
mockAxios.get.mockImplementation((url)=> {
  switch (url) {
    case '/api/v1/prefectures':
      return Promise.resolve({data: { result: mockPrefectureList }});
    case '/api/v1/population/composition/perYear':
      return Promise.resolve({data: { result: mockPopulationResult }});
  }
})

describe("Integration test", () => {
  it("取得した都道府県データの数だけチェックボックスが表示されること", async () => {
    const wrapper = mount (App, {
      localVue,
      sync: false
    })
    await flushPromises();

    const inputs = wrapper.findAll('input[type="checkbox"]');
    expect(inputs.length).toBe(10);
  });

  describe("Prefecturesで都道府県をクリックしたときの挙動の検証", () => {
    const wrapper = mount (App, {
      localVue,
      sync: false
    });

    it("Prefecturesでクリックした都道府県が未選択だった場合、新たにデータがグラフに表示されること", async () => {
      // グラフの折れ線が最初は0本であることの確認
      const graphLinesBefore = wrapper.findAll('.highcharts-tracker-line');
      expect(graphLinesBefore.length).toBe(0);

      // 山形県 (prefCode: 6) のチェックボックスをクリック
      const inputPref6 = wrapper.find('#prefecture-6');
      inputPref6.trigger('click', {prefCode: 6 });

      await flushPromises();

      // グラフの折れ線が1本であることの確認
      const graphLinesAfter = wrapper.findAll('.highcharts-tracker-line');
      expect(graphLinesAfter.length).toBe(1);

      // グラフの凡例情報が山形県1つであることの確認
      const graphLegends = wrapper.findAll('.highcharts-legend-item');
      expect(graphLegends.length).toBe(1);
      expect(graphLegends.wrappers[0].text()).toBe('山形県');
    });

    it("Prefecturesでクリックした都道府県が選択済みだった場合、データがグラフから削除されること", async () => {
      // グラフの折れ線が最初は1本であることの確認
      const graphLinesBefore = wrapper.findAll('.highcharts-tracker-line');
      expect(graphLinesBefore.length).toBe(1);
      // グラフの凡例が最初は1個であることの確認
      const graphLegends = wrapper.findAll('.highcharts-legend-item');
      expect(graphLegends.length).toBe(1);

      // 山形県 (prefCode: 6) のチェックボックスをクリック
      const inputPref6 = wrapper.find('#prefecture-6');
      inputPref6.trigger('click', {prefCode: 6 });

      await flushPromises();

      // グラフの折れ線が0本であることの確認
      const graphLinesAfter = wrapper.findAll('.highcharts-tracker-line');
      expect(graphLinesAfter.length).toBe(0);

      // グラフの凡例情報が0個であることの確認
      const graphLegends = wrapper.findAll('.highcharts-legend-item');
      expect(graphLegends.length).toBe(0);
    });
  })
});
