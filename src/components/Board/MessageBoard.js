import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Fragment from 'react-bootstrap/Fragment'

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
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}/`}><Button>See Post</Button></Link>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(MessageBoard)
