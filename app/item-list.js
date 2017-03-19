import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Item from './item'

class ItemSeparator extends React.PureComponent {
  render() {
    return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'gray' }} />
  }
}

export default class ItemList extends React.PureComponent {
  static defaultProps = {
    items: []
  }

  renderItem = ({ item }) => <Item {...item} />

  render() {
    const { items } = this.props
    return (
      <FlatList
        ItemSeparatorComponent={ItemSeparator}
        data={items}
        renderItem={this.renderItem}
      />
    )
  }
}
