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
    _id? : string,
    accessToken? : string,
    fullName : string,
    age : string,
    gender : string,
    phoneNumber : string,
    location : string,
    ghanaCardNumber? : string,
    skills? : string[],
    password : string,
    isAWorker? : Boolean,
    isOnline? : Boolean,
    isActive? : Boolean
}


export interface PostProfile {
    _id? :string,
    title : string,
    description : string,
    location : string,
    workCategory : string,
    image? : any
}

export interface PayLoad {
    type : string,
    payload? : any
}