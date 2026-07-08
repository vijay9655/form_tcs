import React, { useState } from 'react';
import { Form, Select, Button, Space, Card, InputNumber, Result, message } from 'antd';

const { Option } = Select;

const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';

const DynamicAntdForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Watch the 'question' field to update the UI dynamically
  const watchedQuestion = Form.useWatch('question', form);
  const TRIGGER_QUESTION_VALUE = 'question_2';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 1. Fetch existing users to check if the Employee ID exists
      const getResponse = await fetch(MOCK_API_URL);
      if (!getResponse.ok) throw new Error('Failed to fetch existing data.');
      
      const existingUsers = await getResponse.json();
      
      // FIX 1: Match incoming input directly against the backend's 'employee_id' field
      const idExists = existingUsers.some(user => Number(user.employee_id) === Number(values.employeeId));

      if (idExists) {
        // 2. If it exists, switch the view to the blocker screen
        setIsExistingUser(true);
        message.error(`Registration failed: Employee ID ${values.employeeId} already exists.`);
      } else {
        // 3. If it doesn't exist, POST the new data record to the MockAPI endpoint
        const postResponse = await fetch(MOCK_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // FIX 2: map 'employeeId' explicitly to 'employee_id' so the endpoint registers it correctly
          body: JSON.stringify({
            employee_id: Number(values.employeeId),
            name: values.primaryName,
            question: values.question,
            name1: values.name1 || null,
            name2: values.name2 || null,
          }),
        });

        if (!postResponse.ok) throw new Error('Failed to submit form data.');

        message.success('Form data successfully saved to the server!');
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred during server communication.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetView = () => {
    setIsExistingUser(false);
    form.setFieldValue('employeeId', null); 
  };

  // Shared configuration for searchable selects
  const searchSelectProps = {
    showSearch: true,
    placeholder: "Select an option",
    optionFilterProp: "children",
    filterOption: (input, option) =>
      (option?.children ?? '').toLowerCase().includes(input.toLowerCase()),
  };

  // SCREEN 1: Rendered if the user already exists
  if (isExistingUser) {
    return (
      <div style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
        <Result
          status="warning"
          title="User Already Exists"
          subTitle="The Employee ID you entered is already registered in our system."
          extra={
            <Button type="primary" onClick={handleResetView}>
              Try a Different ID
            </Button>
          }
        />
      </div>
    );
  }

  // SCREEN 2: Standard Form layout
  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <Card title="Form" bordered={true}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Mandatory Employee ID (Number) */}
          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[
              { required: true, message: 'Employee ID is mandatory!' },
              { type: 'number', message: 'Please enter a valid number!' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="e.g., 40 (Type 40, 11, or 74 to test duplicate blocking)" 
            />
          </Form.Item>

          {/* 1. Questions Dropdown */}
          <Form.Item
            name="question"
            label="Select a Question"
            rules={[{ required: true, message: 'Please select a question!' }]}
          >
            <Select {...searchSelectProps} placeholder="Choose a question from the list">
              <Option value="question_1">Question 1: What is your primary goal?</Option>
              <Option value="question_2">Question 2: (Triggers Name 1 & Name 2 requirements)</Option>
              <Option value="question_3">Question 3: How did you hear about us?</Option>
            </Select>
          </Form.Item>

          {/* Standard Name Dropdown */}
          <Form.Item
            name="primaryName"
            label="Primary Name Choice"
            rules={[{ required: true, message: 'Please select a primary name!' }]}
          >
            <Select {...searchSelectProps} placeholder="Select a name option">
              <Option value="alex">Alex</Option>
              <Option value="jordan">Jordan</Option>
              <Option value="taylor">Taylor</Option>
            </Select>
          </Form.Item>

          {/* Dynamic Fields for Question 2 */}
          {watchedQuestion === TRIGGER_QUESTION_VALUE && (
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '24px' }}>
              <p style={{ fontWeight: 'bold', color: '#1677ff', marginTop: 0 }}>
                Additional Required Fields for Question 2:
              </p>
              
              <Form.Item
                name="name1"
                label="Name 1"
                rules={[{ required: true, message: 'Name 1 is mandatory for this question!' }]}
              >
                <Select {...searchSelectProps} placeholder="Select option for Name 1">
                  <Option value="option_a">Option A</Option>
                  <Option value="option_b">Option B</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="name2"
                label="Name 2"
                rules={[{ required: true, message: 'Name 2 is mandatory for this question!' }]}
              >
                <Select {...searchSelectProps} placeholder="Select option for Name 2">
                  <Option value="option_x">Option X</Option>
                  <Option value="option_y">Option Y</Option>
                </Select>
              </Form.Item>
            </div>
          )}

          {/* Action Buttons */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit Form
              </Button>
              <Button htmlType="button" disabled={loading} onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DynamicAntdForm;