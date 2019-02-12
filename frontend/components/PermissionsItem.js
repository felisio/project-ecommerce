import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import SickButton from './styles/SickButton'
import { possiblePermissions } from './Permissions'
import {gql} from 'apollo-boost';

const UPDATE_PERMISSION_MUTATIONS = gql`
  mutation UPDATE_PERMISSION_MUTATIONS( $permissions: [Permission], $userId: ID! ) {
    updatePermissions( permissions: $permissions, userId: $userId ) {
      id
      name
      email
      permissions
    }
  }
`

class PermissionsItem extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired
  }

  state = {
    permissions: this.props.user.permissions
  }

  handlePermissionChange = (e, updatePermissionsMutation) => {
    const checkbox = e.target
    let updatePermissions = [...this.state.permissions]
    if(checkbox.checked) {
      updatePermissions.push(checkbox.value)
    }else {
      updatePermissions = updatePermissions.filter(item => item !== checkbox.value)
    }
    this.setState({ permissions: updatePermissions }, updatePermissionsMutation)
  }

  render() {
    const { user } = this.props
    return (
      <Mutation 
        mutation={UPDATE_PERMISSION_MUTATIONS}
        variables={{
          permissions: this.state.permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, {loading, error}) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {possiblePermissions.map(permission => (
              <td key={permission}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input 
                    id={`${user.id}-permission-${permission}`}
                    type="checkbox"
                    checked={this.state.permissions.includes(permission)} 
                    value={permission}
                    onChange={(e) => this.handlePermissionChange(e, updatePermissions)}
                  />
                </label>
              </td>
            ))}
            <td>
              <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                Updat{loading ? 'ing' : 'e'}
              </SickButton>
            </td>
          </tr>
        )}
      </Mutation>
    )
  }
}

export default PermissionsItem