import { createLocalVue, shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import vuetify from "vuetify";

describe("Header.vue", () => {
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(vuetify);

    wrapper = shallowMount(Header, {
      localVue,
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Checks header logo text", () => {
    expect(wrapper.text()).toContain("Movie-g");
  });
});
