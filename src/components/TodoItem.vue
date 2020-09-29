<template>
  <div class="single_todo">
    <p v-if="!editing" @dblclick="enterEditingMode()">
      <input type="checkbox" @change="toggleComplete()" :checked="todo.completed" />
      <span :class="{'todo_complate': todo.completed}">{{ todo.title }}</span>
      <span class="close_todo" @click="removeTodo(todo.id)">&times;</span>
    </p>
    <input
      class="todo_edt"
      v-else
      type="text"
      v-model="todo.title"
      @blur="doneEditing()"
      @keyup.enter="doneEditing()"
      @keyup.esc="cancleEditing()"
      v-focus
    />
  </div>
</template>

<script>
import TodoService from '@/services/TodoService.js'

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      todoEditingCache: "",
      editing: false
    };
  },
  methods: {
    removeTodo() {
      this.$emit('removeTodo', this.todo.id);
    },
    enterEditingMode() {
      this.editing = true;
      this.todoEditingCache = this.todo.title;
    },
    cancleEditing() {
      this.todo.title = this.todoEditingCache;
      this.editing = false;
    },
    toggleComplete(){
      this.todo.completed = !this.todo.completed 
      TodoService.updateTodo(this.todo.id,{
        completed: this.todo.completed
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        return this.todo.completed = !this.todo.completed 
          console.log(error.response)
      })
      
    },
    doneEditing(){
      this.editing = false
      TodoService.updateTodo(this.todo.id, {
        title: this.todo.title
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        return this.todo.completed = !this.todo.completed 
          console.log(error.response)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>