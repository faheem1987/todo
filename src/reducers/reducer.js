import {GET_TODO_ITEM, DELETE_TODO_ITEM,
  RETRIEVE_TODOS_REQUEST, COMPLETED_TODO_ITEM} from "../actions/index"; 
const item = []; 

// function deleteTodo(payload, state){
//   return payload.todos.filter((_, index) => index !== payload.index);
// } 
function todoItemReducer(state = {}, action) {
   if(action.type === 'RETRIEVE_TODOS_REQUEST'){
      return {
        ...state,
        posts: action.payload.payload
      }
    } else if(action.type === 'GET_TODO_ITEM'){
      return {
        posts: action.payload
      }
    } else if (action.type === 'DELETE_TODO_ITEM' ) {
        return{
          posts: action.payload
        }
    } else if (action.type === 'COMPLETED_TODO_ITEM') {
        return {
          posts: action.payload
        }
      }
    return state;
};

const allReducers = {
  todoItemReducer
};

export default allReducers;