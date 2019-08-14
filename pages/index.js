import React from 'react'
import { i18n, Link, withTranslation } from '@/i18n'
import Page from '../components/Page'
import * as user from '@/apis/user'

@withTranslation('common')
export default class Counter extends React.Component {
  static async getInitialProps(appContext) {
    return {
      namespacesRequired: ['common'],
    }
  }

  onSwitch = () => {
    // user.login()
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  render() {
    const { t } = this.props
    return (
      <>
        <Page title="Index Page" linkTo="/other" />
        <button onClick={this.onSwitch}>Switch Lang</button>
        <p>{t('h1')}</p>
      </>
    )
  }
}
