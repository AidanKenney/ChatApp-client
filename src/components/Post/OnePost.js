import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CreateComment from '../Comment/CreateComment'
import Comments from '../Comment/Comments'
// import VoteTally from '../Votes/VoteTally'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Wrapper = styled.div`
  /* background: #D3D3D3; */
  border-radius: 4px;
  /* border: 2px solid #2F4F4F; */
  margin: 1em 1em;
  padding: 0.25em 1em;
`
const GridWrapper = styled.div`
  background: #F4F4F2;
  border-radius: 3px;
  border: 1px solid #BBBFCA;
  display: grid;
  grid-template-columns: [first] 75% [line2] 25% [end];
  margin: 11px 1em;
  padding: 0.25em 1em;

  &:hover {
    border: 1px solid #82858D;
  }
`
const LikeButtonWrapper = styled.div`
  /* background: #D3D3D3; */
  border-radius: 4px;
  /* border: 2px solid #2F4F4F; */
  margin: 0 auto;
  padding: 0.25em 1em;
  grid-template-rows: [row1-start] 40% [row1-end] 20% [third-line] auto [last-line];

  & div {
    height: 20px;
    width: 20px;
    margin: 0 auto;
    text-align: center;
  }
`

const PostWrapper = styled.div`
  margin: 0.5em 0.5em;
  word-wrap: break-word;

  & p {
    margin-bottom: 0.5em;
  }
`
const ButtonWrapper = styled.div`
  align-self: center;
  justify-self: center;
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

const StyledSvg = styled.svg`
  align-self: center;
  display: inline-flex;
`

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
    // this.handleSubmit = this.handleSubmit.bind(this)
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
      console.log('Component did update!')
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
    console.log(this.state.post.votes)
    const userOptions = (
      <ButtonWrapper>
        <Link to={`/posts/${this.state.post.id}/edit/`}><StylishButton><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg> Edit</StylishButton></Link>
        <StylishButton onClick={this.handleDelete}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg> Delete</StylishButton>
      </ButtonWrapper>
    )
    const voteTally = (
      <LikeButtonWrapper>
        <StylishButton onClick={this.upVote}><StyledSvg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </StyledSvg></StylishButton>
        <div>{ this.state.post.votes }</div>
        <StylishButton onClick={this.downVote}><StyledSvg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </StyledSvg></StylishButton>
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
