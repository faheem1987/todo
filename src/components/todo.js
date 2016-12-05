import React from 'react';
import classNames from "classnames";
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { todoItemAction, deleteTodoItemAction,
  retrieveTodosActionRequest, completedTodoItemAction } from '../actions/index';

class Todo extends React.Component{
  constructor(props) {
    super(props);
    this._deleteTodoItem = this._deleteTodoItem.bind(this);
    this._getInputValue = this._getInputValue.bind(this);
    this._renderTodos = this._renderTodos.bind(this);
    this.state = {emptyForm: false, toggle: true}

  }

  componentDidMount() {
    this.props.retrieveTodosActionRequest();
  }

  _getInputValue(){
    const {todos} = this.props;
    const todosLength = todos.posts !== null && Object.keys(todos.posts).length > 0  ? 
      Object.keys(todos.posts).length : 0;
    const inputVal = this.refs.todo.value;
    if(inputVal) {
      this.props.todoItemAction({inputVal, todosLength});
      this.refs.todo.value = "";
      this.setState({emptyForm: false});
      return;
    }
    this.setState({emptyForm: true});
  }

  _deleteTodoItem(index) {
    this.props.deleteTodoItemAction(index);
  }

  _onCompleteTodoItem(keyName, isCompleted) {
    const { completedTodoItemAction } = this.props
    if(isCompleted){
      completedTodoItemAction(keyName, false);
      return;
    }
    completedTodoItemAction(keyName, true);
  }

  _renderDate(){
    var d = new Date();
    return(
      <span>{d.getMonth()}/{d.getDate()}/{d.getFullYear()}</span>
    );
  };

  _renderTodos(todo){
      const _self = this;
      if(todo.posts !== null){
        return Object.keys(todo.posts).map(function(keyName, index) {
          const completedItem = classNames("bg-info fadeIn animated",
            {"completedItem": todo.posts[keyName].completed }
           );
          const checkBox = classNames({
            "ion-ios-checkmark-outline": !todo.posts[keyName].completed,
            "ion-ios-checkmark": todo.posts[keyName].completed
          })
          return(
            <li className={completedItem} key={index}>
              <div className="todo-item">
                {todo.posts[keyName].item}
              </div>
              <div className="icon-wrapper">
                <i className={checkBox}
                  onClick={() => _self._onCompleteTodoItem(keyName, todo.posts[keyName].completed)}>
                </i>
                <i className="ion-android-close" 
                  onClick={() => _self._deleteTodoItem({keyName, todo})}>
                </i>
              </div>
              <div className="date-wrapper">{_self._renderDate()}</div>
            </li>
          )
        })
      }
  }

  render() {
    const {todos} = this.props;
    const todoItem = Object.keys(todos).length > 0   ?
     this._renderTodos(todos) : "";
    return(
      <div className="row todo-wrapper">
        <input type="text" ref="todo" className="todo-input" />
        <button type="button" className="btn btn-success" onClick={this._getInputValue}> Submit </button>
        {this.state.emptyForm &&
          <div className="bg-danger">
            Please enter todo.
          </div>
        }
        {todoItem &&
          <TodoList list={todoItem}/>
        }
      </div>

    ) 
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({retrieveTodosActionRequest,
    todoItemAction, deleteTodoItemAction, completedTodoItemAction}, dispatch);
}

function mapStateToProps(state) {
  return {
    todos: state.todoItemReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);