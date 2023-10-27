import { type UUID } from 'crypto'

interface IBaseUser {
  name: string
  email: string
  password: string
  userId: UUID
}

export interface RegisterDto
  extends Pick<IBaseUser, 'name' | 'email' | 'password'> {
  confirmPassword: string
}

export interface LoginDto extends Pick<IBaseUser, 'email' | 'password'> {}

export interface IChangePasswordDto extends Pick<IBaseUser, 'email'> {
  confirmPassword: string
  newPassword: string
  oldPassword: string
}

export interface IUser extends Pick<IBaseUser, 'userId' | 'email'> {}

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

export interface IToDo {
  title: string
  description: string
  dueDate: string
  isComplete: boolean
  startDate: string
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

export interface IUploadNoteAndPicturesDto
  extends Pick<IToDo, 'todoId'>,
    Pick<ISubtask, 'subTaskId'> {
  formData: FormData
}
