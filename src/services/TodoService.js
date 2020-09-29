import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8082/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

    }
})

export default{
    getTodos(){
        return apiClient.get('/todos')
    },
    deleteTodo(id){
        return apiClient.delete('/todos/'+id)
    },
    addTodo(data){
        return apiClient.post('/todos', data)
    },
    updateTodo(id,data){
        return apiClient.patch('/todos/'+id, data)
    },
    checkAllTodo(data){
        return apiClient.patch('/todos/check-all', data)
    },
    clearCompleted(data){
        return apiClient.patch('/todos/clear-completed', data)
    }
}