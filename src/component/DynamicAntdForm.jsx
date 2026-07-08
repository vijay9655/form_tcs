import React, { useState } from 'react';
import { Form, Select, Button, Space, Card, InputNumber, Result, message, Divider, Alert, Row, Col } from 'antd';
import { IdcardOutlined, QuestionCircleOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const { Option } = Select;
const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';

const DynamicAntdForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const watchedQuestion = Form.useWatch('question', form);
  const TRIGGER_QUESTION_VALUE = 'question_2';

  const fireConfetti = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const getResponse = await fetch(MOCK_API_URL);
      if (!getResponse.ok) throw new Error('Failed to fetch data.');
      const existingUsers = await getResponse.json();
      
      const idExists = existingUsers.some(user => Number(user.employee_id) === Number(values.employeeId));

      if (idExists) {
        setIsExistingUser(true);
        message.error(`Verification Failed: ID ${values.employeeId} already registered.`);
      } else {
        const postResponse = await fetch(MOCK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employee_id: Number(values.employeeId),
            name: values.primaryName,
            question: values.question,
            name1: values.name1 || null,
            name2: values.name2 || null,
          }),
        });

        if (!postResponse.ok) throw new Error('Submission error.');

        fireConfetti();
        message.success('Evaluation submitted successfully to management systems!');
        form.resetFields();
      }
    } catch (error) {
      message.error('System Error: Communication with the corporate core failed.');
    } finally {
      setLoading(false);
    }
  };

  const searchSelectProps = {
    showSearch: true,
    placeholder: "Select from options",
    optionFilterProp: "children",
    filterOption: (input, option) =>
      (option?.children ?? '').toLowerCase().includes(input.toLowerCase()),
  };

  if (isExistingUser) {
    return (
      <div style={{ maxWidth: 650, margin: '40px auto', padding: '0 16px' }}>
        <Result
          status="error"
          title="Duplicate Entry Detected"
          subTitle="Our systems indicate this Employee ID has already generated a response ticket."
          extra={
            <Button type="primary" onClick={() => { setIsExistingUser(false); form.setFieldValue('employeeId', null); }}>
              Modify Identity Parameter
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #001529 0%, #002244 50%, #003a8c 100%)', 
      minHeight: '100vh', 
      padding: 'clamp(16px, 4vw, 40px) 16px',
      fontFamily: 'Segoe UI, Roboto, Helvetica Neue, Arial',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card 
        bordered={false}
        style={{ 
          width: '100%',
          maxWidth: 650, 
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          position: 'relative'
        }}
        styles={{ 
          body: { 
            padding: 'clamp(16px, 5vw, 32px)',
            /* 
              TCS Tech Design Theme:
              Combines a crisp layout background grid with a smooth glowing blue structural flare 
              in the top right corner to echo cloud/enterprise infrastructures.
            */
            backgroundImage: `
              radial-gradient(circle at 90% 10%, rgba(0, 58, 140, 0.07) 0%, rgba(255, 255, 255, 0) 40%),
              linear-gradient(rgba(240, 244, 248, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240, 244, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            backgroundColor: '#ffffff'
          } 
        }}
      >
        {/* Header Block */}
        <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <FileTextOutlined style={{ fontSize: 'clamp(22px, 4vw, 28px)', color: '#003a8c' }} />
            <h2 style={{ margin: 0, color: '#002140', fontWeight: 700, fontSize: 'clamp(18px, 4vw, 24px)', letterSpacing: '-0.5px' }}>
              Team Engagement & Feedback Survey
            </h2>
          </div>
          <p style={{ color: '#6d7a86', marginTop: '6px', fontSize: '14px', marginBottom: 0, fontWeight: 500 }}>
            Internal operations portal for secure project evaluation submission metrics.
          </p>
          <Divider style={{ margin: '16px 0 8px 0', borderColor: 'rgba(0, 58, 140, 0.15)' }} />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark="optional"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Section 1: Identity */}
          <div style={{ padding: '4px 0' }}>
            <h3 style={{ color: '#003a8c', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IdcardOutlined /> Profile Validation
            </h3>
            
            <Form.Item
              name="employeeId"
              label={<span style={{ fontWeight: 600 }}>Official Employee ID</span>}
              rules={[
                { required: true, message: 'Identity key mandatory.' },
                { type: 'number', message: 'Value must register numeric.' }
              ]}
            >
              <InputNumber 
                prefix={<IdcardOutlined style={{ color: '#bfbfbf' }} />}
                style={{ width: '100%', borderRadius: '6px' }} 
                size="large"
                placeholder="Enter assignment identity parameter value (e.g., 40)" 
              />
            </Form.Item>
          </div>

          <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 58, 140, 0.1)' }} />

          {/* Section 2: Question and Names */}
          <div>
            <h3 style={{ color: '#003a8c', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <QuestionCircleOutlined /> Assessment Framework
            </h3>

            <Form.Item
              name="question"
              label={<span style={{ fontWeight: 600 }}>Primary Evaluation Category</span>}
              rules={[{ required: true, message: 'Category allocation mandatory.' }]}
            >
              <Select {...searchSelectProps} size="large" style={{ borderRadius: '6px', width: '100%' }}>
                <Option value="question_1">Operational Milestone Analysis</Option>
                <Option value="question_2">Team Lead & Peer Feedback (Requires sub-assignments)</Option>
                <Option value="question_3">Workplace Culture Assessment</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="primaryName"
              label={<span style={{ fontWeight: 600 }}>Assigned Team Member</span>}
              rules={[{ required: true, message: 'Profile reference selection mandatory.' }]}
            >
              <Select 
                {...searchSelectProps} 
                prefix={<UserOutlined />}
                size="large"
                style={{ width: '100%' }}
              >
                <Option value="alex">Alex Mercer</Option>
                <Option value="jordan">Jordan Vance</Option>
                <Option value="taylor">Taylor Finch</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Section 3: Dynamic Contextual Area (Responsive Row/Col layout) */}
          {watchedQuestion === TRIGGER_QUESTION_VALUE && (
            <div style={{ 
              background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)', 
              padding: 'clamp(12px, 3vw, 20px)', 
              borderRadius: '8px', 
              border: '1px solid #91d5ff',
              marginBottom: '24px',
              marginTop: '16px',
              boxShadow: '0 2px 8px rgba(0, 58, 140, 0.04)'
            }}>
              <Alert
                message="Supplemental Review Requirements Active"
                description="Cross-functional evaluations require valid verified peer assignments."
                type="info"
                showIcon
                style={{ marginBottom: '16px', background: 'transparent', border: 'none', padding: 0 }}
              />
              
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name1"
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Peer Evaluator 1</span>}
                    rules={[{ required: true, message: 'Required.' }]}
                  >
                    <Select {...searchSelectProps} size="large" style={{ width: '100%' }}>
                      <Option value="option_a">Strategic Operations — Team Alpha</Option>
                      <Option value="option_b">Technical Architecture — Team Beta</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name2"
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Peer Evaluator 2</span>}
                    rules={[{ required: true, message: 'Required.' }]}
                  >
                    <Select {...searchSelectProps} size="large" style={{ width: '100%' }}>
                      <Option value="option_x">Delivery Management — Node X</Option>
                      <Option value="option_y">Quality Assurance — Node Y</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}

          <Divider style={{ margin: '24px 0', borderColor: 'rgba(0, 58, 140, 0.1)' }} />

          {/* Action Execution Footer Buttons */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Space 
              style={{ width: '100%', justifyContent: 'flex-end' }} 
              size="middle"
              className="form-action-space"
            >
              <Button 
                htmlType="button" 
                disabled={loading} 
                onClick={() => form.resetFields()}
                size="large"
                style={{ borderRadius: '6px', minWidth: '100px' }}
                className="responsive-btn"
              >
                Clear
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                style={{ borderRadius: '6px', background: '#003a8c', borderColor: '#003a8c', minWidth: '140px', fontWeight: 600 }}
                className="responsive-btn"
              >
                Submit Metric
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Embedded style override snippet to handle extreme CSS edge cases on mobile view ports */}
      <style>{`
        @media (max-width: 480px) {
          .form-action-space {
            width: 100% !important;
          }
          .form-action-space .ant-space-item {
            flex: 1;
          }
          .responsive-btn {
            width: 100% !important;
            min-width: unset !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicAntdForm;