<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col cols="12">
          <AddNewTodoForm @refresh="reFetchTodos" />
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col cols="12 text-right">
          <b-button variant="success" @click="toggleShowForm" v-if="!showForm">Add New Todo</b-button>
          <b-button variant="danger" @click="toggleShowForm" v-if="showForm">Cancel</b-button>
        </b-col>
      </b-row>

      <hr />

      <b-row class="mt-5">
        <b-col cols="12">
          <ListTodos title="Todos" listType="active" :todos="todos" @refresh="reFetchTodos" />
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col cols="12">
          <ListTodos title="Completed Todos" listType="completed" :todos="todos" @refresh="reFetchTodos" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import gql from 'graphql-tag';
import AddNewTodoForm from '@/components/AddNewTodoForm.vue';
import ListTodos from '@/components/ListTodos.vue';

const todoStore = namespace('Todos');

@Component({
  components: {
    ListTodos,
    AddNewTodoForm,
  },
  apollo: {
    todos: gql`query {
      todos {
        id
        description
        isDone
      }
    }`,
  },
})
export default class Home extends Vue {
  @todoStore.State
  public showForm!: boolean;

  @todoStore.Action
  public changeShowFormAction!: (status: boolean) => void;

  private toggleShowForm(): void {
    this.changeShowFormAction(!this.showForm);
  }

  private reFetchTodos(): void {
    this.$apollo.queries.todos.refetch();
  }
}
</script>
