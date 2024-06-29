import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import { UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName, onButtonClick } = props;
  const [form] = Form.useForm();

  const [, forceUpdate] = useState();

  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    onButtonClick();
  };

  return (
    <Form
      name="update-person-form"
      layout="inline"
      initialValues={{ firstName, lastName }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button danger type="primary" onClick={onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdatePerson;
