import React from 'react'
import FeeManageComponent from './component/FeeManageComponent'

class FeeManageAllPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <FeeManageComponent role='ALL' />
    )
  }
}

export default FeeManageAllPage