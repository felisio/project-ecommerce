import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Table from './styles/Table'

import Error from './ErrorMessage'
import Signin from './Signin'
import { CURRENT_USER_QUERY } from './User'
import PermissionsItem from './PermissionsItem'

export const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
query ALL_USERS_QUERY {
  users {
    id
    name
    email
    permissions
  }
}
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => {
      if (error) return <Error error={error} />
      if (loading) return <p>Loading...</p>
      if(data.users) {
        return (
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                  <th>👇</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => <PermissionsItem key={user.id} user={user} />)}
              </tbody>
            </Table>
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

export default Permissions