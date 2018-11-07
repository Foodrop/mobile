import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'
import { colors } from '../theme'
import Home from './Home'
import Order from './Order'
import Settings from './Settings'

const routes = {
  Home: {
    screen: Home
  },
  Order: {
    screen: Order
  },
  Settings: {
    screen: Settings
  }
}

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.secondary,
    indicatorStyle: { backgroundColor: colors.secondary },
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3
    },
  }
}
const StackNav = createBottomTabNavigator(routes, routeConfig)

class Nav extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default StackNav