import App, { Container } from 'next/app'
import React from 'react'
import store, { fetchInitialStoreState } from '@/stores'
import { Provider } from 'mobx-react'
import { appWithTranslation } from '@/i18n'

@appWithTranslation
class MyMobxApp extends App {
  state = {
    store: store,
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    // store.user.name = 'xxx'
    // appContext.ctx.store = store
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()
    return {
      ...appProps,
      initialStoreState,
    }
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    Object.keys(state.store).forEach(key => state.store[key].hydrate(props.initialStoreState[key]))
    return state
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.state.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
