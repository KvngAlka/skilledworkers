import React, { createContext, useContext, useReducer } from 'react'
import { DataContextInterface, UserProfile } from './interfaces'
import { initialState, reducer } from './reducer';



const DataContext = createContext({state : initialState} as DataContextInterface)

const DataProvider = ({children} : {children : any}) => {

    const [state, dispatch] = useReducer(reducer,initialState);
  return (
    <DataContext.Provider value={{state,dispatch}}> 
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider


export const useStateValue = ()=> useContext(DataContext);