import React, { ReactNode, useContext, useReducer } from 'react'
import { loadReducer } from '@/reducer/loadingReducer'

export const LoadingContext = React.createContext({
  visiable: false,
  show: () => {},
  hide: () => {}
})

type Props = {
  children?: ReactNode
}
export const LoadingContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(loadReducer, {
    visiable: false
  })

  const show = () => {
    dispatch({ type: 'show' })
  }

  const hide = () => {
    dispatch({ type: 'hide' })
  }

  return (
    <LoadingContext.Provider
      value={{
        visiable: state.visiable,
        show,
        hide
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  )
}
