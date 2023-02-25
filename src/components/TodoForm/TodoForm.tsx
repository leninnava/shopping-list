import { type Dispatch, type SetStateAction, useRef, type FC, useCallback } from 'react'
import type Todo from '../../types/types'

interface TodoFormProps {
  todoItemsSetter: Dispatch<SetStateAction<Todo[]>>
}
const TodoForm: FC<TodoFormProps> = ({ todoItemsSetter }) => {
  const inputValueRef = useRef<HTMLInputElement>(null)

  /// Handlers

  const addShoppingItem = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const enteredValue = inputValueRef.current?.value
    if (enteredValue === '') {
      return
    }
    todoItemsSetter((prevItems: Todo[]): Todo[] => {
      const newItem = {
        id: Math.round(Math.random() * 100),
        name: enteredValue
      }
      localStorage.setItem('todoItems', JSON.stringify([...prevItems, newItem]))
      return [...prevItems, newItem] as Todo[]
    })
  }, [])

  return (
    <form
      onSubmit={addShoppingItem}
      className="flex flex-col items-center gap-4 rounded-md p-2"
    >
      <label className='font-medium' htmlFor="item-name">Enter a new item</label>
      <input className='rounded-sm py-1' ref={inputValueRef} type="text" name="item-name" id="item-name" />
      <button
        className="w-fit"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
