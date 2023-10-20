import { type UUID } from 'crypto'

import type HttpStatusCode from './HttpStatusCode'

export interface RegisterDto {
  name: string
  confirmPassword: string
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface IEmployeeData {
  name: string
  employeeId: UUID
}

export interface ISubtask {
  title: string
  description: string
  isComplete: boolean
  subTaskId: UUID
}

export interface ITaskByEmployeeIdDto {
  title: string
  description: string
  dueDate: Date
  isComplete: boolean
  startDate: Date
  status: ToDoStatusEnum
  subTasks: ISubtask[]
  todoId: UUID
}

enum ToDoStatusEnum {
  Upcoming,
  Running,
  Completed,
  Uncompleted,
}

export interface ICustomError<T> {
  title: string
  errors: {
    [key in keyof T]: string
  }
  status: HttpStatusCode
}

export interface IUser {
  email: string
  userId: UUID
}
