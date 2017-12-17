import * as React from 'react';
import './exercise-selector.style.css';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card'

interface State {
    lift: number;
    sets: number;
    reps: number;
    weight: number;
    notes: string;
}

interface Props {

}

class ExerciseSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
        lift: 0,
        sets: 0,
        reps: 0,
        weight: 0,
        notes: ''
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSelectChange(event: React.FormEvent<any>, index: number) {
      this.setState({lift: index})
  }

  handleInputChange(event: React.FormEvent<any>){
      switch(event.currentTarget.id){
          case 'sets': this.setState({sets: event.currentTarget.value});
                       break;
          case 'reps': this.setState({reps: event.currentTarget.value});
                       break;
          case 'weight': this.setState({weight: event.currentTarget.value});
                         break;
          case 'notes': this.setState({notes: event.currentTarget.value})
                        break;
          default: console.log('dont be here');
      }
  }

  createTitleString(){
      switch(this.state.lift){
          case 0: return 'Squat'
          case 1: return 'Bench Press'
          default: return 'Oh no'
      }
  }

  createSubtitleString(){
      return this.state.sets + 'x' + this.state.reps + '@' + this.state.weight
  }

  render() {
    return (
      <Card className="exerciseHolder">
        <CardHeader title={this.createTitleString()} subtitle={this.createSubtitleString()} actAsExpander={true} showExpandableButton={true}/>
        <CardText expandable={true}>
          <SelectField className="liftSelector" floatingLabelText="Lift" value={this.state.lift} onChange={this.handleSelectChange}>
            <MenuItem value={0} primaryText="Squat"/>
            <MenuItem value={1} primaryText="Bench Press"/>
          </SelectField>
            <TextField id="sets" className="setsInput" value={this.state.sets} floatingLabelText="Sets" type="number" onChange={this.handleInputChange} />
            <TextField id="reps" className="repsInput" value={this.state.reps} floatingLabelText="Reps" type="number" onChange={this.handleInputChange} />
            <TextField id="weight" className="weightInput" value={this.state.weight} floatingLabelText="Weight" type="number" onChange={this.handleInputChange} />
            <TextField id="notes" className="notesInput" value={this.state.notes} floatingLabelText="Notes" type="text"  onChange={this.handleInputChange} />
        </CardText>
      </Card>
    );
  }
}

export default ExerciseSelector;