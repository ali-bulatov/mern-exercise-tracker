import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        // call super when defining a constructor in a subclass
        super(props);

        // bind this to each method to make sure this is referring to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state is a way to create variables in React
        this.state = {
            username: ''
        }
    }

    // Set value of username to something enterent in the textbox
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        // prevent default HTML form submit behaviour
        e.preventDefault();

        const user = {
            username: this.state.username
        } 

        console.log(user);
        
        // Send HTTP post request to the backend endpoint that expects json object in body
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        // take the person back to the homepage - list of exercises
        this.setState({
            username: ''
        })
    }

    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}