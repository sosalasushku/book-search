import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'
import { useAppSelector } from './app/hooks'

function App() {

  const currentBook = useAppSelector(state => state.results.currentBook)
  console.log(currentBook)

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path={'/'} element={<SearchPage />} />
          {
            currentBook ? <Route path={'/:id'} element={<BookPage b={currentBook} />} /> : ''
          }

        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
