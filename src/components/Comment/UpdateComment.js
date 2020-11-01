import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import { BoardButton, BasicWrapper } from '../StyledComponents/StyledComponents'

class UpdateComment extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      content: '',
      post: '',
      owner: ''
    }
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
      .then(res => this.setState({ content: res.data.comment.content, post: res.data.comment.post, owner: res.data.comment.owner.email }))
  }

  handleChange = event => this.setState({
    // set state of the event target's name as the value
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
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
      <BasicWrapper>
        <div className="form-area">
          <Form onSubmit={this.handleSubmit}>
            <label>Comment by {this.state.owner}</label>
            <Form.Group controlId="content">
              <Form.Control
                required
                type="text"
                as="textarea"
                name="content"
                maxLength="200"
                rows="1"
                value={this.state.content}
                onChange={this.handleChange} />
            </Form.Group>

            <BoardButton type="submit" className="btn btn-primary pull-right" >Update Comment</BoardButton>
          </Form>
        </div>
      </BasicWrapper>
    )
  }
}

export default withRouter(UpdateComment)
