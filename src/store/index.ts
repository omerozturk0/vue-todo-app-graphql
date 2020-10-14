import Vue from 'vue';
import Vuex from 'vuex';
import Todos from '@/store/modules/Todos';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Todos,
  },
});

export default store;
export const TodosModule = getModule(Todos, store);
