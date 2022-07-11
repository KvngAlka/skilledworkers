import { Dispatch } from "react"

export interface GlobalState {
    theme : "dark" | "light",
    user : UserProfile | null, 
}

export interface DataContextInterface {
    // dispatch : React.ReducerWithoutAction<PayLoad>,
    dispatch : Dispatch<PayLoad>
    state : GlobalState
}

export interface UserProfile {
    fullName : String,
    age : String,
    phoneNumber : String,
    location : String,
    ghanaCardNumber? : String,
    password : String,
    isAWorker? : Boolean,
    isOnline? : Boolean,
    isActive? : Boolean
}

export interface PayLoad {
    type : string,
    payload? : any
}