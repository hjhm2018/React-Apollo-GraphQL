import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import { UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
  const { id, make, model, personId, price, year, onButtonClick } = props;
  const [form] = Form.useForm();

  const [, forceUpdate] = useState();

  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { make, model, price, year } = values;

    updateCar({
      variables: {
        id,
        make,
        model,
        personId,
        price,
        year,
      },
    });
    onButtonClick();
  };

  return (
    <Form
      name="update-car-form"
      layout="inline"
      initialValues={{ make, model, price, year }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <Input style={{ width: "80px" }} placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please enter the car make" }]}
      >
        <Input placeholder="Make" style={{ width: "100px" }} />
      </Form.Item>

      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please enter the car model" }]}
      >
        <Input placeholder="Model" style={{ width: "100px" }} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the car price" }]}
      >
        <Input placeholder="$" style={{ width: "60px" }} />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button danger type="primary" onClick={onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
