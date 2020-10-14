import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import TodoModel from '@/models/TodoModel';

@Module({ namespaced: true, name: 'modules/Todos' })
export default class Todos extends VuexModule {
  public showForm: boolean = false;

  @Mutation
  public changeShowForm(status: boolean) {
    this.showForm = status;
  }

  @Action
  public changeShowFormAction(status: boolean) {
    this.context.commit('changeShowForm', status);
  }
}
