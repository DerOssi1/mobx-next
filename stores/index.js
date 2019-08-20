import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import App from './app'
import User from './user'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let store = null

function initStore(){
  return {
    user: new User(),
    app: new App(),
  }
}

export function initializeStore(initialData = {}) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    store = initStore()
  }
  if (store === null) {
    store = initStore()
    Object.keys(store).forEach(key => store[key].hydrate(initialData[key]))
  }
  Object.keys(store).forEach(key => store[key].getParent = () => store)
  return store
}
