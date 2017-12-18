import * as React from 'react';
import SingleWeek from '../single-week/single-week'
import {Tabs, Tab} from 'material-ui/Tabs';

interface State{

}

interface Props {

}

class FullProgram extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
  }
  
  render() {
    return (
        <Tabs>
          <Tab label="Week 1">
            <SingleWeek />
          </Tab>
          <Tab label="Week 2">
            <SingleWeek />
          </Tab>
        </Tabs>
    );
  }
}

export default FullProgram;