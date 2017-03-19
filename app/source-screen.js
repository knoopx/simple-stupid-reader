import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react/native'

import LoadingScreen from './loading-screen'
import ItemList from './item-list'

@observer
export default class SourceScreen extends React.PureComponent {
  @observable isLoading = false
  @observable items = []

  componentWillMount() {
    this.refresh()
  }

  refresh = async () => {
    this.isLoading = true
    this.items = await this.props.source.fetchItems()
    this.isLoading = false
  }

  render() {
    if (this.isLoading) {
      return <LoadingScreen />
    }
    return (
      <ItemList items={this.items} />
    )
  }
}
