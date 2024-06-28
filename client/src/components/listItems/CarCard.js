import { Card } from "antd";
// import RemoveContact from "../buttons/RemoveContact";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
// import UpdateContact from "../forms/updateContact";
import { GET_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/updateCar";
import CarSubItem from "./CarSubItem";

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
          .map(({ id, make, model, year, price, personId }) => (
            <CarSubItem
              key={id}
              id={id}
              make={make}
              model={model}
              year={year}
              price={price}
              personId={personId}
              onButtonClick={handleButtonClick}
            />
          ))}
    </>
  );
};

const getStyles = () => ({
  card: {
    width: "100%",
  },
});

export default CarCard;
