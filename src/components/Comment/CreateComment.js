import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const FormWrapper = styled.form`
  background: #D3D3D3;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
  display: flex;
  flex-direction: row;
  margin: 1em 1em;
  padding: 0.25em 1em;
`

const StylishButton = styled.button`
  background: #708090;
  border-radius: 4px;
  border: 2px solid #2F4F4F;
  color: #F9F9F9;
  height: 30px;
  width: 30px;
  margin: 0.7rem 0.3rem;
  padding: 0.0em 0.0em;

  &:hover {
    background: #2F4F4F;
    border: 2px solid #blue;
  }
`

const StyledSvg = styled.svg`
  align-self: center;
  display: inline-flex;
`

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
    console.log('state is', this.state)
    console.log('this.props is', this.props)

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
    return (
      <div>
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

            <StylishButton type="submit" className="btn btn-primary" ><StyledSvg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </StyledSvg></StylishButton>
          </FormWrapper>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateComment)
