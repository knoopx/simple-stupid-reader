import React from 'react'
import { inject, observer } from 'mobx-react/native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import FeedScreen from './feed-screen'

@inject('store')
@observer
export default class MainScreen extends React.Component {
  renderScene = ({ route }) => <FeedScreen {...route} />
  renderHeader = props => <TabBar {...props} /> // tabStyle={{ backgroundColor: props.navigationState.provider.color }}
  onRequestChangeTab = (index) => {
    this.props.store.index = index
  }

  render() {
    const { store } = this.props
    return (
      <TabViewAnimated
        style={{ flex: 1 }}
        navigationState={store.navigationState}
        renderScene={this.renderScene}
        onRequestChangeTab={this.onRequestChangeTab}
        renderHeader={this.renderHeader}
      />
    )
  }
}
