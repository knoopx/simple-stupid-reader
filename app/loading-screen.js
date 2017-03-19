import React from 'react'
import { Text, View } from 'react-native'

export default class LoadingScreen extends React.PureComponent {
  render() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>
  }
}
