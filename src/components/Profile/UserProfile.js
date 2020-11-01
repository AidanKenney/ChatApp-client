import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

import { BoardButton, BasicWrapper } from '../StyledComponents/StyledComponents'

class UserProfile extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      posts: [],
      owner: ''
    }
  }

  // make API call to get posts from certain user
  componentDidMount () {
    axios({
      url: apiUrl + '/posts/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => res.data.posts.filter(post => post.owner.id === this.props.user.id))
      .then(res => this.setState({ posts: res, owner: res[0].owner.email }))
  }

  render () {
    const timeChange = time => moment(time).format('LLL')
    const boardPosts = this.state.posts
    return (
      <div>
        <h2>All your posts, {this.state.owner}</h2>
        {boardPosts.map(post => (
          <BasicWrapper key={post.id}>
            <p>Posted by {post.owner.email}, last updated at {timeChange(post.updated_at)}</p>
            <h3>{post.title}</h3>
            <h6>{post.content}</h6>
            <Link to={`/posts/${post.id}/`}><BoardButton>See Post</BoardButton></Link>
          </BasicWrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(UserProfile)
