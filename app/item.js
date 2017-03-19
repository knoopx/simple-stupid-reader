import React from 'react'
import { TouchableOpacity, Text, View, Image, Linking } from 'react-native'

export default class Item extends React.PureComponent {
  onPress = () => {
    Linking.openURL(this.props.url)
  }

  render() {
    const { title, author, avatar } = this.props

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderColor: '#DDD',
            marginBottom: 5,
            padding: 7
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ }}>{author}</Text>
          </View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: avatar }}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
