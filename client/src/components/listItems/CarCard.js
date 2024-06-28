import { GET_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import CarSubItem from "./CarSubItem";

const CarCard = (props) => {
  const { personId } = props;

  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { cars } = data;

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
            />
          ))}
    </>
  );
};

export default CarCard;
