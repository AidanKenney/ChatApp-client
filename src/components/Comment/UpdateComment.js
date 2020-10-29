import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateComment extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      content: '',
      post: ''
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // make API call to get single post with comments
  componentDidMount () {
    axios({
      url: apiUrl + '/comments/' + this.props.match.params.id + '/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ content: res.data.comment.content, post: res.data.comment.post }))
  }

  handleChange = event => this.setState({
    // set state of the event target's name as the value
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    console.log('state is', this.state)
    console.log('this.props is', this.props)
    // make API call
    axios({
      url: apiUrl + '/comments/' + this.props.match.params.id + '/',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      },
      data: {
        comment: {
          content: this.state.content,
          owner: this.props.user.id,
          post: this.state.post
        }
      }
    })
    // handle success / failure
      .then(() => (
        this.props.msgAlert({
          heading: 'Update Success',
          variant: 'success',
          message: 'You updated a comment!'
        })
      ))
      .then(() => this.props.history.push(`/posts/${this.state.post}/`))
      .catch(() => (
        this.props.msgAlert({
          heading: 'Update Failure',
          variant: 'danger',
          message: 'Error, update failed'
        })
      ))
  }

  render () {
    return (
      <div className="col-md-5">
        <div className="form-area">
          <Form onSubmit={this.handleSubmit}>
            <br styles="clear:both" />

            <Form.Group controlId="content">
              <Form.Control
                required
                type="text"
                as="textarea"
                name="content"
                maxLength="200"
                rows="7"
                value={this.state.content}
                onChange={this.handleChange} />
            </Form.Group>

            <Button type="submit" className="btn btn-primary pull-right" >Update Post</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(UpdateComment)
