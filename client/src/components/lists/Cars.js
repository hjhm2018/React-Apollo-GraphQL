import { List } from "antd";
import CarCard from "../listItems/CarCard";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";

const Cars = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { people } = data;
  // console.log(people);

  return (
    <>
      {people.length > 0 &&
        people.map((person) => (
          <List
            key={person.id}
            style={styles.list}
            grid={{ gutter: 20, column: 1 }}
            header={
              <div>
                <h3>
                  {person.firstName} {person.lastName}
                </h3>
              </div>
            }
            bordered
          >
            <List.Item>
              <CarCard personId={person.id} />
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
