import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { StylishButton, FormWrapper, BasicWrapper } from '../StyledComponents/StyledComponents'

class CreateComment extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
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

    // make API call
    axios({
      url: apiUrl + '/comments/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      },
      data: {
        comment: {
          content: this.state.content,
          owner: this.props.user,
          post: this.props.match.params.id
        }
      }
    })
    // handle success / failure
      .then(() => (
        this.props.msgAlert({
          heading: 'Create Success',
          variant: 'success',
          message: 'You created a comment!'
        })
      ))
      .then(() => this.setState({
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
    const loggedInUser = (
      <div className="form-area">
        <FormWrapper onSubmit={this.handleSubmit}>
          <br styles="clear:both" />
          <Form.Group controlId="content" className="form-group">
            <Form.Control
              required
              type="text"
              as="textarea"
              name="content"
              placeholder="Add a comment"
              maxLength="200"
              rows="1"
              value={this.state.content}
              onChange={this.handleChange} />
          </Form.Group>

          <StylishButton type="submit" className="btn btn-primary" ><FontAwesomeIcon icon={faPlus} /></StylishButton>
        </FormWrapper>
      </div>
    )
    const noLoggedInUser = (
      <BasicWrapper>
        <Link to="/sign-up/">Sign in to make a comment</Link>
      </BasicWrapper>
    )
    return (
      <div>
        { this.props.user ? loggedInUser : noLoggedInUser }
      </div>
    )
  }
}

export default withRouter(CreateComment)
