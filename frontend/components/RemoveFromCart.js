import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User'

const REMOVE_TO_CART_MUTATION = gql`
  mutation REMOVE_TO_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY })
    const cartItemId = payload.data.removeFromCart.id
    data.me.cart = data.me.cart.filter(cartItem => cartItem !== cartItemId)
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  }

  render() {
    const { id } = this.props
    return (
      <Mutation 
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
        mutation={REMOVE_TO_CART_MUTATION} 
        update={this.update}
        variables={{ id }}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
      >
        {(removeFromCart, { loading }) => (
          <BigButton 
            title="Delete Item" 
            disabled={loading} 
            onClick={() => {
              removeFromCart().catch(err => alert(err.message))
            }}>
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
export { ADD_TO_CART_MUTATION }