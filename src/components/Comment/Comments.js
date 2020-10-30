import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// // import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const CommentWrapper = styled.div`
  background: #D3D3D3;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
  display: grid;
  grid-template-columns: [first] 75% [line2] 25% [end];
  margin: 11px 1em;
  padding: 0.25em 1em;
`
const ContentWrapper = styled.div`
  margin: 0.5em 0.5em;
  word-wrap: break-word;
`

const ButtonWrapper = styled.div`
  align-self: end;
  justify-self: end;
`

const StylishButton = styled.button`
  background: #708090;
  border-radius: 4px;
  border: 2px solid #2F4F4F;
  color: #F9F9F9;
  margin: 0.5em 0.15em;
  padding: 0.25em 0.5em;

  &:hover {
    background: #2F4F4F;
    border: 2px solid #blue;
  }
`

class Comments extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      comments: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDelete = event => {
    axios({
      url: apiUrl + '/comments/' + event.currentTarget.id + '/',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => (
        this.props.msgAlert({
          heading: 'Delete Success',
          variant: 'success',
          message: 'A comment has been successfully deleted!'
        })
      ))
      .catch(() => (
        this.props.msgAlert({
          heading: 'Delete Failure ',
          variant: 'danger',
          message: 'A comment has not been deleted!'
        })
      ))
  }

  render () {
    const commentsOnPost = this.props.comments

    const userOptions = (comment) => (
      <ButtonWrapper>
        <Link to={`/comments/${comment.id}/edit/`}><StylishButton><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></StylishButton></Link>
        <StylishButton id={comment.id} onClick={this.handleDelete}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg></StylishButton>
      </ButtonWrapper>
    )

    return (
      <div>
        {commentsOnPost.map(comment => (
          <CommentWrapper key={comment.id}>

            <ContentWrapper>{comment.content}, by {comment.owner.email}</ContentWrapper>

            { this.props.user.id === comment.owner.id ? userOptions(comment) : '' }

          </CommentWrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(Comments)
