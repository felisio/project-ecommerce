import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { format } from 'date-fns'
import Head from 'next/head'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderStyles from './styles/OrderStyles'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createAt
      user {
        id
      }
      items {
        id
        title
        description
        image
        price
        quantity
      }
    }
  }
`;

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{id}}>
        {({data, loading, error}) => {
          if(error) return <Error error={error} />
          if(loading) return <p>Loading...</p>
          const { order } = data
          return (
            <OrderStyles>
              <Head>
                <title>Sick Fit order - {order.id}</title>
              </Head>
              <p>
                <span>Order Id</span>
                <span>{order.id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>
              <p>
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Items Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title}/>
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Qtd: {item.quantity}</p>
                      <p>Price: {formatMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          )
        }}
      </Query>
    );
  }
}

export default Order;