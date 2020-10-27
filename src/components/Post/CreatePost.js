import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor () {
    super()

    this.state = {
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render () {
    return (
      <div className="row">
      </div>
    )
  }
}

export default withRouter(CreatePost)
