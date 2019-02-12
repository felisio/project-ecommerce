import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import { CURRENT_USER_QUERY } from './User'
import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'
// resetPassword(resetToken: String!, password: String!, confirmPassword: String!):
const REQUEST_PASSSWORD_MUTATION = gql`
  mutation REQUEST_PASSSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      name
      email
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }

  state = {
    password: '',
    confirmPassword: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation 
        mutation={REQUEST_PASSSWORD_MUTATION} 
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}>
        {(resetPassword, {loading, error, called}) => (
          <Form method="post" onSubmit={async e => {
              e.preventDefault()
              const response = await resetPassword()
              this.setState({ password: '', confirmPassword: '' })
              // Router.push({ pathname: '/items' })
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Insert the password and confirm to change</h2>
              <Error error={error} />
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
              <label htmlFor="password">
                Confirm Password
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="confirmPassword" 
                  value={this.state.confirmPassword} 
                  onChange={this.saveToState} 
                  />
              </label>
              <button type="submit">Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    
    );
  }
}

export default Reset;