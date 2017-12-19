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
    id: string
    onStateChange: any
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
    this.passInfoUp = this.passInfoUp.bind(this)
  }

  passInfoUp(){
      return this
  }

  handleSelectChange(event: React.FormEvent<any>, index: number) {
      this.setState({lift: index}, ()=>
      this.props.onStateChange(this.state, this.props.id));
  }

  handleInputChange(event: React.FormEvent<any>){
      switch(event.currentTarget.id){
          case 'sets': this.setState({sets: event.currentTarget.value}, ()=> 
                       this.props.onStateChange(this.state, this.props.id));
                       break;
          case 'reps': this.setState({reps: event.currentTarget.value}, () =>
                       this.props.onStateChange(this.state, this.props.id));
                       break;
          case 'weight': this.setState({weight: event.currentTarget.value}, ()=>
                         this.props.onStateChange(this.state, this.props.id));
                         break;
          case 'notes': this.setState({notes: event.currentTarget.value}, ()=>
                        this.props.onStateChange(this.state, this.props.id));
                        break;
          default: console.log('dont be here');
      }
  }

  createTitleString(){
      switch(this.state.lift){
          case 0: return 'Squat'
          case 1: return 'Bench Press'
          case 2: return 'Deadlift'
          default: return 'Oh no'
      }
  }

  createSubtitleString(){
      return this.state.sets + 'x' + this.state.reps + '@' + this.state.weight + 'lbs'
  }

  render() {
    return (
      <Card ref="card">
        <CardHeader title={this.createTitleString()} subtitle={this.createSubtitleString()} actAsExpander={true} showExpandableButton={true}/>
        <CardText expandable={true}>
          <SelectField floatingLabelText="Lift" value={this.state.lift} onChange={this.handleSelectChange}>
            <MenuItem value={0} primaryText="Squat"/>
            <MenuItem value={1} primaryText="Bench Press"/>
            <MenuItem value={2} primaryText="Deadlift"/>
          </SelectField><br/>
            <TextField id="sets" style={{width: 100}} value={this.state.sets} floatingLabelText="Sets" type="number" onChange={this.handleInputChange} />
            <TextField id="reps" style={{width: 100}} value={this.state.reps} floatingLabelText="Reps" type="number" onChange={this.handleInputChange} />
            <TextField id="weight" style={{width: 100}} value={this.state.weight} floatingLabelText="Weight" type="number" onChange={this.handleInputChange} /><br/>
            <TextField id="notes" className="notesInput" value={this.state.notes} floatingLabelText="Notes" type="text"  onChange={this.handleInputChange} />
        </CardText>
      </Card>
    );
  }
}

export default ExerciseSelector;