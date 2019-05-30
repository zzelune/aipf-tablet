
import styles from './index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class Settings extends Component {


  constructor() {
    super();
    this.state = {
        iFrameHeight: '0px'
    }
  }
  render() {

    let self = this;

    return (
      <iframe 
        sandbox="allow-same-origin allow-scripts" 
        style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
        onLoad={() => {
          const obj = ReactDOM.findDOMNode(this);
          this.setState({
              "iFrameHeight":  document.body.scrollHeight+ 'px'
          });

        }} 
        ref="iframe" 
        src="http://localhost:9999/lab" 
        width="100%" 
        height={this.state.iFrameHeight} 
        scrolling="no" 
        frameBorder="0"
     />
    
    );

  }

}

export default Settings;