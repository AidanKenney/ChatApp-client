import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CreateComment from '../Comment/CreateComment'
import Comments from '../Comment/Comments'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { StylishButton, GridWrapper, ButtonWrapper, PostWrapper, LikeButtonWrapper, Wrapper } from '../StyledComponents/StyledComponents'

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
        votes: 0
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
    // set state of the event target's name as the value
    const postCopy = Object.assign({}, this.state.post)
    postCopy['votes'] = postCopy['votes'] + 1
    this.setState({ post: postCopy })
  }

  downVote = () => {
    // set state of the event target's name as the value
    const postCopy = Object.assign({}, this.state.post)
    postCopy['votes'] = postCopy['votes'] - 1
    this.setState({ post: postCopy })
  }

  render () {
    const userOptions = (
      <ButtonWrapper>
        <Link to={`/posts/${this.state.post.id}/edit/`}><StylishButton><FontAwesomeIcon icon={faEdit} /> Edit</StylishButton></Link>
        <StylishButton onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</StylishButton>
      </ButtonWrapper>
    )
    const voteTally = (
      <LikeButtonWrapper>
        <StylishButton onClick={this.upVote}><FontAwesomeIcon className="caret" icon={faCaretUp} /></StylishButton>
        <div>{ this.state.post.votes }</div>
        <StylishButton onClick={this.downVote}><FontAwesomeIcon className="caret" icon={faCaretDown} /></StylishButton>
      </LikeButtonWrapper>
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
