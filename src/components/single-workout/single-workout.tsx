import * as React from 'react';
import './single-workout.style.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ExerciseList from '../exercise-list/exercise-list'


interface State{

}

interface Props {

}

class SingleWorkout extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
  }

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Day 1</TableHeaderColumn>
            <TableHeaderColumn>Day 2</TableHeaderColumn>
            <TableHeaderColumn>Day 3</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            <TableRowColumn>
              <ExerciseList />
            </TableRowColumn>
            <TableRowColumn>
              <ExerciseList />
            </TableRowColumn>
            <TableRowColumn>
              <ExerciseList />
            </TableRowColumn>
        </TableBody>
      </Table>
    );
  }
}

export default SingleWorkout;