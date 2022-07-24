
import * as SQLite from "expo-sqlite";
import { Dispatch } from "react";
import { Platform } from 'react-native';
import { LOGIN } from "./constants";
import { PayLoad, UserProfile } from "./interfaces";


function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("db.db");
    return db;
  }
  
  
export const db = openDatabase();




export const createTable = ()=>  db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS"
        + " Users"
        + ` (ID INTEGER PRIMARY KEY AUTOINCREMENT,_id TEXT,accessToken Text,
            fullName TEXT, age TEXT,gender TEXT, phoneNumber TEXT,
            location TEXT, ghanaCardNumber TEXT,password TEXT,
            isAWorker TEXT,isOnline TEXT, isActive TEXT
            )`,
        [],
        (tx,res)=> {},
        (_,err)=> { console.log(err); return false}
    )
  })



export const fetchUser = (dispatch : Dispatch<PayLoad>)=>{

    db.transaction(
        (tx) => {
        tx.executeSql("select * from Users", [], (_, { rows }) =>{
            if(rows.length !== 0){
                // dispatch() -> set the user from the local storage
                dispatch({type : LOGIN , payload : rows._array[0] })
            }
        });


    })

}


export const addUserToDB = async(userData : UserProfile, Toast : any)=>{
    const {
        _id, age,fullName,gender,location, 
        password,phoneNumber,accessToken,ghanaCardNumber, 
        isAWorker, isActive, isOnline
    } = userData;


    try{
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Users (
                _id, accessToken, fullName, age, gender, phoneNumber, location, ghanaCardNumber,
                password, isAWorker, isOnline, isActive
                ) 
                VALUES (
                    '${_id}','${accessToken}', '${fullName}', '${age}', '${gender}', '${phoneNumber}', 
                    '${location}', '${ghanaCardNumber}', '${password}', '${isAWorker}', '${isOnline}',
                    '${isActive}'
                    
                )`,
                [],
                (tx,res)=> {
                    Toast.shotw({title : "User added successfully"})
                },
                (tx,err)=> {
                    Toast.show({title : err});
                    return false;
                }
            )
            
        })

    }catch(err){ console.log(err)}
}