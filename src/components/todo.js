import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	todoItemAction,
	deleteTodoItemAction,
	retrieveTodosActionRequest,
	completedTodoItemAction
} from "../actions/index";

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this._deleteTodoItem = this._deleteTodoItem.bind(this);
		this._getInputValue = this._getInputValue.bind(this);
		this._renderTodos = this._renderTodos.bind(this);
		this._renderDate = this._renderDate.bind(this);
		this.state = { emptyForm: false, toggle: true };
	}

	componentDidMount() {
		this.props.retrieveTodosActionRequest();
	}

	_getInputValue() {
		const { todos } = this.props;
		const todosLength =
			todos.posts !== null && Object.keys(todos.posts).length > 0
				? Object.keys(todos.posts).length
				: 0;
		const inputVal = this.refs.todo.value;
		if (inputVal) {
			this.props.todoItemAction({ inputVal, todosLength });
			this.refs.todo.value = "";
			this.setState({ emptyForm: false });
			return;
		}
		this.setState({ emptyForm: true });
	}

	_deleteTodoItem(index) {
		this.props.deleteTodoItemAction(index);
	}

	_onCompleteTodoItem(keyName, isCompleted) {
		const { completedTodoItemAction } = this.props;
		if (isCompleted) {
			completedTodoItemAction(keyName, false);
			return;
		}
		completedTodoItemAction(keyName, true);
	}

	_renderDate() {
		var d = new Date();
		return (
			<span>
				{d.getMonth() + 1}/{d.getDate()}/{d.getFullYear()}
			</span>
		);
	}

	_renderTodos(todo) {
		if (todo.posts !== null) {
			return Object.keys(todo.posts).map(function(keyName, index) {
				console.log(this);
				const completedItem = classNames("item bg-info fadeIn animated", {
					completedItem: todo.posts[keyName].completed
				});
				const checkBox = classNames({
					"ion-ios-checkmark-outline": !todo.posts[keyName].completed,
					"ion-ios-checkmark": todo.posts[keyName].completed
				});
				return (
					<li className={completedItem} key={index}>
						<div>{this._renderDate()}</div>
						<div>{todo.posts[keyName].item}</div>
						<div>
							<i
								className={checkBox}
								onClick={() =>
									this._onCompleteTodoItem(
										keyName,
										todo.posts[keyName].completed
									)
								}
							/>
							<i
								className="ion-android-close"
								onClick={() => this._deleteTodoItem({ keyName, todo })}
							/>
						</div>
					</li>
				);
			}, this);
		}
	}

	render() {
		const { todos } = this.props;
		const todoItem = Object.keys(todos).length
			? this._renderTodos(todos)
			: null;
		return (
			<div className="todo-wrapper">
				{this.state.emptyForm && (
					<div className="bg-danger">Please enter todo.</div>
				)}
				<form className="todo-form">
					<input type="text" ref="todo" className="todo-input" />
					<button
						type="button"
						className="btn btn-success"
						onClick={this._getInputValue}
					>
						{" "}
						Submit{" "}
					</button>
				</form>
				{todoItem && <TodoList list={todoItem} />}
			</div>
		);
	}
}

Todo.propTypes = {
	todos: PropTypes.object,
	todoItemAction: PropTypes.func,
	deleteTodoItemAction: PropTypes.func,
	completedTodoItemAction: PropTypes.func,
	retrieveTodosActionRequest: PropTypes.func
};

export default connect(
	state => ({
		todos: state.todoItemReducer
	}),
	{
		todoItemAction,
		deleteTodoItemAction,
		completedTodoItemAction,
		retrieveTodosActionRequest
	}
)(Todo);
