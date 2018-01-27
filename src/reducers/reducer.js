import {
	GET_TODO_ITEM,
	DELETE_TODO_ITEM,
	RETRIEVE_TODOS_REQUEST,
	COMPLETED_TODO_ITEM
} from "../actions/index";
const initialState = {
	todos: []
};

function todoItemReducer(state = initialState, action) {
	if (action.type === "FETCH_TODOS_REQUEST") {
		return {
			...state,
			todos: action.payload.payload || []
		};
	} else if (action.type === "GET_TODO_ITEM") {
		return {
			todos: action.payload
		};
	} else if (action.type === "DELETE_TODO_ITEM") {
		return {
			todos: action.payload
		};
	} else if (action.type === "COMPLETED_TODO_ITEM") {
		return {
			todos: action.payload
		};
	}
	return state;
}

const allReducers = {
	todoItemReducer
};

export default allReducers;
