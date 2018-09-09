import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import profileActions from '../../../actions/userProfile';
import styles from './Profile.style';

export default class FavorateItem extends Component {
  render() {
    const favoriteItem = this.props.favoriteItem;
    return (
      <View style={styles.pictureContainerFavoriteBox}>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={{ uri: favoriteItem.image }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
