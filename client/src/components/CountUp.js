import React, {Component} from 'react'

// 文字排版
import {Typography} from 'antd';
const {Text} = Typography;

// 从零开始tick
export default class CountUp extends Component {

    constructor(props) {
        super();
        this.state = {
            min: "",
            sec: ""
        }
    }

    tick(){
        let now = new Date()
        let upd = Date.parse(this.props.updatedAt)
        this.setState({min: parseInt((now - upd) / 60000)})
        let sec = ((now - upd) - this.state.min * 60000) / 1000
        this.setState({sec: parseInt(sec)})
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(), 1000     // update this DOM every second
        ); 
    }

    componentWillUnmount(){
        clearInterval(this.timerID); // tear down timer so that interval starts over
    }

    render(){
        return (
            <div>
                <Text strong= {true}> {this.state.min + " mins " + this.state.sec + " secs"} </Text>
            </div>
        )
    }
}

// rfc stateless component --> 网页有什么展示什么
// rcc stateful component --> keeping track of changing data