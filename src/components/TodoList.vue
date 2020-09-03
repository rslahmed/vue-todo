<template>
  <div class>
    <div class="todo_input">
      <input
        type="text"
        class="w-full"
        placeholder="Task name"
        v-model="todoTitle"
        @keyup.enter="addTodo"
      />
    </div>
    <div class="todo_wrap">
      <TodoItem 
      v-for="(todo, index) in filteredTodos" 
      :key="todo.id" 
      :index="index" 
      :todo="todo"
      @removeTodo="removeTodo"
      @enterEditingMode="enterEditingMode"
      @cancleEditing="cancleEditing"
      />
    </div>
    <div class="todo_footer border-t border-gray-400 mt-3 pt-3 flex flex-row">
      <div class="check_all">
        <input
          type="checkbox"
          class="ml-1 mr-3"
          id="checkAll"
          @click="checkAllTodo"
          :checked="!anyRemaining && totalTodos != 0"
        />
        <label for="checkAll">Check all</label>
      </div>

      <div class="remove_all ml-auto">
        <span>{{ remaining }} items remaining</span>
      </div>
    </div>
    <div class="todo_filters flex flex-row border-t border-gray-400 mt-3 pt-3">
      <button
        class="btn_default mr-1"
        :class="{'bg-gray-400': filter == 'all'}"
        @click="filter = 'all'"
      >All</button>
      <button
        class="btn_default mr-1"
        :class="{'bg-gray-400': filter == 'active'}"
        @click="filter = 'active'"
      >Active</button>
      <button
        class="btn_default"
        :class="{'bg-gray-400': filter == 'complated'}"
        @click="filter = 'complated'"
      >Complated</button>
      <button
        class="btn_default ml-auto"
        v-show="anyComplated"
        @click="clearComplated"
      >Clear complated</button>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      todoTitle: "",
      lastId: 3,
      todos: [
        {
          id: 1,
          title: "Go to store",
          complated: false,
          editing: false,
        },
        {
          id: 2,
          title: "Go to school",
          complated: false,
          editing: false,
        },
      ],
      filter: "all",
      todoEditingCache: "",
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.complated).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    totalTodos() {
      return this.todos.length;
    },
    anyComplated() {
      return this.todos.filter((todo) => todo.complated).length;
    },
    filteredTodos() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter((todo) => !todo.complated);
      } else if (this.filter == "complated") {
        return this.todos.filter((todo) => todo.complated);
      }
      return this.todos;
    },
  },
  methods: {
    addTodo() {
      if (this.todoTitle == "") {
        return;
      }

      let newTodo = {
        id: this.lastId,
        title: this.todoTitle,
        complated: false,
        editing: false,
      };
      this.todos.push(newTodo);
      this.lastId++;
      this.todoTitle = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodo() {
      this.todos.forEach((todo) => (todo.complated = event.target.checked));
    },
    clearComplated() {
      return (this.todos = this.todos.filter((todo) => !todo.complated));
    },
    enterEditingMode(todo) {
      todo.editing = true;
      this.todoEditingCache = todo.title;
    },
    cancleEditing(todo) {
      todo.title = this.todoEditingCache;
      todo.editing = false;
    },
  },
};
</script>

<style>
.single_todo {
  padding: 5px;
}

.single_todo {
  padding: 5px;
}

.todo_input input {
  border: 1px solid #999;
  border-radius: 3px;
  padding: 8px 15px;
  min-width: 300px;
}

.todo_input {
  margin: 20px 0;
}

.single_todo input {
  margin-right: 10px;
  margin-top: 6px;
}

span.close_todo {
  font-size: 22px;
  line-height: 19px;
  display: inline-block;
  margin-left: auto;
  cursor: pointer;
  font-weight: 700;
}

.single_todo p {
  display: flex;
}

.single_todo input.todo_edt {
  width: 100%;
  margin-right: 0;
  padding: 6px 10px;
  font-size: 15px;
}

.todo_complate {
  text-decoration: line-through;
}
</style>