import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdatePost extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      post: {
        title: '',
        content: '',
        owner: {},
        comments: []
      }

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // make API call to get single post with comments
  componentDidMount () {
    axios({
      url: apiUrl + '/posts/' + this.props.match.params.id + '/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ post: res.data.post }))
  }

  handleChange = event => {
    // key is the event target's 'name' property
    const key = event.target.name
    // value is the new event target's 'value'
    const value = event.target.value
    // make a new, copy object based on the state
    const postCopy = Object.assign({}, this.state.post)
    // reassign the key's value to be the value the user has entered
    postCopy[key] = value
    // set state to new copy object
    this.setState({ post: postCopy })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('state is', this.state)

    // make API call
    axios({
      url: apiUrl + '/posts/' + this.props.match.params.id + '/',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      },
      data: {
        post: {
          title: this.state.post.title,
          content: this.state.post.content,
          owner: this.props.user.id
        }
      }
    })
    // handle success / failure
      .then(() => (
        this.props.msgAlert({
          heading: 'Update Success',
          variant: 'success',
          message: 'You updated your post!'
        })
      ))
      .then(() => this.props.history.push(`/posts/${this.props.match.params.id}/`))
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
            <Form.Group controlId="title">
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Title"
                maxLength="100"
                value={this.state.post.title}
                onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Control
                required
                type="text"
                as="textarea"
                name="content"
                placeholder="Content"
                maxLength="200"
                rows="7"
                value={this.state.post.content}
                onChange={this.handleChange} />
            </Form.Group>

            <Button type="submit" className="btn btn-primary pull-right" >Update Post</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(UpdatePost)