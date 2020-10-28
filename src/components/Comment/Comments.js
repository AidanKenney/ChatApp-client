import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// // import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Comments extends Component {
  constructor (props) {
    super(props)
    // create state to store title and content of post
    this.state = {
      comments: []
    }
  }
  // this.handleDelete = this.handleDelete.bind(this)
  // this.handleSubmit = this.handleSubmit.bind(this)

  // make API call to get single post with comments
  // componentDidMount () {
  //   axios({
  //     url: apiUrl + '/posts/' + this.props.match.params.id + '/',
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${this.props.user.token}`
  //     }
  //   })
  //     .then(res => this.setState({ comments: res.data.post.comments }))
  // }
  //
  // componentDidUpdate (prevProps) {
  //   if (this.props !== prevProps) {
  //     console.log('Component did update!')
  //     axios({
  //       url: apiUrl + '/posts/' + this.props.match.params.id + '/',
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Token ${this.props.user.token}`
  //       }
  //     })
  //       .then(res => this.setState({ post: res.data.post }))
  //   }
  // }

  handleDelete = event => {
    // console.log(this.props)
    // console.log(event.target.id)
    // const commentArray = this.props.comments
    // const commentId = commentArray.find(x => x.id === event.target.id)
    // console.log('commentID is', commentId)
    axios({
      url: apiUrl + '/comments/' + event.target.id + '/',
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
    return (
      <div className="col-md-5">
        <ul>
          {commentsOnPost.map(comment => (
            <li key={comment.id}>{comment.content}, by {comment.owner.email}
              <Button id={comment.id} onClick={this.handleDelete}>Delete Comment</Button>
              <Link to={`/comments/${comment.id}/edit/`}><Button>Edit Comment</Button></Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(Comments)
