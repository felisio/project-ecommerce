import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import calcTotalPrice from '../lib/calcTotalPrice'
import Error from './ErrorMessage'
import User, { CURRENT_USER_QUERY } from './User'

// pk_75hn5ckGAdVdcZV2xVDTD555I7L4G
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder( token: $token ) {
      id
      total
      charge
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id,
      }
    }).catch(err => alert(err.message))
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    })
  };

  render() {
    return (
      <User>
        {({data: { me }, loading}) => {
          if(loading) return null
          return (
            <Mutation 
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
              {(createOrder, { loading, error }) => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name="Sick Fits"
                  description={`Order of ${totalItems(me.cart)}`}
                  image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                  stripeKey="pk_75hn5ckGAdVdcZV2xVDTD555I7L4G"
                  currency='USD'
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}

export default TakeMyMoney
export { CREATE_ORDER_MUTATION }