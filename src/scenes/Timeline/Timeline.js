import React, { Component } from 'react';
import 'react-navigation';

import { View,
    Text, 
    TouchableOpacity,
    FlatList } from 'react-native';

import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../../components/Tweet';
import API from '../../services/api';

export default class Timeline extends Component {

  state = {
    tweets: []
  };

  static navigationOptions = ({navigation}) => ({
    title: "Início",
    headerRight: (
    <TouchableOpacity onPress={ () => navigation.navigate('New') }>
      <Icon name="add-circle-outline"
        color="#4BB0EE" 
        size={24}
        style={{margin: 25}} />
    </TouchableOpacity>
    )
  });

  async componentDidMount() {
    const resp = await API.get('/list_tweets');

    this.setState({ tweets: resp.data });

  }

  render() {
    return (
        <View style={ styles.container }>
          <FlatList data={ this.state.tweets }
            keyExtractor={ tweet => tweet._id }
            renderItem={ item => <Tweet tweet={ item }/>}
          />
        </View>
    );
  };
}
