import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Signin from './Signin'
import { CURRENT_USER_QUERY } from './User'

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({data, loading}) => {
      if (loading) return <p>Loading...</p>
      if(!data.me) {
        return (
          <div>
            <h2>Please Sign in!</h2>
            <Signin />
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignIn