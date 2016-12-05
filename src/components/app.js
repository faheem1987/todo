import React, { Component } from 'react';
import Todo from './todo';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="row todo-header">
          <h3> To do list </h3>
        </header>
        <Todo />
      </div>
    );
  }
}
