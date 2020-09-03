<template>
  <div class="single_todo">
    <p v-if="!todo.editing" @dblclick="enterEditingMode(todo)">
      <input type="checkbox" @change="todo.complated = !todo.complated" :checked="todo.complated" />
      <span :class="{'todo_complate': todo.complated}">{{ todo.title }}</span>
      <span class="close_todo" @click="removeTodo(index)">&times;</span>
    </p>
    <input
      class="todo_edt"
      v-else
      type="text"
      v-model="todo.title"
      @blur="todo.editing = false"
      @keyup.enter="todo.editing = false"
      @keyup.esc="cancleEditing(todo)"
      v-focus
    />
  </div>
</template>

<script>
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
    return {};
  },
  methods: {
    removeTodo() {
      this.$emit('removeTodo', this.index);
    },
    enterEditingMode(){
        this.$emit('enterEditingMode', this.todo)
    },
    cancleEditing(){
      this.$emit('cancleEditing', this.todo)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>