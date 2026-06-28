import './App.css'
import MainPage from './pages/MainPage/MainPage'
import { wakeUpBot } from './api/app-api'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel'))

const App = () => {
  useEffect(() => {
    wakeUpBot()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/admin/*' element={
          <Suspense fallback={<div style={{padding: '2rem', color: '#fff'}}>Завантаження...</div>}>
            <AdminPanel />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
