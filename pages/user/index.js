import React from 'react'
import { withAuthSync } from '@/utils/auth'

export default withAuthSync(() => {
  return (
    <div>user</div>
  )
}
)