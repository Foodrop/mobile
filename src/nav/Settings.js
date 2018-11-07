import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { logOut } from '../actions'
import { colors } from '../theme'
const { width, height } = Dimensions.get('window')

class Settings extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    username: ''
  }
  AnimatedScale = new Animated.Value(1)
  componentDidMount() {
    this.animate()
  }
  logout() {
    Auth.signOut()
      .then(() => {
        this.props.dispatchLogout()
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
  navigate() {
    this.props.navigation.navigate('Route1')
  }
  animate() {
    Animated.timing(
      this.AnimatedScale,
      {
        toValue: .8,
        duration: 1250,
        useNativeDriver: true
      }
    ).start(() => {
      Animated.timing(
        this.AnimatedScale,
        {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true
        }
      ).start(() => this.animate())
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Welcome to Settings</Text>
          <Animated.Image
            source={require('../assets/boomboxcropped.png')}
            style={{ tintColor: colors.primary, width: width / 4, height: width / 4, transform: [{scale: this.AnimatedScale}]}}
            resizeMode='contain'
          />
          <Text onPress={this.logout.bind(this)} style={styles.logout}>Logout</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  homeContainer: {
    alignItems: 'center'
  },
  welcome: {
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  logout: {
    color: colors.primary,
    width: 100,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    textAlign: 'center'
  },
  registration: {
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)