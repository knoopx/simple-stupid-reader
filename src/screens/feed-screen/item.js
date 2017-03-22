import React from 'react'
import { TouchableOpacity, Text, View, Image, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import URL from 'url-parse'

export default class Item extends React.Component {
  onPress = () => {
    Linking.openURL(this.props.url)
  }

  render() {
    const { title, author, url, avatar } = this.props
    const { hostname } = new URL(url)
    const favicon = `https://icons.better-idea.org/icon?url=${hostname}&size=80..120..200`

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }} >
          <Image
            style={{ width: 48, height: 48, marginRight: 10 }}
            source={{ uri: avatar || favicon }}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 8 }}>
                <Icon name="person" style={{ marginRight: 2 }} />
                <Text numberOfLines={1} style={{ fontSize: 11, color: '#aaa' }}>{author}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon name="link" style={{ marginRight: 2 }} />
                <Text numberOfLines={1} style={{ fontSize: 11, color: '#aaa' }}>{hostname}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
