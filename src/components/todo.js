import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	todoItemAction,
	deleteTodoItemAction,
	fetchTodos,
	completedTodoItemAction
} from "../actions/index";

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this._getInputValue = this._getInputValue.bind(this);
		this._renderTodos = this._renderTodos.bind(this);
		this._renderDate = this._renderDate.bind(this);
		this._setRefs = this._setRefs.bind(this);
		this.state = { emptyForm: false, toggle: true };
	}

	componentDidMount() {
		this.props.fetchTodos();
	}

	_getInputValue() {
		const { todos } = this.props;
		const todosLength = todos.length || 0;
		const inputVal = this.inputRef.value;
		if (inputVal) {
			this.props.todoItemAction({ inputVal, todosLength });
			this.inputRef.value = "";
			this.setState({ emptyForm: false });
			return;
		}
		this.setState({ emptyForm: true });
	}

	_onCompleteTodoItem(index, isCompleted) {
		const { completedTodoItemAction } = this.props;
		if (isCompleted) {
			completedTodoItemAction(index, false);
			return;
		}
		completedTodoItemAction(index, true);
	}

	_renderDate({ date }) {
		var d = new Date(date);
		return (
			<span>
				{d.getMonth() + 1}/{d.getDate()}/{d.getFullYear()}
			</span>
		);
	}

	_renderTodos() {
		const { todos, deleteTodoItemAction } = this.props;
		return todos.map(function(todo, index) {
			const completedItem = classNames("item bg-info fadeIn animated", {
				completedItem: todo.completed
			});
			const checkBox = classNames(
				!todo.completed ? "ion-ios-checkmark-outline" : "ion-ios-checkmark"
			);
			return (
				<li className={completedItem} key={index}>
					{<div className="date">{this._renderDate(todo)}</div>}
					<div className="todo">{todo.item}</div>
					<div className="actions">
						{
							<i
								className={checkBox}
								onClick={() => this._onCompleteTodoItem(index, todo.completed)}
							/>
						}
						{
							<i
								className="ion-android-close"
								onClick={() => deleteTodoItemAction(index)}
							/>
						}
					</div>
				</li>
			);
		}, this);
	}

	_setRefs(el) {
		this.inputRef = el;
	}

	render() {
		const { todos } = this.props;
		return (
			<div className="todo-wrapper">
				{this.state.emptyForm && (
					<div className="bg-danger">Please enter todo.</div>
				)}
				<form className="todo-form">
					<input type="text" ref={this._setRefs} className="todo-input" />
					<button
						type="button"
						className="btn btn-success"
						onClick={this._getInputValue}
					>
						{" "}
						Submit{" "}
					</button>
				</form>
				{!!todos && !!todos.length && <TodoList list={this._renderTodos()} />}
			</div>
		);
	}
}

Todo.propTypes = {
	todos: PropTypes.array,
	todoItemAction: PropTypes.func,
	deleteTodoItemAction: PropTypes.func,
	completedTodoItemAction: PropTypes.func,
	fetchTodos: PropTypes.func
};

export default connect(
	state => ({
		todos: state.todoItemReducer.todos
	}),
	{
		todoItemAction,
		deleteTodoItemAction,
		completedTodoItemAction,
		fetchTodos
	}
)(Todo);
