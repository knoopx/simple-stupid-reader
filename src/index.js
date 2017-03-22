import React from 'react'
import { observer, Provider } from 'mobx-react/native'

import MainScreen from './screens/main-screen'

import Store from './store'

const store = new Store()

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}
