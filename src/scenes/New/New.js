import React, { Component } from 'react';

import { View,
        Text,
        TextInput,
        TouchableOpacity,
        AsyncStorage
    } from 'react-native';

import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import socket from 'socket.io-client';

export default class New extends Component {
    state = { 
        newTweet: '',
        tweets: []
    }
    likeUpdateEvent = () => {
        const io = socket("http://10.0.3.2:4005");
    
        io.on("Tweet",  resp => {
          this.setState({ tweets: [resp, ...this.state.tweets]})
        });
        io.on("Like", resp => {
          this.setState({ tweets: this.state.tweets.map(tweet => (
            tweet._id === resp._id ? resp : tweet 
          ))});
        });
      }
      async componentDidMount() {
        this.likeUpdateEvent();
      }    

    static navigationOptions = {
        header: null
    }
    handleChange = newTweet => {
        this.setState({ newTweet });
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    handleNewTweet = async () => {
        const content = this.state.newTweet;
        if(!content.length) return;
        const author = await AsyncStorage.getItem("@Gotwitter:username");

        api.post('tweet', { content, author });

        this.goBack();
    };

  render() {
    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ this.goBack }>
                    <Icon name="close" color="#4BB0EE" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }
                    onPress={ this.handleNewTweet }>
                    <Text style={styles.buttonText }>Tweetar</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={ styles.input }
                multiline
                placeholder="O que está acontecendo?"
                placeholderTextColor="#999"
                value={ this.state.newTweet }
                onChangeText={ this.handleChange }
                returnKeyType="send"
                onSubmitEditing={ this.handleNewTweet }
            >
                
            </TextInput>
        </View>
    );
  }
}
