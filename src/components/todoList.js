import React from "react";
import { connect } from "react-redux";

class TodoList extends React.Component {
	render() {
		return (
			<div>
				<ul className="todolist">{this.props.list}</ul>
			</div>
		);
	}
}

export default TodoList;
