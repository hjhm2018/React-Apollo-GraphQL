import { List } from "antd";
import CarCard from "../listItems/CarCard";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import ListHeader from "../listItems/ListHeader";

const Cars = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { people } = data;

  return (
    <>
      {people.length > 0 &&
        people.map(({ id, firstName, lastName }) => (
          <List
            key={id}
            style={styles.list}
            grid={{ gutter: 20, column: 1 }}
            header={
              <ListHeader id={id} firstName={firstName} lastName={lastName} />
            }
            bordered
          >
            <List.Item>
              <CarCard personId={id} />
            </List.Item>
          </List>
        ))}
    </>
  );
};

const getStyles = () => ({
  list: {
    width: "80%",
    margin: "10px",
  },
});

export default Cars;
