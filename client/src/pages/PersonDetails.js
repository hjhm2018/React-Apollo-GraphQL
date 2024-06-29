import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { List } from "antd";
import CarCard from "../components/listItems/CarCard";

const PersonDetails = () => {
  let { id } = useParams();

  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { people } = data;

  const filteredPerson = people.find((person) => person.id === id);

  const { firstName, lastName } = filteredPerson;

  return (
    <div className="App">
      <Link to="/">&#x3c; Back to Home Page</Link>
      <List
        style={styles.list}
        grid={{ gutter: 20, column: 1 }}
        header={
          <h2>
            {firstName} {lastName}
          </h2>
        }
        bordered
      >
        <List.Item>
          <CarCard personId={id} />
        </List.Item>
      </List>
    </div>
  );
};

const getStyles = () => ({
  list: {
    width: "80%",
    margin: "10px",
  },
});

export default PersonDetails;
