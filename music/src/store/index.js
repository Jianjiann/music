import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutation'
import action from './action'
Vue.use(Vuex);
export default new Vuex.Store({
    state,
    getters,
    mutations,
    action
});