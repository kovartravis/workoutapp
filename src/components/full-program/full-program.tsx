import * as React from 'react';
import SingleWeek from '../single-week/single-week'
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import './full-program.style.css'

interface FullProgram{
    key: number
}

interface State{
    weekList: Array<JSX.Element>
    children: Object
}

interface ChildState{
  children: Object
}

interface Props {

}

class FullProgram extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);

    this.getKey = this.getKey.bind(this)
    this.addAWeek = this.addAWeek.bind(this)
    this.onChildStateChange = this.onChildStateChange.bind(this)
    this.key = 0

    this.state = {
      weekList: [<Tab label={"Week 1"}>
                  <IconButton >
                    <ContentClear />
                  </IconButton>
                  <SingleWeek id="0" onStateChange={this.onChildStateChange}/>
                  </Tab>],
      children: {}
    }
  }

  onChildStateChange(childstate: ChildState, id: string){
    this.state.children[id] = childstate
    this.setState({children: this.state.children}, ()=>
    console.log(this.state.children))
  }

  addAWeek(){
    let mykey = this.getKey()
    this.setState({weekList: this.state.weekList.concat(<Tab key={mykey} label={"Week " + (this.state.weekList.length + 1)}><IconButton ><ContentClear /></IconButton>
                                                        <SingleWeek id={mykey} onStateChange={this.onChildStateChange}/></Tab>)})
  }

  getKey(){
    this.key = this.key + 1
    return this.key.toString()
  }

  
  render() {
    return (
        <Tabs>
          {this.state.weekList}
          <div className="buttonHolder">
            <FlatButton label="Add a Week" onClick={this.addAWeek}/>
          </div>
        </Tabs>
    );
  }
}

export default FullProgram;