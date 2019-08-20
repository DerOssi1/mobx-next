import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '@/stores'
import nextCookie from 'next-cookies'
import { Provider } from 'mobx-react'
import { appWithTranslation } from '@/i18n'

@appWithTranslation
class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    const { token } = nextCookie(appContext.ctx)
    const store = initializeStore()
    // store.user.info.isLogin = !!token

    appContext.ctx.store = store
    const appProps = await App.getInitialProps(appContext)
    return {
      ...appProps,
      initialState: store,
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.store = isServer
      ? props.initialState
      : initializeStore(props.initialState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
