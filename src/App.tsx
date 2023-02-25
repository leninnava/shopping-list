import { useCallback, useEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import TodoForm from './components/TodoForm/TodoForm'
import TodoItem from './components/TodoList/TodoItem'
import TodoList from './components/TodoList/TodoList'
import type Todo from './types/types'
import { LazyMotion, domAnimation } from 'framer-motion'

function App (): JSX.Element {
  const [TodoItems, setTodoItems] = useState<Todo[]>([])

  /// Handlers

  const getTodoItems = (): Todo[] => {
    const localStorageItems = localStorage.getItem('todoItems')

    return localStorageItems != null ? JSON.parse(localStorageItems) : []
  }

  // Setters

  const deleteTodoItem = useCallback((id: number): void => {
    setTodoItems((prevItems: Todo[]): Todo[] => {
      const newItems = prevItems.filter(
        (item: Todo): boolean => item.id !== id
      )
      localStorage.setItem('todoItems', JSON.stringify(newItems))
      return newItems
    })
  }, [])

  /// On mount

  useEffect(() => {
    setTodoItems(getTodoItems())
  }, [])

  return (
    <LazyMotion features={domAnimation}>

    <Layout>
      <p className="text-center">
        {`${TodoItems.length} ${TodoItems.length === 1 ? 'item' : 'items'}`}{' '}
        {TodoItems.length === 0 && (
          <span className="block">Add something to the list!</span>
        )}
      </p>
      <TodoList>
        {TodoItems.map((item: Todo) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            deleteHandler={deleteTodoItem}
          />
        ))}
      </TodoList>
      <TodoForm todoItemsSetter={setTodoItems} />
    </Layout>
    </LazyMotion>

  )
}

export default App
