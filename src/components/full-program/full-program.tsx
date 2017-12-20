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
    this.removeAWeek = this.removeAWeek.bind(this)
    this.onChildStateChange = this.onChildStateChange.bind(this)
    this.key = 0

    let mykey = this.getKey()
    this.state = {
      weekList: [<Tab key={mykey} label={"Week 1"}>
                  <IconButton onClick={(event) => this.removeAWeek(mykey)}>
                    <ContentClear />
                  </IconButton>
                  <SingleWeek id={mykey} onStateChange={this.onChildStateChange}/>
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
    this.setState({weekList: this.state.weekList.concat(<Tab key={mykey} label={"Week " + (this.state.weekList.length + 1)}><IconButton onClick={(event) => this.removeAWeek(mykey)}>
                                                                  <ContentClear /></IconButton><SingleWeek id={mykey} onStateChange={this.onChildStateChange}/></Tab>)})
  }

  removeAWeek(key: string){
    const weekListRef = this.state.weekList;
    let k = parseInt(key)
    
    const j = weekListRef.find( a => { if(a.key === k.toString()) return true; else return false; })
    let i = 0
    if(j !== undefined){
      i = weekListRef.indexOf(j);
    }

    let newWeekList: Array<JSX.Element> = []
    this.setState({weekList: []}, ()=>
    {for(let x = 0; x < weekListRef.length - 1; x++){
      if(x < i){
        let mykey = weekListRef[x].props.children[1].props.id
        console.log(mykey)
        newWeekList.push(
          <Tab key={mykey} label={"Week " + (newWeekList.length + 1)}><IconButton onClick={(event) => this.removeAWeek(mykey)}>
                  <ContentClear /></IconButton><SingleWeek id={mykey} onStateChange={this.onChildStateChange} injectedState={this.state.children[mykey]}/></Tab>
        )
      }else if(x >= i){
        let mykey = weekListRef[x + 1].props.children[1].props.id
        console.log(mykey)
        newWeekList.push(
          <Tab key={mykey} label={"Week " + (newWeekList.length + 1)}><IconButton onClick={(event) => this.removeAWeek(mykey)}>
                  <ContentClear /></IconButton><SingleWeek id={mykey} onStateChange={this.onChildStateChange} injectedState={this.state.children[mykey]}/></Tab>
        )
      }
    }})

    this.setState({weekList: newWeekList}, ()=>this.forceUpdate())
    
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