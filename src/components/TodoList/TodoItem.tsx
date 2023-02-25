import { useCallback, useRef, useState, type FC } from 'react'
import { motion as m } from 'framer-motion'

interface TodoItemProps {
  id: number
  name: string
  deleteHandler: (id: number) => void
}

const TodoItem: FC<TodoItemProps> = ({ id, name, deleteHandler }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const timeoutId = useRef<number>()

  /// Handlers

  const deleteTodo = useCallback((id: number): void => {
    setIsDeleting(true)
    timeoutId.current = setTimeout(() => {
      deleteHandler(id)
      setIsDeleting(false)
    }, 5000)
  }, [])

  const undoDelete = (): void => {
    clearTimeout(timeoutId.current)
    setIsDeleting(false)
  }

  return (
    <m.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-between gap-2 ${
        isDeleting ? 'bg-slate-400' : 'bg-teal-700'
      } rounded-md p-2`}
    >
      <span className="font-medium text-white">{name}</span>
      {isDeleting && (
        <button onClick={undoDelete} className="font-medium text-white">
          Undo?
        </button>
      )}

      {!isDeleting && (
        <button
          onClick={() => {
            deleteTodo(id)
          }}
          className="rounded-md bg-white px-2"
        >
          Delete
        </button>
      )}
    </m.li>
  )
}

export default TodoItem
