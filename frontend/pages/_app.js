import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import Page from '../components/Page'
import withData from '../lib/withData'

class MyApp extends App {
  // TO get url querys dinamyc with next js ex: page?name=bela
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx)
    }
    // this expose the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render () {
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)