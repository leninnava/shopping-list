
import { type ReactNode, type FC } from 'react'

interface TodoListProps {
  children: ReactNode[]
}

const TodoList: FC<TodoListProps> = ({ children }) => {
  return (
        <ul className="flex flex-col gap-2">
          {children}
        </ul>
  )
}

export default TodoList
