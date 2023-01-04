import './App.css'
import Login from './pages/Login'
import { AuthProvider } from './AuthProvider'
import Main from './pages/Main'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
