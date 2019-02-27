**Basic React.js, Next and Apollo Graphql**

For this first post about react.js and apollo graphql my intention is to show how to configure an ApolloClient and what is the best way to use a query component. For this example, I've been using next.js

First, we need to install all the dependencies to use the Apollo graphql

```
yarn add apollo-client apollo-boost graphql graphql-tag react-apollo next-with-apollo

```


We need to configure an Apollo client. In my lib folder, I will be creating a file called apolloClient.js 

```
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

function createClient({ headers }) {
  return new ApolloClient({
    uri: 'http://example/graphql',
  });
}

export default withApollo(createClient);

```

I imported an Apollo HOC for Next.js called 'next-with-apollo', after that, I imported the ApolloClient by apollo-boost, this way I can initiate my new instance of Apollo client and send it as an argument in the Higher Order Components. Doing that I created a Higher Order Component and I will pass my App.js as an argument for them.

In my folder pages, I created a file called _app.js this way you can override the default app.js of the next.js, in this file, I will call the file created above and it will be like this:

```
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import apolloClient from '../lib/apolloClient'

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
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default apolloClient(MyApp)

```

Following the example, in the docs of the next.js (https://nextjs.org/docs/) I inserted the ApolloProvider above of the default component. Doing that all my application can use the Apollo graphql. In the final, I get the component and pass it for an argument in my Higher order component created above.

Now I will create our first query component. I prefer to think of a component as a resource, this way I will use in the same file the query and the component together. If I need this query I just call this component and it returns a 'render props'. In this example, I will create a component called `User`, and this component will return the User logged.

```
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

export default User;
export { CURRENT_USER_QUERY }
```

Basically, I imported the Query component from the react-apollo and the gql from the graphql-tag. The idea of the resource is always to be reused. When I need to get the user resource, then I only get this query and pass for these children and they will consume the resource. In this example, I will show you how to consume their resource: 


```
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

const Nav = () => {
  return (
    <User>
      {({data: { me }}) => (
        <NavStyles>
          {me && (
            <Link href="/sell">
              <a>Sell</a>
            </Link>
          )}
          {!me && (
            <Link href="/signin">
              <a>Signin</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
```

I created a Menu NavBar and I validated so if the user exists I will return a link for a page of sells if not, I will return the link of Sign in. It's a simple example of how you can use the idea of a resource for your component.

In the next post, I'm gonna create an example for a mutation and start writing the tests of these components.


links and references:
- https://github.com/lfades/next-with-apollo
- https://nextjs.org/docs/
- https://github.com/zeit/next.js/blob/master/examples/with-app-layout/pages/_app.js
- https://github.com/lfades/next-with-apollo



