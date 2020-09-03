<template>
  <div id="app" class="w-1/4 container mt-6 mx-auto">
    <div class="logo">
      <img class="mx-auto" width="70" alt="Vue logo" src="./assets/logo.png">
    </div>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>

button:focus{
  outline: 0 !important;
}

.logo{
  text-align: center;
}
</style>
