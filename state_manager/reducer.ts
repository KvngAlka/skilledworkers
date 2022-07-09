import { PayLoad } from "./interfaces"


export const initialState = {
    user : null
}



export const reducer = (state : any,action : PayLoad)=>{


    switch(action.type){
        case "LOGIN":
            return {
                ...state, user : action.payload
            }

        default:
            return {...state}
    }

}