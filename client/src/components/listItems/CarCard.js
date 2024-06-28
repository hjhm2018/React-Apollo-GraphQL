import { Card } from "antd";
// import RemoveContact from "../buttons/RemoveContact";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
// import UpdateContact from "../forms/updateContact";
import { GET_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/updateCar";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { personId } = props;

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { cars } = data;
  // console.log(cars);

  return (
    <>
      {cars.length > 0 &&
        cars
          .filter((car) => car.personId == personId)
          .map((car) =>
            editMode ? (
              <UpdateCar
                id={car.id}
                make={car.make}
                model={car.model}
                year={car.year}
                price={car.price}
                personId={car.personId}
                onButtonClick={handleButtonClick}
              />
            ) : (
              <Card
                key={car.id}
                style={styles.card}
                actions={[
                  <EditOutlined
                    style={{ color: "green" }}
                    key="edit"
                    onClick={handleButtonClick}
                  />,
                  <RemoveCar
                    id={car.id}
                    carMake={car.make}
                    carModel={car.model}
                  />,
                ]}
              >
                {car.year} {car.make} {car.model} -&#x3e; $
                {parseInt(car.price).toLocaleString()}
              </Card>
            )
          )}
    </>
  );
};

const getStyles = () => ({
  card: {
    width: "100%",
  },
});

export default CarCard;
