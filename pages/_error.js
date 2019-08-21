import React from 'react'
import { i18n, Link, withTranslation } from '@/i18n'

@withTranslation('common')
class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { 
      statusCode,
      namespacesRequired: ['common']
    }
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
}

export default Error