import Vue from "vue";
import Vuex from "vuex";
import base from "./modules/base";
import modals from "./modules/modals";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    modals
  }
});
