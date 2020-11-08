import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CreateComment from '../Comment/CreateComment'
import Comments from '../Comment/Comments'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { StylishButton, GridWrapper, ButtonWrapper, PostWrapper, LikeButtonWrapper, LikeFeatureWrapper, Wrapper } from '../StyledComponents/StyledComponents'

class OnePost extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      post: {
        title: '',
        content: '',
        owner: {},
        comments: [],
        votes: []
      }

    }
    this.handleDelete = this.handleDelete.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
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

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
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
  }

  handleDelete = event => {
    axios({
      url: apiUrl + '/posts/' + this.props.match.params.id + '/',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => this.props.history.push('/posts/'))
      .then(() => (
        this.props.msgAlert({
          heading: 'Delete Success',
          variant: 'success',
          message: 'A post has been successfully deleted!'
        })
      ))
      .catch(() => (
        this.props.msgAlert({
          heading: 'Delete Failure ',
          variant: 'danger',
          message: 'A post has not been deleted!'
        })
      ))
  }

  upVote = () => {
    event.preventDefault()
    // if this post has not already been voted on my the user, let them vote
    if (this.state.post.votes.filter(item => item.owner.id === this.props.user.id).length === 0) {
      axios({
        url: apiUrl + '/votes/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.user.token}`
        },
        data: {
          vote: {
            up_or_down: true,
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
            message: 'You voted!'
          })
        ))
        .catch(() => (
          this.props.msgAlert({
            heading: 'Create Failure',
            variant: 'danger',
            message: 'Error,vote failed'
          })
        ))
    } else {
      this.props.msgAlert({
        heading: 'Vote Failed',
        variant: 'danger',
        message: 'You have already voted on this post'
      })
    }
  }

  downVote = () => {
    event.preventDefault()
    // if this post has not already been voted on my the user, let them vote
    if (this.state.post.votes.filter(item => item.owner.id === this.props.user.id).length === 0) {
      axios({
        url: apiUrl + '/votes/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.user.token}`
        },
        data: {
          vote: {
            up_or_down: false,
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
            message: 'You voted!'
          })
        ))
        .catch(() => (
          this.props.msgAlert({
            heading: 'Create Failure',
            variant: 'danger',
            message: 'Error,vote failed'
          })
        ))
    } else {
      this.props.msgAlert({
        heading: 'Vote Failed',
        variant: 'danger',
        message: 'You have already voted on this post'
      })
    }
  }

  render () {
    const userOptions = (
      <ButtonWrapper>
        <Link to={`/posts/${this.state.post.id}/edit/`}><StylishButton><FontAwesomeIcon icon={faEdit} /> Edit</StylishButton></Link>
        <StylishButton onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</StylishButton>
      </ButtonWrapper>
    )
    const noVotes = this.state.post.votes.filter(item => item.owner.id === this.props.user.id).length === 0
    const voteTally = (
      <LikeFeatureWrapper className="row">
        <LikeButtonWrapper className="col-6">
          <div>{ this.state.post.votes.filter(item => item.up_or_down === true).length }</div>
          <StylishButton disabled={!noVotes} onClick={this.upVote}><FontAwesomeIcon className="thumbs" icon={faThumbsUp} /></StylishButton>
        </LikeButtonWrapper>
        <LikeButtonWrapper className="col-6">
          <div>{ this.state.post.votes.filter(item => item.up_or_down === false).length }</div>
          <StylishButton disabled={!noVotes} onClick={this.downVote}><FontAwesomeIcon className="thumbs" icon={faThumbsDown} /></StylishButton>
        </LikeButtonWrapper>
      </LikeFeatureWrapper>
    )
    return (
      <Wrapper>
        <GridWrapper>
          <PostWrapper>
            <p>Posted by <Link to={`/profile/${this.state.post.owner.id}`}>{this.state.post.owner.email}</Link></p>
            <h2>{this.state.post.title}</h2>
            <h6>{this.state.post.content}</h6>
          </PostWrapper>

          { this.props.user.id === this.state.post.owner.id ? userOptions : voteTally }

        </GridWrapper>

        <CreateComment user={this.props.user} msgAlert={this.props.msgAlert}/>
        <Comments user={this.props.user} comments={this.state.post.comments} msgAlert={this.props.msgAlert}/>
      </Wrapper>
    )
  }
}

export default withRouter(OnePost)
