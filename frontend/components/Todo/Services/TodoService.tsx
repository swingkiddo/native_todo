import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export default class TodoService {

    /* TODO CRUD */
    
    getTodos() {
        const url = `${API_URL}/todos/`
        return axios.get(url).then(response => response.data)
    }

    addTodo(data: {}) {
        const url = `${API_URL}/todos/`
        return axios.post(url, data)
    }

    updateTodo(pk: number, data: {}) {
        const url = `${API_URL}/todos/${pk}/`
        return axios.patch(url, data)
    }

    deleteTodo(pk: number) {
        const url = `${API_URL}/todos/${pk}`
        return axios.delete(url)
    }

    /* TODO LIST CRUD */

    getTodoLists() {
        const url = `${API_URL}/todolists/`
        return axios.get(url).then(response => response.data)
    }

    addTodoList(data: {}) {
        const url = `${API_URL}/todolists/`
        return axios.post(url, data)
    }
    
    updateTodoList(pk: number, data: {}) {
        const url = `${API_URL}/todolists/${pk}`
        return axios.patch(url, data)
    }

    deleteTodoList(pk: number) {
        const url = `${API_URL}/todolists/${pk}`
        return axios.delete(url)
    }
}
