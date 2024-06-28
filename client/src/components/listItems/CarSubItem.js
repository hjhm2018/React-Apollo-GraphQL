import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/updateCar";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const CarSubItem = ({ id, make, model, year, price, personId }) => {
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const styles = getStyles();

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          year={year}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              style={{ color: "green" }}
              key="edit"
              onClick={handleButtonClick}
            />,
            <RemoveCar id={id} carMake={make} carModel={model} />,
          ]}
        >
          {year} {make} {model} -&#x3e; ${parseInt(price).toLocaleString()}
        </Card>
      )}
    </>
  );
};

const getStyles = () => ({
  card: {
    width: "100%",
  },
});

export default CarSubItem;
