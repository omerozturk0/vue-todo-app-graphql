<template>
  <div class="add-new-todo-form">
    <b-form v-if="showForm" @submit.prevent.stop="onSubmit">
      <b-form-group
          id="input-group-description"
          label="Description:"
          label-for="input-description"
          description="We'll never share your email with anyone else."
      >
        <b-form-input
            id="input-description"
            v-model="form.description"
            type="text"
            required
            placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-is-done"
          label="Is Done?:"
          label-for="input-is-done"
      >
        <b-form-checkbox
            id="input-is-done"
            v-model="form.isDone"
        >Click if you want to add todo item as completed.</b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TodoModel from '@/models/TodoModel';
import gql from 'graphql-tag';

const todos = namespace('Todos');

@Component
export default class AddNewTodoForm extends Vue {
  @todos.State
  public showForm!: boolean;

  private form: TodoModel = new TodoModel();

  private async onSubmit() {
    await this.$apollo.mutate({
      mutation: gql`mutation ($description: String!, $isDone: Boolean!) {
        insert_todos_one(object: {description: $description, isDone: $isDone}) {
          id
          description
          isDone
        }
      }`,
      variables: {
        description: this.form.description,
        isDone: this.form.isDone,
      },
    });

    this.form = new TodoModel();
    this.$emit('refresh');
  }
}
</script>
