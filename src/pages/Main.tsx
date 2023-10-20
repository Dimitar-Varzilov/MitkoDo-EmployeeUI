/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { UUID } from 'crypto'

import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../context'

const Main: FC = () => {
  const { data, employeeData, fetchEmployeeData, fetchEmployeeTasks } =
    useAppContext()
  const navigate = useNavigate()

  const handleFetchEmployeeData = () => {
    fetchEmployeeData()
    fetchEmployeeTasks()
  }

  const handleTaskClick = (id: UUID) => {
    navigate(`/todo/${id}`)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      <div>{employeeData.name}</div>
      {new Date().toLocaleDateString()}
      <div>
        <button onClick={handleFetchEmployeeData}>Fetch data</button>
      </div>
      <hr />
      <div>
        {data.map((todo) => (
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
