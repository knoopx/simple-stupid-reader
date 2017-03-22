import { observable, computed } from 'mobx'

import providers from './providers'

export default class Store {
  @observable index = 0

  @computed get navigationState() {
    return {
      index: this.index,
      provider: providers[this.index],
      routes: providers.map(provider => ({
        key: provider.key,
        title: provider.title,
        provider
      }))
    }
  }
}
