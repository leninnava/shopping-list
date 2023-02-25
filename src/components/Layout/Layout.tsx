import { type FC } from 'react'
interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const toggleDarkMode = (): void => {
    const html = document.querySelector('html')
    if (html != null) {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark')
      } else {
        html.classList.add('dark')
      }
    }
  }
  return (
    <div className="layout">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Shopping list!</h1>
        <button onClick={toggleDarkMode}>dark mode</button>
      </header>
      <main className="place-self-center place-items-center w-full px-4 lg:px-8">{children}</main>
      <footer className=''>footer</footer>
    </div>
  )
}

export default Layout
