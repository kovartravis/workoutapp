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
    weekContent: Array<JSX.Element>
}

interface Props {

}

class FullProgram extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.getKey = this.getKey.bind(this)
    this.addToWeekList = this.addToWeekList.bind(this)
    this.getMyContent = this.getMyContent.bind(this)
    this.key = -1

    let mykey = this.getKey()
    this.state = {
      weekList: [],
      weekContent: [<div key={mykey}><IconButton onClick={(event) => this.removeFromWeekList(event, mykey)}>
        <ContentClear /></IconButton><SingleWeek/></div>]
    }
    this.state = { weekList: [<Tab label={"Week 1"} key={mykey}>
                    {this.getMyContent(mykey)}
                 </Tab>],
                   weekContent: this.state.weekContent
    }
  }

  getMyContent(n: string){
    let i = parseInt(n)
    return this.state.weekContent[i]
  }

  addToWeekList(){
      let mykey = this.getKey()
      this.setState({weekContent: this.state.weekContent.concat(<div key={mykey}><IconButton onClick={(event) => this.removeFromWeekList(event, mykey)}>
                                                              <ContentClear /></IconButton><SingleWeek/></div>)}, ()=>
      this.setState({weekList: this.state.weekList.concat(<Tab label={"Week " + (this.state.weekList.length + 1)} key={mykey}>
                                                           {this.getMyContent(mykey)}
                                                          </Tab>)}))
  }

  removeFromWeekList(event: React.FormEvent<any>, key: string){
    let k = parseInt(key)
    
    const j = this.state.weekList.find( a => {if(a.key === k.toString()){return true;} else return false; })
    let index = 0
    if(j !== undefined){
      index = this.state.weekList.indexOf(j);
    }

    this.state.weekList.splice(index, 1)
    this.setState({weekList: this.state.weekList.map( (a, i) =>{if(i < index) return a; else return React.cloneElement(a, {label: "Week " + (i + 1), 
                                                                         //children: this.getMyContent(a.key?a.key.toString():'broke')
                                                                         })})});
  }

  getKey(){
    this.key = this.key + 1;
    return this.key.toString();
  }
  
  render() {
    return (
        <Tabs>
          {this.state.weekList}
          <div className="buttonHolder">
            <FlatButton label="Add a Week" onClick={this.addToWeekList} />
          </div>
        </Tabs>
    );
  }
}

export default FullProgram;