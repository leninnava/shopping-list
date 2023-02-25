import { type ReactNode, type FC } from 'react'
import { AnimatePresence, m } from 'framer-motion'
interface TodoListProps {
  children: ReactNode[]
}
const TodoList: FC<TodoListProps> = ({ children }) => {
  return (
    <m.ul layout
      className="mx-auto w-full flex max-w-xl flex-col gap-4"
    >
      <AnimatePresence>{children}</AnimatePresence>
    </m.ul>
  )
}

export default TodoList
