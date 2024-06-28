import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddPerson from "./components/forms/addPerson";
import AddCar from "./components/forms/addCar";
import Cars from "./components/lists/Cars";
import RecordsTitle from "./components/layout/RecordsTitle";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>PEOPLE AND THEIR CARS</h1>
        <AddPerson />
        <AddCar />
        <RecordsTitle />
        <Cars />
      </div>
    </ApolloProvider>
  );
};

export default App;
