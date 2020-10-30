import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import CreateComment from '../Comment/CreateComment'
// import Comments from '../Comment/Comments'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Wrapper = styled.div`
   background: #F4F4F2;
   border-radius: 3px;
   border: 1px solid #BBBFCA;
   margin: 0.75em 1em;
   padding: 0.25em 1em;

   & p {
     padding-left: 1em;
     padding-top: 1em;
     margin-bottom: 0.5em;
   }
   & h3 {
     padding-left: 1rem;
   }
   & h6 {
     padding-left: 1em;
   }
   &:hover {
     border: 1px solid #82858D;
   }
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

class UserProfile extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      posts: []
      // post: {
      //   title: '',
      //   content: '',
      //   owner: {},
      //   comments: []
      // }

    }
    // this.handleDelete = this.handleDelete.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
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
      .then(res => res.data.posts.filter(post => post.owner.id === parseInt(this.props.match.params.id)))
      .then(res => this.setState({ posts: res }))
  }

  render () {
    const boardPosts = this.state.posts
    console.log('this is state', this.state)
    return (
      <div>

        <h2>All posts by...</h2>
        {boardPosts.map(post => (
          <Wrapper key={post.id}>
            <p>Posted by {post.owner.email}, last updated at {post.updated_at}</p>
            <h3>{post.title}</h3>
            <h6>{post.content}</h6>
            <Link to={`/posts/${post.id}/`}><StylishButton>See Post</StylishButton></Link>
          </Wrapper>
        ))}
      </div>
    )
  }
}

export default withRouter(UserProfile)
