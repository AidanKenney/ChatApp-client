import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #F4F4F2;
  border-radius: 3px;
  border: 1px solid #BBBFCA;
  margin: 1em 1em;
  padding: 0.25em 1em;

  & label {
      padding-left: 1em;
      padding-top: 1em;
    }

  &:hover {
    border: 1px solid #82858D;
  }
`
const StylishButton = styled.button`
  background: #3F88C5;
  border-radius: 3px;
  border: 2px solid #BBBFCA;
  font-size: 14px;
  color: #F9F9F9;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:hover {
    background: #F9F9F9;
    border: 2px solid #E94F37;
    color: #3F88C5;
  }
`

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
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <label>Create a post, start talking</label>
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
              rows="2"
              value={this.state.content}
              onChange={this.handleChange} />
          </Form.Group>

          <StylishButton type="submit" className="btn btn-primary pull-right" >Add Post</StylishButton>
        </Form>
      </Wrapper>
    )
  }
}

export default withRouter(CreatePost)
