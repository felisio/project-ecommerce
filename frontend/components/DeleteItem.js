import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION ( $id: ID! ) {
    deleteItem( id: $id ) {
      id
    }
  }
`;

class DeleteItem extends Component {
  
  deleteItem = async(deleteItemMutation) => {
    if(confirm('Are you sure you want delete this item?')) {
      deleteItemMutation().catch(err => {
        alert(err.message)
      });
    }
  }

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
  }

  render() {
    return (
      <Mutation 
        refetchQueries={['ALL_ITEMS_QUERY', 'PAGINATION_QUERY']}
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, {loading, error}) => (
          <button onClick={() => this.deleteItem(deleteItem)}>{this.props.children}</button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;