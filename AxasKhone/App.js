import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/components/LoginScreen'
import SignUpScreen from './src/components/SignUpScreen'
import Bazi from './src/components/bazi'
import {Text} from 'react-native'

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      s: true
    }
  }
  componentDidMount(){
    setInterval(() =>{
      this.setState({s:!this.state.s});
    },2000)
  }
  render() {
  return (<Bazi>{this.state.s ? <Text>How Are You?</Text> : <Text>Hello</Text>}</Bazi>);
  }
}