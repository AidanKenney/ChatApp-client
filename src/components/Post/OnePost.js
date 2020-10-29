import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CreateComment from '../Comment/CreateComment'
import Comments from '../Comment/Comments'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #D3D3D3;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
  margin: 0 1em;
  padding: 0.25em 1em;
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
        comments: []
      }

    }
    this.handleDelete = this.handleDelete.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
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

  render () {
    // const commentsOnPost = this.state.post.comments
    return (
      <Wrapper className="col-md-5">
        <h2>{this.state.post.title}</h2>
        <h4>by {this.state.post.owner.email}</h4>
        <p>{this.state.post.content}</p>
        <Link to={`/posts/${this.state.post.id}/edit/`}><Button>Update Post</Button></Link>
        <Button onClick={this.handleDelete}>Delete Post</Button>
        <CreateComment user={this.props.user} msgAlert={this.props.msgAlert}/>
        <Comments user={this.props.user} comments={this.state.post.comments} msgAlert={this.props.msgAlert}/>
      </Wrapper>
    )
  }
}

export default withRouter(OnePost)
