import { createAction } from "redux-actions";

export const GET_TODO_ITEM = "GET_TODO_ITEM";

export const DELETE_TODO_ITEM = "DELETE_TODO_ITEM";

export const RETRIEVE_TODOS_REQUEST = "RETRIEVE_TODOS_REQUEST";

export const RETRIEVE_TODOS_SUCCESS = "RETRIEVE_TODOS_SUCCESS";

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
		.then(function(snapshot) {
			var username = snapshot.val();
			return username;
		});
}

function postTodo(item, index) {
	firebase
		.database()
		.ref("posts/" + (index + 1))
		.set({ item });
	return getTodos().then(result => result);
}

function markTodoAsCompleted(keyName, isCompleted) {
	firebase
		.database()
		.ref("posts/" + keyName)
		.update({ completed: isCompleted });
	return getTodos().then(result => result);
}

function deletePost({ keyName }) {
	var deletePost = firebase.database().ref("posts/" + keyName);
	return deletePost.remove().then(function() {
		return getTodos().then(result => result);
	});
}

export function retrieveTodosActionRequest() {
	return {
		type: RETRIEVE_TODOS_REQUEST,
		payload: getTodos().then(result => retrieveTodosAction(result))
	};
}

function retrieveTodosAction(result) {
	return {
		type: RETRIEVE_TODOS_SUCCESS,
		payload: result
	};
}

export function todoItemAction({ inputVal, todosLength }) {
	return {
		type: GET_TODO_ITEM,
		payload: postTodo(inputVal, todosLength)
	};
}

export function deleteTodoItemAction(itemToDelete) {
	return {
		type: DELETE_TODO_ITEM,
		payload: deletePost(itemToDelete)
	};
}

export function completedTodoItemAction(keyName, isCompleted) {
	return {
		type: COMPLETED_TODO_ITEM,
		payload: markTodoAsCompleted(keyName, isCompleted)
	};
}
