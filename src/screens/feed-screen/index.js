import React from 'react'
import { AsyncStorage, ToastAndroid } from 'react-native'
import { action, observable, autorun, toJS } from 'mobx'
import { observer } from 'mobx-react/native'
import { uniqBy } from 'lodash'
import ItemList from './item-list'

@observer
export default class SourceScreen extends React.Component {
  page = 1
  endReached = false
  @observable isLoading = false
  @observable items = []

  componentWillMount() {
    this.initialize()
  }

  initialize = async () => {
    await this.load()

    autorun(() => {
      AsyncStorage.setItem(this.props.provider.key, JSON.stringify(toJS(this.items)))
    })

    this.refresh(this.page)
  }

  load = async () => {
    const items = await AsyncStorage.getItem(this.props.provider.key)
    if (items) {
      try {
        this.setItems(JSON.parse(items))
      } catch (err) {
        AsyncStorage.removeItem(this.props.provider.key)
      }
    }
  }

  refresh = async () => {
    this.items.replace(uniqBy([...await this.fetch(0), ...this.items], 'key'))
  }

  fetch = async (page) => {
    console.log('fetch', page)
    let items = []
    try {
      this.isLoading = true
      items = await this.props.provider.fetch(page)
    } catch (err) {
      console.log(err)
      ToastAndroid.show(err.message, ToastAndroid.SHORT)
    } finally {
      this.isLoading = false
    }
    return items
  }

  fetchNext = async () => {
    if (this.props.provider.isPaginable && !this.isLoading && !this.endReached) {
      const newItems = await this.fetch(++this.page)
      if (newItems.length > 0) {
        this.items.replace(uniqBy([...this.items, ...newItems], 'key'))
      } else {
        ToastAndroid.show('No more items', ToastAndroid.SHORT)
        this.endReached = true
      }
    }
  }

  render() {
    return (
      <ItemList refreshing={this.isLoading} onRefresh={this.refresh} onEndReached={this.fetchNext} items={this.items} />
    )
  }
}
