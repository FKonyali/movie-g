import tr from "../i18n/tr.json";
import en from "../i18n/en.json";
import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n);

export default new VueI18n({
  locale: navigator.language.slice(0, 2) || "tr",
  messages: {
    tr,
    en,
  },
});
