import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
      draggedTask: {},
      editItem: false,
      val: ' '
    }
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  }
  // onDrag = (event, task) => {
  //   event.preventDefault();
  //   this.setState({
  //     draggedTask: task
  //   });
  // }

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
    console.log(todos)
  }
  // onDrop = (event ) => {
  //   const { completedTasks, draggedTask, todos } = this.state;
  //   this.setState({
  //     // todos: [...todos, draggedTask],
  //     // completedTasks: completedTasks.filter(task => task.taskID !== draggedTask.taskID),
  //     draggedTask: {},
  //   })
  // }

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

  handleEdit = (id) => {
    const filteredItems =  this.state.todos.filter((todo) => todo.taskID !== id)
    const selectedItem = this.state.todos.find((todo) => todo.taskID === id)
    this.setState({
      todos: filteredItems,
      val: selectedItem.task,
      taskID: id,
    })
    console.log("temp >>",selectedItem.task)
  }

  handleSubmit(event) {
    if (this.state.val === '') {
      alert("Please insert a task")
    } 
    console.log("temp >>",this.state.val)
    if (this._inputElement.value !== "") {
      var newItem = {
        task: this._inputElement.value,
        taskID: Math.floor(Math.random() * 10000) + 1
      }
      this.setState((prevState) => {
        return {
          todos: prevState.todos.concat(newItem)
        }
      })
      this._inputElement.value = ""
    }
    this.setState({
      val: ''
    })
    console.log(this.state.todos)
    event.preventDefault()
  }

  render() {
    const { todos, completedTasks} = this.state;
    console.log(this.state.val)
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input ref={(a) => this._inputElement = a} type="text" value={this.state.val}  onChange={this.handleChange} />
          <button type="submit">Add Task</button>
        </form>
      <div className="container">
        <div 
            // onDrop={event => this.onDrop(event)}
            // onDragOver={(event => this.onDragOver(event))}
            className="todos"
        >
        <h3 style={{backgroundColor: "gray", marginTop: 0}}>Current Tasks</h3>
          <h3>
            {
              todos.map(todo =>
                <div
                  key={todo.taskID}
                  draggable
                  onDrag={(event) => this.onDrag(event, todo)}
                  >
                  <div>{todo.task} <span id="add" onClick={() => {this.handleEdit(todo.taskID)}} style={{ color: "green", fontSize: 14, float: "right", marginRight: 10 }}>+</span> <span onClick={() => {this.handleClick(todo.taskID)}} style={{ color: "red", fontSize: 14, float: "right", marginRight: 10 }}>x</span> </div>
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
                onDrag={(event) => this.onDrag(event, task)}
              >
                <div>{task.task} <span id="add" onClick={() => {this.handleEdit(task.taskID)}} style={{ color: "green", fontSize: 14, float: "right", marginRight: 10 }}>+</span> <span onClick={() => {this.handleClicks(task.taskID)}} style={{ color: "red", fontSize: 12, float: "right", marginRight: 10 }}>x</span> </div>
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
