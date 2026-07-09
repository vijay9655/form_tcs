import React, { useState } from 'react';
import { Form, Select, Button, Space, Card, InputNumber, Result, message, Divider, Alert, Row, Col } from 'antd';
import { IdcardOutlined, QuestionCircleOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const { Option } = Select;
const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';

const TRIGGER_QUESTION_VALUES = [
  "Punctuval Paramasivam", 
  "question_2",
  "vijay",
  "alex",
  "jordan",
  "taylor",
];

const DynamicAntdForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const watchedQuestion = Form.useWatch('question', form);
  const isTriggerQuestion = TRIGGER_QUESTION_VALUES.includes(watchedQuestion);

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
        await fetch(MOCK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employee_id: Number(values.employeeId),
            name: values.primaryName || null,
            question: values.question,
            name1: values.name1 || null,
            name2: values.name2 || null,
          }),
        });

        fireConfetti();
        setIsSubmitted(true);
        form.resetFields();
      }
    } catch (error) {
      message.error('System Error: Communication with the corporate core failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFormView = () => {
    setIsSubmitted(false);
    setIsExistingUser(false);
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

  if (isSubmitted) {
    return (
      <div style={{ 
        background: 'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)', 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <Card
          bordered={false}
          style={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 24,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.18)",
            textAlign: 'center',
            padding: '20px 10px'
          }}
        >
          <Result
            status="success"
            title={<span style={{ color: '#002140', fontWeight: 700 }}>Your response has been submitted successfully!</span>}
            subTitle={
              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#52c41a', margin: '0 0 4px 0' }}>Thank you</p>
                <p style={{ margin: 0, color: '#6d7a86' }}>Internal operations metrics records updated.</p>
              </div>
            }
            extra={[
              <Button 
                type="primary" 
                key="console" 
                size="large"
                onClick={handleResetFormView}
                style={{ borderRadius: '8px', background: '#1677ff', fontWeight: 600 }}
              >
                Submit Another Response
              </Button>
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)', 
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
          width: "100%",
          maxWidth: 700,
          borderRadius: 24,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.4)"
        }}
      >
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
              <QuestionCircleOutlined /> Assessment :
            </h3>

            <Form.Item
              name="question"
              label={<span style={{ fontWeight: 600 }}>Select Category</span>}
              rules={[{ required: true, message: 'Category allocation mandatory.' }]}
            >
              <Select {...searchSelectProps} size="large" style={{ borderRadius: '6px', width: '100%' }}>
                <Option value="Punctuval Paramasivam">Punctuval Paramasivam</Option>
                <Option value="Kadala Muthu">Kadala Muthu</Option>
                <Option value="Cool DUDE">Cool DUDE</Option>
              </Select>
            </Form.Item>

            {!isTriggerQuestion && (  
              <Form.Item
                name="primaryName"
                label={<span style={{ fontWeight: 600 }}>Assigned Team Member</span>}
                rules={[{ required: true, message: 'Profile reference selection mandatory.' }]}
              >
                <Select {...searchSelectProps} prefix={<UserOutlined />} size="large" style={{ width: '100%' }}>
                  <Option value="pragnitha">pragnitha</Option>
                  <Option value="sakthima">sakthima</Option>
                  <Option value="nivetha">nivetha</Option>
                  <Option value="akilandeshwari">akilandeshwari</Option>
                </Select>
              </Form.Item>
            )}
          </div>

          {/* Section 3: Dynamic Contextual Area */}
          {isTriggerQuestion && (
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
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Team Member 1</span>}
                    rules={[{ required: true, message: 'Required.' }]}
                  >
                    <Select {...searchSelectProps} size="large" style={{ width: '100%' }}>
                      <Option value="pragnitha">pragnitha</Option>
                      <Option value="sakthima">sakthima</Option>
                      <Option value="nivetha">nivetha</Option>
                      <Option value="akilandeshwari">akilandeshwari</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name2"
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Team Member 2</span>}
                    dependencies={['name1']} // Tells AntD to watch changes in 'name1'
                    rules={[
                      { required: true, message: 'Required.' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('name1') !== value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Team Member 1 and Team Member 2 cannot be the same person.'));
                        },
                      }),
                    ]}
                  >
                    <Select {...searchSelectProps} size="large" style={{ width: '100%' }}>
                      <Option value="pragnitha">pragnitha</Option>
                      <Option value="sakthima">sakthima</Option>
                      <Option value="nivetha">nivetha</Option>
                      <Option value="akilandeshwari">akilandeshwari</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}

          <Divider style={{ margin: '24px 0', borderColor: 'rgba(0, 58, 140, 0.1)' }} />

          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }} size="middle" className="form-action-space">
              <Button htmlType="button" disabled={loading} onClick={() => form.resetFields()} size="large" style={{ borderRadius: '6px', minWidth: '100px' }} className="responsive-btn">
                Clear
              </Button>
              <Button type="primary" htmlType="submit" size="large" loading={loading} style={{ width: "100%", height: 50, borderRadius: 12, background: "linear-gradient(90deg,#1677ff,#69b1ff)", border: 0, fontWeight: 700, fontSize: 16 }}>
                Submit Evaluation
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <style>{`
        @media (max-width: 480px) {
          .form-action-space { width: 100% !important; }
          .form-action-space .ant-space-item { flex: 1; }
          .responsive-btn { width: 100% !important; min-width: unset !important; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default DynamicAntdForm;