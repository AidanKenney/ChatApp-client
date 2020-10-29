import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      title: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      url: apiUrl + '/posts/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      },
      data: {
        post: {
          title: this.state.title,
          content: this.state.content,
          // something is wrong here.... the ID is what I
          // think it should be, but that is not being accepted by the backend
          owner: this.props.user.id
        }
      }
    })
    // handle success / failure
      .then((res) => console.log(res))
      .then(() => (
        this.props.msgAlert({
          heading: 'Create Success',
          variant: 'success',
          message: 'You created a post!'
        })
      ))
      .then(() => this.setState({
        title: '',
        content: ''
      })
      )
      .catch(() => (
        this.props.msgAlert({
          heading: 'Create Failure',
          variant: 'danger',
          message: 'Error, create failed'
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
                value={this.state.title}
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
                value={this.state.content}
                onChange={this.handleChange} />
            </Form.Group>

            <Button type="submit" className="btn btn-primary pull-right" >Add Post</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePost)