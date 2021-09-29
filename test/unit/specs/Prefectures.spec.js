import { mount } from '@vue/test-utils'
import Prefectures from "@/components/Prefectures";

describe("Prefectures.vue", () => {
  it("コンポーネントがmountされること", () => {
    const wrapper = mount (Prefectures)
    expect(wrapper.exists()).toBe(true)
  });

  describe("チェックボックスの検証", () => {
    const wrapper = mount (Prefectures, {
      propsData:{
        list: [
          { "prefCode": 1, "prefName": "北海道" },
          { "prefCode": 2, "prefName": "青森県" },
          { "prefCode": 3, "prefName": "岩手県" },
          { "prefCode": 4, "prefName": "宮城県" },
          { "prefCode": 5, "prefName": "秋田県" },
          { "prefCode": 6, "prefName": "山形県" },
          { "prefCode": 7, "prefName": "福島県" },
          { "prefCode": 8, "prefName": "茨城県" },
          { "prefCode": 9, "prefName": "栃木県" },
          { "prefCode": 10, "prefName": "群馬県" }
        ],
        selectedList: [5, 7]
      }
    });

    it("都道府県の数だけチェックボックスが生成されること", () => {
      const inputs = wrapper.findAll('input[type="checkbox"]')
      expect(inputs.length).toBe(10);
    });

    it("選択済み都道府県にチェックが付くこと", () => {
      const inputPref5 = wrapper.find('#prefecture-5')
      expect(inputPref5.element.checked).toBe(true);

      const inputPref6 = wrapper.find('#prefecture-6')
      expect(inputPref6.element.checked).toBe(false);

      const inputPref7 = wrapper.find('#prefecture-7')
      expect(inputPref7.element.checked).toBe(true);
    });

    it("チェックボックス押下でemitが発行されること", () => {
      // FIXME: エラーが出る。またemitがカウントされない
      const inputPref6 = wrapper.find('#prefecture-6')
      inputPref6.trigger('change', {prefCode: 6 })
      console.log(wrapper.emitted())
    });
  })
});
