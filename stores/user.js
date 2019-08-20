import { action, decorate, observable, runInAction } from 'mobx';

let timer

export default class User {
  @observable name = 'test'
  @observable age = 1
  @observable lastUpdate = Date.now()
  @observable light = false

  hydrate(initStore) {
    initStore && Object.keys(initStore).forEach(key => this[key] = initStore[key])
  }

  start = () => {
    timer = setInterval(() => {
      // pass off to another action instead
      this.update()
    }, 1000)
  }

  @action
  update = () => {
    this.lastUpdate = Date.now()
    this.light = true
  }

  stop = () => {
    clearInterval(timer)
  }

  @action
  setName = (name) => {
    this.name += name + 1
  }

  @action
  addAge = (number) => {
    this.age += 1
  }

}
