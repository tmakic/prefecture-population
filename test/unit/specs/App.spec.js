import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api';
import flushPromises from 'flush-promises'

import App from "@/App";
import Prefectures from "@/components/Prefectures";

import mockAxios from 'axios'
import mockData from '../../mockData'

const { mockPrefectureList, mockPopulationResult } = mockData();

// composition APIを使えるようにする
const localVue = createLocalVue();
localVue.use(VueCompositionApi);

// axiosのモック
mockAxios.get.mockImplementation((url)=> {
  switch (url) {
    case '/api/v1/prefectures':
      return Promise.resolve({data: { result: mockPrefectureList }})
    case '/api/v1/population/composition/perYear':
      return Promise.resolve({data: { result: mockPopulationResult }})
  }
})

describe("App.vue", () => {
  it("コンポーネントがmountされること", () => {
    const wrapper = shallowMount (App)
    expect(wrapper.exists()).toBe(true)
  });

  it("取得した都道府県データがprefectureListに格納されること", async () => {
    const wrapper = mount (App, {
      localVue,
      sync: false
    })

    await flushPromises();

    expect(wrapper.vm.$data.prefectureList.length).toBe(10);
  });

  describe("Prefecturesからemitを受け取けとったときの挙動の検証", () => {
    const wrapper = mount (App, {
      localVue,
      sync: false
    });

    it("Prefecturesでemitした都道府県が未選択だった場合、新たにデータが追加されること", async () => {
      // emit前のtotalPopulationは空配列であることの確認
      expect(wrapper.vm.$data.totalPopulation.length).toBe(0);
      // emit前のselectedPrefCodeListは空配列であることの確認
      expect(wrapper.vm.$data.selectedPrefCodeList.length).toBe(0);

      wrapper.findComponent(Prefectures).vm.$emit('click', 6);
      await flushPromises();

      // emit後のtotalPopulationは prefCode:6 (山形県) のデータが1つだけ入っていることの確認
      expect(wrapper.vm.$data.totalPopulation.length).toBe(1);
      expect(wrapper.vm.$data.totalPopulation[0].prefCode).toBe(6);
      expect(wrapper.vm.$data.totalPopulation[0].prefName).toBe('山形県');

      // emit後のselectedPrefCodeListは prefCode:6 (山形県) のデータが1つだけ入っていることの確認
      expect(wrapper.vm.$data.selectedPrefCodeList.length).toBe(1);
      expect(wrapper.vm.$data.selectedPrefCodeList[0]).toBe(6);
    });

    it("Prefecturesでemitした都道府県が選択済みだった場合、データが削除されること", async () => {
      // emit前のtotalPopulationは、prefCode: 6 (山形県) のデータが1つだけ入っていることの確認
      expect(wrapper.vm.$data.totalPopulation.length).toBe(1);
      expect(wrapper.vm.$data.totalPopulation[0].prefCode).toBe(6);
      // emit前のselectedPrefCodeListは、prefCode: 6 (山形県) のデータが1つだけ入っていることの確認
      expect(wrapper.vm.$data.selectedPrefCodeList.length).toBe(1);
      expect(wrapper.vm.$data.selectedPrefCodeList[0]).toBe(6);

      wrapper.findComponent(Prefectures).vm.$emit('click', 6);
      await flushPromises();

      // emit後のtotalPopulationは空配列であることの確認
      expect(wrapper.vm.$data.totalPopulation.length).toBe(0);

      // emit後のselectedPrefCodeListは空配列であることの確認
      expect(wrapper.vm.$data.selectedPrefCodeList.length).toBe(0);
    });
  })
});
