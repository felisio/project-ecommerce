import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    ) {
      id
      name
      email
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation 
        mutation={SIGNIN_MUTATION} 
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={this.state}>
        {(signin, {loading, error}) => (
          <Form method="post" onSubmit={async e => {
              e.preventDefault()
              const response = await signin()
              this.setState({ email: '', password: '' })
              Router.push({ pathname: '/items' })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input 
                  type="email" 
                  name="email" 
                  placeholder="email" 
                  value={this.state.email} 
                  onChange={this.saveToState} 
                  />
              </label>
              <label htmlFor="password">
                Password
                <input 
                  type="password" 
                  name="password" 
                  placeholder="password" 
                  value={this.state.password} 
                  onChange={this.saveToState} 
                  />
              </label>
              <button type="submit">Sign in!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    
    );
  }
}

export default Signin;