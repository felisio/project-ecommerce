import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'
import formaMoney from '../lib/formatMoney'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY( $id: ID! ) {
    item( where: { id: $id } ) {
      id
      title
      description
      image
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      image
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {}

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault()
    const response = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    })
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if(loading) return <p>Loading...</p>
          if(!data.item) return <p>404 Not found!</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, {loading, error}) => (
                  <Form onSubmit={e => this.updateItem(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="file">
                        {data.item.image && <img width="200" src={data.item.image} alt="upload image"/>}
                      </label>

                      <label htmlFor="title">
                        Title
                        <input 
                          type="text" 
                          id="title" 
                          name="title" 
                          placeholder="Title" 
                          defaultValue={data.item.title}
                          onChange={this.handleChange}
                          required
                          />
                      </label>

                      <label htmlFor="price">
                        Price
                        <input 
                          type="number" 
                          id="price" 
                          name="price" 
                          placeholder="Price" 
                          defaultValue={data.item.price}
                          onChange={this.handleChange}
                          required
                          />
                      </label>

                      <label htmlFor="description">
                        Description
                        <textarea 
                          id="description" 
                          name="description" 
                          placeholder="Enter the description" 
                          defaultValue={data.item.description}
                          onChange={this.handleChange}
                          required
                          />
                      </label>
                      <button type="submit">Sav{loading? 'ing' : 'e'} Changes</button>
                    </fieldset>
                  </Form>
                )}
            </Mutation>
          )
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION }