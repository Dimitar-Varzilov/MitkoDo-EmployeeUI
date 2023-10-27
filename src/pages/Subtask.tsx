import { type FormEventHandler, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'

import {
  useGetEmployeeToDosQuery,
  useUploadNoteAndImagesMutation,
} from '../api/toDoApi'
import type { ISubtask, IUploadNoteAndPicturesDto } from '../interfaces'

const Subtask = () => {
  const { subTaskId } = useParams()
  const { data = [] } = useGetEmployeeToDosQuery()
  const [uploadImagesAndNote] = useUploadNoteAndImagesMutation()
  const idsRef = useRef<
    Partial<Pick<IUploadNoteAndPicturesDto, 'subTaskId' | 'todoId'>>
  >({})
  const subTask = useMemo(() => {
    let result: ISubtask | undefined

    data.forEach((t) =>
      t.subTasks.forEach((s) => {
        if (s.subTaskId === subTaskId) {
          result = s
          idsRef.current.subTaskId = s.subTaskId
          idsRef.current.todoId = t.todoId
        }
      }),
    )
    return result
  }, [data, subTaskId])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!idsRef.current.todoId || !idsRef.current.subTaskId) return
    const formData = new FormData(event.currentTarget)
    const dto: IUploadNoteAndPicturesDto = {
      formData,
      subTaskId: idsRef.current.subTaskId,
      todoId: idsRef.current.todoId,
    }
    uploadImagesAndNote(dto)
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
