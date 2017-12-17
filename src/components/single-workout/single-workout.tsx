import * as React from 'react';
import './single-workout.style.css';

interface State{
  exercise: string;
}

interface Props {

}

class SingleWorkout extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.state = {
      exercise: "squat"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event : React.FormEvent<any>){
    console.log(event.currentTarget.value)
  }
  
  render() {
    return (
      <div className="workoutHolder">
        <select className="exerciseSelector" defaultValue={this.state.exercise} onChange={this.handleChange}>
          <option value="squat">Squat</option>
          <option value="benchpress">Bench Press</option>
        </select>
      </div>
    );
  }
}

export default SingleWorkout;