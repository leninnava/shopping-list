import { useCallback, useRef, useState, type FC } from 'react'

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
    <li className={`flex gap-2 justify-between items-center ${isDeleting ? 'bg-slate-400' : 'bg-blue-400'} rounded-md p-2`}>
      <span className="text-white font-medium">{name}</span>
      {isDeleting && <button onClick={undoDelete} className="text-white font-medium">Undo?</button>}

      {!isDeleting && <button onClick={() => { deleteTodo(id) }} className="bg-white rounded-md px-2">Delete</button>}
      </li>
  )
}

export default TodoItem
