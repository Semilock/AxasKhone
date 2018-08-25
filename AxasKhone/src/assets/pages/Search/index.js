import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class Search extends Component {

  static navigationOptions = {
    tabBarLabel: ({tintColor}) => <Text style={{color: tintColor, textAlign: 'center', marginBottom: 12}}>search</Text>
    // tabBarIcon: return{ focused: boolean, tintColor: string }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(239, 239, 239)', justifyContent: 'center'}}>
        <Text style={{ textAlign: 'center', Color: 'rgb(57, 57, 57)', fontSize: 24}}>
        under develop :))
        </Text>
      </View>
    );
  }
}