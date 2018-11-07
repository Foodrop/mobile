import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';

import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'

import { colors } from '../theme'
import { createUser, confirmUserSignUp } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

const initialState = {
  username: '',
  password: '',
  authCode: ''
}

class SignUp extends Component<{}> {
  state = initialState

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp() {
    const { username, password } = this.state
    this.props.dispatchCreateUser(username, password)
  }

  confirm() {
    const { authCode, username } = this.state
    this.props.dispatchConfirmUser(username, authCode)
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  render() {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage
    }} = this.props
    // let user = this.props.auth.user
    // if ( Object.keys(user).length === 0 && user.constructor === Object) {
    //   console.log('empty');
    // }
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>
          Sign Up
        </Text>
        <Text style={styles.greeting2}>
          Let's get you started.
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Phone Number"
            type='username'
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />

        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          isLoading={isAuthenticating}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
        {
          showSignUpConfirmationModal && (
            <Modal>
              <View style={styles.modal}>
                <Input
                  placeholder="Authorization Code"
                  type='authCode'
                  keyboardType='numeric'
                  onChangeText={this.onChangeText}
                  value={this.state.authCode}
                  keyboardType='numeric'
                />
                <Button
                  title='Confirm'
                  onPress={this.confirm.bind(this)}
                  isLoading={isAuthenticating}
                />
              </View>
            </Modal>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchConfirmUser: (username, authCode) => confirmUserSignUp(username, authCode),
  dispatchCreateUser: (username, password) => createUser(username, password)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24
  },
  greeting2: {
    color: '#666',
    fontSize: 18,
    marginTop: 5
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});