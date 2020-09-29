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
        :class="{'bg-gray-400': filter == 'completed'}"
        @click="filter = 'completed'"
      >Completed</button>
      <button
        class="btn_default ml-auto"
        v-show="anyCompleted"
        @click="clearCompleted"
      >Clear completed</button>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoService from '@/services/TodoService.js'
export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      todoTitle: "",
      todos: [],
      filter: "all",
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    totalTodos() {
      return this.todos.length;
    },
    anyCompleted() {
      return this.todos.filter((todo) => todo.completed).length;
    },
    filteredTodos() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
  },
  methods: {
    addTodo() {
      if (this.todoTitle != "") {
        let newTodo = {
          title: this.todoTitle,
          completed: false,
        }
        TodoService.addTodo(newTodo)
        .then(response => {
          this.todoTitle = "";
          this.getApiTodo()
        })
        .catch(error => {
          console.log(error.response)
        })
    }
    },
    removeTodo(id) {
      TodoService.deleteTodo(id)
      .then(response => {
        this.getApiTodo()
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    checkAllTodo() {
      if(this.anyRemaining){
        this.todos.forEach((todo) => (todo.completed = true))
        this.updateCompleteApi(true)
      }else{
        this.todos.forEach((todo) => (todo.completed = false))
        this.updateCompleteApi(false)
      }
      this.todos.forEach((todo) => (todo.completed = event.target.checked))
    },
    clearCompleted() {
      let data = this.todos.filter(todo => todo.completed).map(todo=> todo.id)
      TodoService.clearCompleted({
        ids: data
      })
      .then(response=>{
          return (this.todos = this.todos.filter((todo) => !todo.completed))
      })
      .catch(error => {
        console.log(error.response);
      })
      
    },
    getApiTodo(){
      return TodoService.getTodos()
      .then(response => {
          this.todos = response.data
      })
      .catch(error => {
          console.log(error.response)
      })
    },
    updateCompleteApi(data){
      TodoService.checkAllTodo({
        completed: data
      })
      .then(response => {
          console.log(response.data)
      })
      .catch(error => {
          console.log(error.response)
      })
    }
  },
  created(){
    this.getApiTodo()
  }
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