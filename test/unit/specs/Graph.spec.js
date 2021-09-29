import { createLocalVue, mount } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api';
import Graph from "@/components/Graph";

const localVue = createLocalVue();
localVue.use(VueCompositionApi);

const mockTotalPopulation = [{
	"prefCode": 7,
	"prefName": "福島県",
	"data": [
		{ "year": 1960, "value": 2051137 },
		{ "year": 1965, "value": 1983754 },
		{ "year": 1970, "value": 1946077 },
		{ "year": 1975, "value": 1970616 },
		{ "year": 1980, "value": 2035272 },
		{ "year": 1985, "value": 2080304 },
		{ "year": 1990, "value": 2104058 },
		{ "year": 1995, "value": 2133592 },
		{ "year": 2000, "value": 2126935 },
		{ "year": 2005, "value": 2091319 },
		{ "year": 2010, "value": 2029064 },
		{ "year": 2015, "value": 1914039 },
		{ "year": 2020, "value": 1827632 },
		{ "year": 2025, "value": 1733103 },
		{ "year": 2030, "value": 1635235 },
		{ "year": 2035, "value": 1533521 },
		{ "year": 2040, "value": 1426392 },
		{ "year": 2045, "value": 1314903 }
	]
}];

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
});
