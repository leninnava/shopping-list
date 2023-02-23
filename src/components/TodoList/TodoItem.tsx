import { type FC } from 'react'

interface TodoItemProps {
  id: number
  name: string
  deleteHandler: (id: number) => void
}

const TodoItem: FC<TodoItemProps> = ({ id, name, deleteHandler }) => {
  return (
        <li className="flex justify-between items-center bg-blue-400 rounded-md p-2">
            <span className="text-white font-medium">{name}</span>
            <button onClick={() => { deleteHandler(id) }} className="bg-white rounded-md px-2">Delete</button>
        </li>
  )
}

export default TodoItem
