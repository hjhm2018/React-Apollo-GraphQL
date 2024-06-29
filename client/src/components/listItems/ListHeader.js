import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/updatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { useState } from "react";

const ListHeader = ({ id, firstName, lastName }) => {
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return editMode ? (
    <UpdatePerson
      id={id}
      firstName={firstName}
      lastName={lastName}
      onButtonClick={handleButtonClick}
    />
  ) : (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>
        {firstName} {lastName}
      </h3>
      <div style={{ paddingTop: "10px", fontSize: "24px" }}>
        <EditOutlined
          style={{ color: "green" }}
          key="edit"
          onClick={handleButtonClick}
        />
        &nbsp;
        <RemovePerson id={id} firstName={firstName} lastName={lastName} />
      </div>
    </div>
  );
};

export default ListHeader;
