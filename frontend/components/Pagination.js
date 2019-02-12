import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'

import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
      {({data, error, loading}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error: {error.message}</p>
        const count = data.itemsConnection.aggregate.count
        const pages = Math.ceil(count / perPage)
        const { page } = props
        return (
          <PaginationStyles>
            <Head>
              <title>Sick Fits | page {page} of {pages}</title>
            </Head>
            <Link
              prefetch 
              href={{
                pathname: 'items',
                query: { page: page - 1 },
              }}
            >
              <a className="prev" aria-disabled={page <= 1}> 🔙 Prev </a>
            </Link>
            <p>{page} of {pages}</p>
            <p>{count} items total!</p>
            <Link href={{
              pathname: 'items',
              query: { page: page + 1 },
            }}>
              <a className="prev" aria-disabled={page >= pages}> Next 🔜 </a>
            </Link>
          </PaginationStyles>
        )
      }}
    </Query>
)

export default Pagination