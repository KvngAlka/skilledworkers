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
    isAWorker? : boolean | string,
    isOnline? : boolean | string,
    isActive? : boolean | string
}


export interface PostProfile {
    _id? :string,
    name? : string,
    serviceName : string,
    subServiceName?: string,
    description? : string,
    location? : string,
    price? : string,
    isAccepted ?: boolean,
    imgUrl? : any
}

export interface PayLoad {
    type : string,
    payload? : any
}