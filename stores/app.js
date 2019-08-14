import { action, decorate, observable, runInAction } from 'mobx';

export default class App {
  @observable name = 'test'

  hydrate(initStore) {
    initStore && Object.keys(initStore).forEach(key => this[key] = initStore[key])
  }

}