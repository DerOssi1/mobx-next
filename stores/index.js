import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import App from './app'
import User from './user'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let store = {
  user: new User(),
  app: new App(),
}

Object.keys(store).map(key => store[key].getParent = () => store)

export default store 

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {
    user: {
      lastUpdate: Date.now()
    }
  }
}

