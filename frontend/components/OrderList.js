import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import styled from 'styled-components'
import OrderItemStyles from './styles/OrderItemStyles';

const LIST_ORDER_QUERY = gql`
  query LIST_ORDER_QUERY {
    orders(orderBy: createAt_DESC) {
      id
      charge
      total
      createAt
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

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={LIST_ORDER_QUERY}>
        {({ data, error, loading }) => {
          if(error) return <Error error={error} />
          if(loading) return <p>Loading...</p>
          const { orders } = data

          return(
            <div>
              <h2>You have {orders.length} Orders</h2>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                      <Link href={{ pathname: '/order', query: {id: order.id} }}>
                        <a>
                          <div className="order-meta">
                            <p>{order.items.reduce((a, b)=> a + b.quantity, 0)} Items</p>
                            <p>{order.items.length} Products</p>
                            <p>Create: {formatDistance(order.createAt, new Date())}</p>
                            <p>Total: {formatMoney(order.total)}</p>
                          </div>
                          {/* <div className="images">
                            {order.items.map(item => (
                              <img src={item.image} alt={item.title} key={item.id}/>
                            ))}
                          </div> */}
                        </a>
                      </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;