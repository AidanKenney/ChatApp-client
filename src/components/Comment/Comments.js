import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { StylishButton, GridWrapper, ButtonWrapper, ContentWrapper } from '../StyledComponents/StyledComponents'

class Comments extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      comments: []
    }
    this.handleDelete = this.handleDelete.bind(this)
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
        <Link to={`/comments/${comment.id}/edit/`}><StylishButton><FontAwesomeIcon icon={faEdit} /></StylishButton></Link>
        <StylishButton id={comment.id} onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /></StylishButton>
      </ButtonWrapper>
    )

    return (
      <div>
        {commentsOnPost.map(comment => (
          <GridWrapper key={comment.id}>

            <ContentWrapper>{comment.content}, by <Link to={`/profile/${comment.owner.id}`}>{comment.owner.email}</Link></ContentWrapper>

            { this.props.user.id === comment.owner.id ? userOptions(comment) : '' }

          </GridWrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(Comments)
