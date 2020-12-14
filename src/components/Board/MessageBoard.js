import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'
import { BoardButton, BasicWrapper } from '../StyledComponents/StyledComponents'

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
        'Content-Type': 'application/json'
        // 'Authorization': `Token ${this.props.user.token}`
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
          'Content-Type': 'application/json'
          // 'Authorization': `Token ${this.props.user.token}`
        }
      })
        .then(res => this.setState({ posts: res.data.posts }))
    }
  }

  render () {
    const boardPosts = this.state.posts
    const timeChange = time => moment(time).format('LLL')

    return (
      <div>
        {boardPosts.map(post => (
          <BasicWrapper key={post.id}>
            <p>Posted by <Link to={`/profile/${post.owner.id}`}>{post.owner.email}</Link>, last updated at {timeChange(post.updated_at)}</p>
            <h3>{post.title}</h3>
            <h6>{post.content}</h6>
            <Link to={`/posts/${post.id}/`}><BoardButton>See Post</BoardButton></Link>
          </BasicWrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(MessageBoard)
