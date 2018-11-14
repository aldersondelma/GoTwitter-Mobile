import React, { Component } from 'react';

import {
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import styles from './Styles';
import Logo from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    state = {
        username: ''
    };

    static navigationOptions = {
        header: null
    }

    async componentDidMount () {
        const username = AsyncStorage.getItem('@Gotwitter:username');

        if(username) this.NavigateToTimeline();
    }
    handleInputChange = username => {
        this.setState({ username });
    };

    NavigateToTimeline = () => {
        const resetActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Timeline'})
            ]
        });
        this.props.navigation.dispatch(resetActions);
    }

    handleLogin = async () => {
        const { username } = this.state;

        if(!username.length) return;

        await AsyncStorage.setItem("@Gotwitter:username", username);

        this.NavigateToTimeline();
    };

  render() {
    return (
        <KeyboardAvoidingView style={ styles.container } >
            <View style={ styles.content }>
                <View>
                    <Logo name="twitter" 
                        size={64}
                        color="#4BB0EE"/>
                </View>
                <TextInput
                    style={ styles.input} 
                    placeholder="Nome de usuário"
                    value={this.state.username }
                    onChangeText={ this.handleInputChange }
                    returnKeyType="send"
                    onSubmitEditing={ this.handleLogin }/>
                <TouchableOpacity style={ styles.button }
                    onPress={ this.handleLogin }>
                    <Text style={ styles.buttonText }>Entrar</Text>    
                </TouchableOpacity>    
            </View>
        </KeyboardAvoidingView>
    );
  };
}
