import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './todo-list.component.css'

const Todo = props => {
    return(
        <tr>
        <td>{props.todo.desc}</td>
        <td style={{textAlign: 'center'}}>{props.todo.responsible}</td>
        <td style={{textAlign: 'center'}}>{props.todo.priority}</td>
        <td style={{textAlign: 'center'}}>{props.todo.completed ? "Yes" : "No"}</td>
        <td style={{textAlign: 'center'}}>
            <Link to={"/edit/"+props.todo._id}><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></Link>
            {" "}|{" "}
            <button className="delete-btn"                
                onClick={() => {
                    axios.delete("http://localhost:3001/todo/" + props.todo._id).then((response) => {
                        console.log(response.data);
                    });
            }}
            >
                <img className='delete-img' src="https://img.icons8.com/color/48/000000/delete-sign--v1.png"/>   
            </button>
        </td>        
        </tr>
    )
}

export default class todoList extends Component {

    constructor(props) {
        super(props);        

        this.state = {todo: []};
    }

    componentDidMount() {
        axios.get('http://localhost:3001/todo/')
            .then(response => {
                this.setState({ todo: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate(){
        axios.get('http://localhost:3001/todo/')
            .then(response => {
                this.setState({ todo: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todo.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>todo List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style={{textAlign: 'center'}}>Responsible</th>
                            <th style={{textAlign: 'center'}}>Priority</th>
                            <th style={{textAlign: 'center'}}>Completed</th>
                            <th style={{textAlign: 'center'}}>Action</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}