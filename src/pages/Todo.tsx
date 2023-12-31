/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { UUID } from 'crypto'

import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetEmployeeToDosQuery } from '../api/toDoApi'

const Todo = () => {
  const { todoId } = useParams()
  const { data = [] } = useGetEmployeeToDosQuery()
  const todo = useMemo(
    () => data.find((t) => t.todoId === todoId),
    [data, todoId],
  )

  const navigate = useNavigate()
  const handleSubTaskClick = (subTaskId: UUID) =>
    navigate(`/subtask/${subTaskId}`, { replace: true })

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!todo ? (
        <p>Todo not found</p>
      ) : (
        <div>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <div>
            {todo.subTasks.map((subTask) => (
              <div
                key={subTask.subTaskId}
                onClick={() => handleSubTaskClick(subTask.subTaskId)}
              >
                <p className="hover:cursor-pointer">{subTask.title}</p>
                <span>
                  <input
                    className="hover:cursor-not-allowed"
                    type="checkbox"
                    checked={subTask.isComplete}
                    disabled
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Todo
