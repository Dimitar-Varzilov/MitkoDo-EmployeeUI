export enum URLs {
  EMPLOYEE = 'https://localhost:5001/Employee',
  TASK = 'https://localhost:5002/Task',
  AUTH = 'https://localhost:5000/',
}

export enum TagTypes {}

export enum FetchStatus {
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  IDLE = 'idle',
}

export enum ReducerNames {
  Auth = 'auth',
  AuthApi = 'authApi',
  EmployeeApi = 'employeeApi',
  Router = 'router',
  TaskApi = 'taskApi',
}
