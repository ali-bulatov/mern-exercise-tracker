import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        // call super when defining a constructor in a subclass
        super(props);

        // bind this to each method to make sure this is referring to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state is a way to create variables in React
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // React lifecycle method - automatically called right before anything displays on the page
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        // map the array - return username for each element in the array
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
              })
    }

    // Set value of username to something enterent in the textbox
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        // prevent default HTML form submit behaviour
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // Send HTTP post request to the backend endpoint that expects json object in body
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              });

        // take the person back to the homepage - list of exercises
        window.location = '/';
    }

    render() {
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                // for each user in the array return option in the select box 
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}