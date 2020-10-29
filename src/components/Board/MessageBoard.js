import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Fragment from 'react-bootstrap/Fragment'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #D3D3D3;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
  margin: 0 1em;
  padding: 0.25em 1em;
`
const StylishButton = styled.button`
  background: #708090;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
  font-size: 14px;
  color: #F9F9F9;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
`

class MessageBoard extends Component {
  constructor (props) {
    super(props)

    // state of the Message Board will be filled with posts
    this.state = {
      posts: []
    }
  }
  // make API call to get all posts
  componentDidMount () {
    axios({
      url: apiUrl + '/posts/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ posts: res.data.posts }))
  }

  // get all posts again if a new post is added
  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      axios({
        url: apiUrl + '/posts/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.user.token}`
        }
      })
        .then(res => this.setState({ posts: res.data.posts }))
    }
  }

  render () {
    const boardPosts = this.state.posts
    return (
      <div>
        {boardPosts.map(post => (
          <Wrapper key={post.id}>
            <h4>{post.title}</h4>
            <h6>by {post.owner.email}</h6>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}/`}><StylishButton>See Post</StylishButton></Link>
          </Wrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(MessageBoard)
