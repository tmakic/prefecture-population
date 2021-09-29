import { shallowMount } from '@vue/test-utils'
import App from "@/App";

describe("App.vue", () => {
  it("コンポーネントがmountされること", () => {
    const wrapper = shallowMount (App)
    expect(wrapper.exists()).toBe(true)
  });
});
