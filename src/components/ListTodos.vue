<template>
  <div class="list-todos" v-if="filterTodos && filterTodos.length > 0">
    <h4>{{ title }}</h4>
    <b-list-group>
      <b-list-group-item v-for="todo in filterTodos" :key="todo.id" class="d-flex align-items-center justify-content-between">
        <b-form-checkbox :checked="todo.isDone" @change="updateTodo(todo.id, todo.isDone)">{{ todo.description }}</b-form-checkbox>
        <b-button variant="outline-warning" class="ml-auto">
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>
        <b-button variant="outline-danger" class="ml-1" @click="deleteTodo(todo.id)">
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';
import TodoModel from '@/models/TodoModel';

@Component
export default class ListTodos extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public listType!: string;
  @Prop() public todos!: TodoModel[];

  get filterTodos(): TodoModel[] | undefined {
    if (!this.todos) {
      return;
    }

    if (this.listType === 'active') {
      return this.todos.filter((item) => !item.isDone);
    }

    return this.todos.filter((item) => item.isDone);
  }

  private async updateTodo(todoId: number, todoStatus: boolean) {
    await this.$apollo.mutate({
      mutation: gql`mutation ($id: Int!, $isDone: Boolean!) {
        update_todos_by_pk(pk_columns: {id: $id}, _set: {isDone: $isDone}) {
          id
          description
          isDone
        }
      }`,
      variables: {
        id: todoId,
        isDone: !todoStatus,
      },
    });

    this.$emit('refresh');
  }

  private async deleteTodo(todoId: number) {
    await this.$apollo.mutate({
      mutation: gql`mutation ($id: Int!) {
        delete_todos_by_pk(id: $id) {
          id
        }
      }`,
      variables: {
        id: todoId,
      },
    });

    this.$emit('refresh');
  }
}
</script>
