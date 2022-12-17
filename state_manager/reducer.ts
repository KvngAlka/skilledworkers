import { LOGIN, LOGOUT, UPDATE_USER } from "./constants"
import { PayLoad } from "./interfaces"


export const initialState = {
    user : null
}



export const reducer = (state : any,action : PayLoad)=>{


    switch(action.type){
        case LOGIN:
            return {
                ...state, user : action.payload
            }

        case LOGOUT:
            return {
                user : null
            }

        case UPDATE_USER:
            return {
                
                user : {
                    ...state.user,
                    ...action.payload
                }
            }

        default:
            return {...state}
    }

}