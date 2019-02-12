import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation 
    mutation={SIGNOUT_MUTATION} 
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout, {loading, error}) => (
      <button onClick={() => {
        signout()
        Router.push({ pathname: '/items' })
      }}>
        Sign Out
      </button>
    )}
  </Mutation>
);

export default Signout;