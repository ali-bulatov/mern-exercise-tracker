import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Fucntional React component - no state and lifecycle methods, only accepts props and return JSX
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

// Class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        // get all exercises form the DB
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            }) 
    }

    // delete exercise by id
    deleteExercise(id) {
        axios.delete('/exercises/'+id)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              });

        this.setState({
            // filter array of exercises so it returns everything except deleted item
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        // Return exercise component for each row
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
        })
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}