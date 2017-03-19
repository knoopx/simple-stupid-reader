import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react/native'

import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import SourceScreen from './source-screen'

import Lobsters from './sources/lobsters'
import GithubTrends from './sources/github-trends'


@observer
export default class App extends React.PureComponent {
  @observable index = 0
  @observable sources = [
    new Lobsters(),
    new GithubTrends()
  ]

  renderScene = ({ route }) => <SourceScreen {...route} />

  renderHeader = props => <TabBar {...props} />

  @computed get navigationState() {
    return {
      index: this.index,
      routes: this.sources.map(source => ({
        key: source.key,
        title: source.title,
        source
      }))
    }
  }

  onRequestChangeTab = (index) => {
    this.index = index
  }

  render() {
    return (
      <TabViewAnimated
        style={{ flex: 1 }}
        navigationState={this.navigationState}
        renderScene={this.renderScene}
        onRequestChangeTab={this.onRequestChangeTab}
        renderHeader={this.renderHeader}
      />
    )
  }
}
