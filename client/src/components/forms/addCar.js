import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../graphql/queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();

  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    // console.log("values", values);

    addCar({
      variables: {
        id,
        make,
        model,
        personId,
        price,
        year,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });

        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";

  if (error) return "Error fetching data...";

  const { people } = data;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Add Car</h2>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
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

        <Form.Item
          name="personId"
          label="Person"
          rules={[{ required: true, message: "Please enter the car price" }]}
        >
          <Select
            placeholder="Select a Person"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
