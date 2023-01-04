import React, { useState } from 'react'

export const AuthContext = React.createContext({
  isAuth: false,
  changeAuth: (auth) => {},
})

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const defaultAuth = {
    isAuth,
    changeAuth: (auth) => {
      setIsAuth(auth)
    },
  }

  return (
    <AuthContext.Provider value={defaultAuth}>{children}</AuthContext.Provider>
  )
}
