import React, { createContext, useState } from 'react'
export const UserContext = createContext(null)
export function UserContextProvider(props) {
  let [user, setUserState] = useState(JSON.parse(localStorage.getItem('user')))
  return (
    <UserContext.Provider
      value={{
        user,
        setUser: function (newUser) {
          if (newUser) {
            setUserState(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
          } else {
            setUserState()
            localStorage.removeItem('user')
          }
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}