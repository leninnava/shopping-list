import { useCallback, useEffect, useState } from 'react'
import TodoForm from './components/TodoForm/TodoForm'
import TodoItem from './components/TodoList/TodoItem'
import TodoList from './components/TodoList/TodoList'
import type Todo from './types/types'

function App (): JSX.Element {
  const [TodoItems, setTodoItems] = useState<Todo[]>([])

  /// Handlers

  const getTodoItems = (): Todo[] => {
    const localStorageItems = localStorage.getItem('todoItems')

    return (localStorageItems != null) ? JSON.parse(localStorageItems) : []
  }

  // Setters

  const deleteTodoItem = useCallback((id: number): void => {
    setTodoItems((prevItems: Todo[]): Todo[] => {
      const newItems = prevItems.filter((item: Todo): boolean => item.id !== id)
      localStorage.setItem('todoItems', JSON.stringify(newItems))
      return newItems
    })
  }, [])

  /// On mount

  useEffect(() => {
    setTodoItems(getTodoItems())
  }, [])

  return (
    <div className="grid place-content-center place-items-center w-full min-h-screen">
      <h1
        className="text-center
       text-3xl font-bold text-blue-500"
      >
        Shopping List!
      </h1>
      <p className='text-center'>
        {`${TodoItems.length} ${TodoItems.length === 1 ? 'item' : 'items'}`}
        {' '}
        {TodoItems.length === 0 && (<span className='block'>Add something to the list!</span>)}
      </p>
      <TodoList>
        {TodoItems.map((item: Todo) => (
          <TodoItem key={item.id} id={item.id} name={item.name} deleteHandler={deleteTodoItem} />
        ))}
      </TodoList>
      <TodoForm todoItemsSetter={setTodoItems} />
    </div>
  )
}

export default App
