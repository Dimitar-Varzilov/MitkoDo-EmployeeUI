import { type FormEventHandler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { ISubtask } from '../interfaces'

const Subtask = () => {
  const { subTaskId } = useParams()
  const { data, uploadImages } = useAppContext()
  const [subTask, setSubtask] = useState<ISubtask>()

  useEffect(() => {
    data.forEach((t) =>
      t.subTasks.forEach((s) => {
        if (s.subTaskId === subTaskId) {
          setSubtask(s)
          return true
        }
      }),
    )
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const formData = new FormData(event.currentTarget)
    uploadImages(formData, subTask?.subTaskId!)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!subTask ? (
        <p>Subtask not found</p>
      ) : (
        <div>
          <p>{subTask.title}</p>
          <p>{subTask.description}</p>
          <form onSubmit={handleSubmit}>
            <input type="file" name="images" accept="image/*" multiple />
            <input type="text" name="note" placeholder="Write a note" />
            <button type="submit">Done</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Subtask
