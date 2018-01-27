import { createAction } from "redux-actions";

export const GET_TODO_ITEM = "GET_TODO_ITEM";

export const DELETE_TODO_ITEM = "DELETE_TODO_ITEM";

export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";

export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";

export const COMPLETED_TODO_ITEM = "COMPLETED_TODO_ITEM";

import * as firebase from "firebase";

// Initialize Firebase
var config = {
	apiKey: "AIzaSyA06JfE1cO0is_6RmGGWMTTO6t813pZMm8",
	authDomain: "todo-c16ba.firebaseapp.com",
	databaseURL: "https://todo-c16ba.firebaseio.com",
	storageBucket: "todo-c16ba.appspot.com",
	messagingSenderId: "294939248513"
};
firebase.initializeApp(config);

function getTodos() {
	return firebase
		.database()
		.ref("posts")
		.once("value")
		.then(snapshot => snapshot.val());
}

function postTodo(item, index) {
	firebase
		.database()
		.ref("posts/" + index)
		.set({ item: item, date: Date() });
	return getTodos().then(result => result);
}

function markTodoAsCompleted(index, isCompleted) {
	firebase
		.database()
		.ref("posts/" + index)
		.update({ completed: isCompleted });
	return getTodos().then(result => result);
}

function deletePost(index) {
	var deletePost = firebase.database().ref("posts/" + index);
	return deletePost.remove().then(function() {
		return getTodos().then(result => result);
	});
}

export function fetchTodos() {
	return {
		type: FETCH_TODOS_REQUEST,
		payload: getTodos().then(result => retrieveTodosAction(result))
	};
}

function retrieveTodosAction(result) {
	return {
		type: FETCH_TODOS_SUCCESS,
		payload: result
	};
}

export function todoItemAction({ inputVal, todosLength }) {
	return {
		type: GET_TODO_ITEM,
		payload: postTodo(inputVal, todosLength)
	};
}

export function deleteTodoItemAction(index) {
	return {
		type: DELETE_TODO_ITEM,
		payload: deletePost(index)
	};
}

export function completedTodoItemAction(index, isCompleted) {
	return {
		type: COMPLETED_TODO_ITEM,
		payload: markTodoAsCompleted(index, isCompleted)
	};
}
