/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { UUID } from 'crypto'

import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetEmployeeDataQuery } from '../api/employeeApi'
import { useGetEmployeeToDosQuery } from '../api/toDoApi'

const Main: FC = () => {
  const { data: employeeData } = useGetEmployeeDataQuery()
  const { data: toDos = [] } = useGetEmployeeToDosQuery()
  const navigate = useNavigate()

  const handleTaskClick = (id: UUID) => {
    navigate(`/todo/${id}`)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      <div>{employeeData?.name}</div>
      {new Date().toLocaleDateString()}
      <hr />
      <div>
        {toDos.map((todo) => (
          <div
            className="hover:cursor-pointer"
            key={todo.todoId}
            onClick={() => handleTaskClick(todo.todoId)}
          >
            <p>Todo title: {todo.title}</p>
            <span>
              <input
                className="hover:cursor-not-allowed"
                type="checkbox"
                checked={todo.isComplete}
                disabled
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
