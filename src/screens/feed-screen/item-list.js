import React from 'react'
import { FlatList } from 'react-native'
import Item from './item'
import ItemSeparator from './item-separator'

export default class ItemList extends React.Component {
  static defaultProps = {
    items: []
  }

  renderItem = ({ item }) => <Item {...item} />

  render() {
    const { items, ...props } = this.props
    return (
      <FlatList
        {...props}
        ItemSeparatorComponent={ItemSeparator}
        data={items}
        renderItem={this.renderItem}
      />
    )
  }
}
