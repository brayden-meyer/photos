import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './App.css'
import PhotoGrid from './components/PhotoGrid';

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <div className="flex justify-center p-20">
        <h1 className="font-semibold">Photo Gallery</h1>
      </div>
      <ApolloProvider client={client}>
        <PhotoGrid />
      </ApolloProvider>
    </>
  ) 

}

export default App;
