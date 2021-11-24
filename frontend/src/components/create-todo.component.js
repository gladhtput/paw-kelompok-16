import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            desc: '',
            responsible: '',
            priority: '',
            completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            desc: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.desc}`);
        console.log(`Todo Responsible: ${this.state.responsible}`);
        console.log(`Todo Priority: ${this.state.priority}`);

        const newTodo = {
            desc: this.state.desc,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed
        };

        axios.post('http://localhost:3001/todo', newTodo).then(res => console.log(res.data));
        
        this.setState({
            desc: '',
            responsible: '',
            priority: '',
            completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{marginTop: 40}}> 
                        <label>Description </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.desc}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group" style={{marginTop: 20}}>
                        <label>Responsible </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group" style={{marginTop: 30}}>

                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create ToDo" className="btn btn-primary" style={{float: "right"}}/>
                    </div>
                </form>
            </div>
        )
    }
}