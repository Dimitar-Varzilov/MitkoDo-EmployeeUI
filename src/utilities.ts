import type { IToDo } from './interfaces'

export const convertToDosDates = (todos: IToDo[]): IToDo[] => {
  return todos.map((todo) => {
    todo.dueDate = new Date(todo.dueDate)
    todo.startDate = new Date(todo.startDate)
    return todo
  })
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}
