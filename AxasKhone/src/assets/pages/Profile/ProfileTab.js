import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Tab,
  Tabs
} from 'native-base';
import Favorites from './ProfileFavorites';
import Photo from './ProfilePosts';

export default class ProfileTab extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="هشتگ">
            <Favorites />
          </Tab>
          <Tab heading="کاربران">
            <Photo />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
