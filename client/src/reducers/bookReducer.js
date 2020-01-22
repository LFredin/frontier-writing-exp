import {GET_ALL_USERS_BOOKS, CREATE_BOOK, GET_BOOK, ERROR} from '../actions/types';

const initialState = {
    userBooks: [],
    selectedBook: {} //idk if needed
}

export default function(state = initialState, action){

    if(action.type === GET_BOOK){
        return {
            ...state,
            selectedBook: action.payload
        }
    }else if(action.type === GET_ALL_USERS_BOOKS){
        return {
            ...state,
            userBooks: action.payload
        }
    }
    //else if (action.type === CREATE_BOOK){
    //}
    else if(action.type === ERROR){
        return{
            ...state,
            error: action.error
        }
    }
    else{
        return state;
    }


}