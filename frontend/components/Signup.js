import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      id
      name
      email
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation 
        mutation={SIGNUP_MUTATION} 
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={this.state}>
        {(signup, {loading, error}) => (
          <Form data-test="form" method="post" onSubmit={async e => {
              e.preventDefault()
              const response = await signup()
              this.setState({ email: '', name: '', password: '' })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for an Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="email" 
                  value={this.state.email} 
                  onChange={this.saveToState} 
                  />
              </label>
              <label htmlFor="name">
                Name
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="name" 
                  value={this.state.name} 
                  onChange={this.saveToState} 
                  />
              </label>
              <label htmlFor="password">
                Password
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="password" 
                  value={this.state.password} 
                  onChange={this.saveToState} 
                  />
              </label>
              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };