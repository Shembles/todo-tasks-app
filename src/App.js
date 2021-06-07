import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.states = {val: ' '};
    this.handleClick = this.handleClick.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      todos: [
        {
          taskID: 1,
          task: 'Go to town'
       },
       {
          taskID: 2,
          task: 'Feed the dog'
       },
       {
          taskID: 3,
          task: 'Wash the dishes'
       },
       {
          taskID: 4,
          task: 'Walk the walk'
       },
       {
          taskID: 5,
          task: 'Talk the talk'
       },
       {
          taskID: 6,
          task: 'Jump the jump'
       }
      ],
      completedTasks: [],
      draggedTask: {}
    }
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event ) => {
    const { completedTasks, draggedTask, todos } = this.state;
    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      todos: todos.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {},
    })
  }

  handleClick = (id) => {
    console.log(id)
    this.setState({ todos: this.state.todos.filter((todo) => todo.taskID !== id)})
    console.log(this.state.todos)
  }

  handleClicks = (id) => {
    console.log(id)
    this.setState({ completedTasks: this.state.completedTasks.filter((task) => task.taskID !== id)})
    console.log(this.state.completedTasks)
  }

  handleChange(event) {
    this.setState({val: event.target.value})
  }

  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    const newT = event.target.value
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, newT }

    this.setState([newT, newTask])
    
  }

  render() {
    const { todos, completedTasks} = this.state;
    console.log(this.states.val)
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" defaultValue={this.states.val} onChange={this.handleChange} />
          <button type="submit">Add Task</button>
        </form>
      <div className="container">
        <div className="todos">
        <h3 style={{backgroundColor: "gray", marginTop: 0}}>Current Tasks</h3>
          <h3>
            {
              todos.map(todo =>
                <div
                  key={todo.taskID}
                  draggable
                  onDrag={(event) => this.onDrag(event, todo)}
                  >
                  <div>{todo.task} <span onClick={() => {this.handleClick(todo.taskID)}} style={{ color: "red", fontSize: 14, float: "right", marginRight: 10 }}>x</span> </div>
                </div>
              )
            }
          </h3>
        </div>
        <div
          onDrop={event => this.onDrop(event)}
          onDragOver={(event => this.onDragOver(event))}
          className="done"
        >
          <h3 style={{backgroundColor: "lightgray", marginTop: 0}}>Completed Tasks</h3>
          <h3>
            {completedTasks.map((task, index) =>
              <div
                key={task.taskID}
                draggable
              >
                <div>{task.task} <span onClick={() => {this.handleClicks(task.taskID)}} style={{ color: "red", fontSize: 12, float: "right", marginRight: 10 }}>x</span> </div>
              </div>
            )}
          </h3>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
