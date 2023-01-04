import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const RequireAuth = (props) => {
  const { isAuth } = useContext(AuthContext)

  if (!isAuth) return <Navigate to='/' replace />

  return props.children
}
export default RequireAuth
