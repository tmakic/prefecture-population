import { createLocalVue, mount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api';
import Prefectures from "@/components/Prefectures";

import mockData from '../../mockData'

// composition APIを使えるようにする
const localVue = createLocalVue();
localVue.use(VueCompositionApi);

// モックデータ
const { mockPrefectureList } = mockData();

describe("Prefectures.vue", () => {
  it("コンポーネントがmountされること", () => {
    const wrapper = mount (Prefectures, { localVue });
    expect(wrapper.exists()).toBe(true);
  });

  describe("チェックボックスの検証", () => {
    const wrapper = mount (Prefectures, {
      localVue,
      propsData:{
        list: mockPrefectureList,
        selectedList: [5, 7]
      }
    });

    it("都道府県の数だけチェックボックスが生成されること", () => {
      const inputs = wrapper.findAll('input[type="checkbox"]');
      expect(inputs.length).toBe(10);
    });

    it("選択済み都道府県にチェックが付くこと", () => {
      const inputPref5 = wrapper.find('#prefecture-5');
      expect(inputPref5.element.checked).toBe(true);

      const inputPref6 = wrapper.find('#prefecture-6');
      expect(inputPref6.element.checked).toBe(false);

      const inputPref7 = wrapper.find('#prefecture-7');
      expect(inputPref7.element.checked).toBe(true);
    });

    it("チェックボックス押下で、ペイロードにprefCodeを持つemitが発行されること", () => {
      const inputPref6 = wrapper.find('#prefecture-6');
      inputPref6.trigger('click', {prefCode: 6 });

      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.emitted().click[0]).toEqual([6]);
    });
  })
});
