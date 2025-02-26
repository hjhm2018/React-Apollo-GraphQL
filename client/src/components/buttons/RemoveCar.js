import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import filter from "lodash.filter";

const RemoveCar = ({ id, carMake, carModel }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      `Do you want to delete this ${carMake} ${carModel}?`
    );

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};
export default RemoveCar;
