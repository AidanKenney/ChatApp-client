import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'

// import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-self: center;
  justify-self: end;
`
const StylishButton = styled.button`
  background: #3F88C5;
  border-radius: 4px;
  border: 2px solid #BBBFCA;
  color: #F9F9F9;
  height: 30px;
  width: 30px;
  margin: 0.7rem 0.3rem;
  padding: 0.0em 0.0em;

  &:hover {
    background: #F9F9F9;
    border: 2px solid #E94F37;
    color: #3F88C5;
//   }
// `


class VoteTally extends Component {
  // constructor (props) {
  //   super(props)
  //   // create state to store title and content of post
  //   this.state = {
  //     vote: 0
  //   }
  // //   this.upVote = this.upVote.bind(this)
  // //   this.downVote = this.downVote.bind(this)
  // // }
  // }

  // upVote = event => this.setState({
  //   // set state of the event target's name as the value
  //   vote: this.state.vote + 1
  // })
  //
  // downVote = event => this.setState({
  //   // set state of the event target's name as the value
  //   vote: this.state.vote - 1
  // })

  render () {
    console.log('VoteTally props are', this.props)
    return (
    )
}

export default withRouter(VoteTally)
