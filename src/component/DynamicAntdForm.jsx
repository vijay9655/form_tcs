import React, { useState } from 'react';
import { Form, Select, Button, Space, Card, InputNumber, Result, message, Divider, Alert, Row, Col } from 'antd';
import { IdcardOutlined, QuestionCircleOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const { Option } = Select;
const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';
const categoriesData = [
  { "id": 1, "category": "Punctual Paramasivam", "description": "Always on time." },
  { "id": 2, "category": "Kadala Muthu Strictu", "description": "Sticks to policies & morals." },
  { "id": 3, "category": "Cool Dude", "description": "Very calm and stylish." },
  { "id": 4, "category": "Karuthu Kandhasamy", "description": "Gives a lot of advice." },
  { "id": 5, "category": "Velainu Vandhutta Vellaikiran", "description": "Very hardworking." },
  { "id": 6, "category": "Loud Lolita", "description": "Talks very strong & bold." },
  { "id": 7, "category": "Mother Teresa", "description": "Helping everyone." },
  { "id": 8, "category": "Mr. Vibe / Mrs. Vibe", "description": "Full of energy and fun." },
  { "id": 9, "category": "Java Sunderasan", "description": "Computer / Tech expert." },
  { "id": 10, "category": "Vaanga Pazhagalam", "description": "Friendly to everyone." },
  { "id": 11, "category": "Goundamani – Senthil", "description": "Best friends at work.", "type": "Duo" },
  { "id": 12, "category": "Anniyan / Ambi / Remo", "description": "Does many things at once (Multitasker)." }
];
const employees = [
  "Hitesh Nageshwar-1382433",
  "Prabhu Tg-1695792",
  "Ratheesh V-578790",
  "Saranraj L.-2765768",
  "Jonathan B-2917119",
  "Karthikeyan R-1743719",
  "H Sonu-2829912",
  "Sakthivel.-2954950",
  "Kumaraguru Soundramourty-2157615",
  "Suresh Kumar P-2224439",
  "Nhithees M-2730817",
  "Raghul Venkat K-2730047",
  "Gokul Gandhi-2876299",
  "Karthikeyan Santhanakrishnan-2094404",
  "Manimekalai Vellingiri-2723402",
  "Srivarshini R-2786461",
  "Khadeerahamed Shaik-1296189",
  "Praveenkumar Sasidharan-2755824",
  "Nandhini Vellingiri-2115242",
  "Madhumitha Madhumitha-2509476",
  "Jagadeeswari M-2545721",
  "Aravind Narayanan-561256",
  "PadmaPriya Purushothaman-2092225",
  "Vignesh Kv-1212625",
  "Sherin Jenifer-2947405",
  "Aruna S-2722294",
  "Keerthivasan B-2169995",
  "Gayathri Pannerselvam-2367808",
  "Senthil S-720716",
  "P Gopinath-2702216",
  "Udhaya Kumar A-2793462",
  "M Shreyaas-2933352",
  "Sathish Kannan-1094272",
  "Akilandeswari J-2562305",
  "Praganitha Rajkumar-2037597",
  "Nivetha T-1927990",
  "Athira V M-661753",
  "Muthu Lakshmi-598248",
  "Harshitha R-2590974",
  "Sowmiya Narayanan M-2566400",
  "Sowmiya Narayanan M-1428950",
  "Vigneswaran Thanigaivel-1604641",
  "S I Asha-2644954",
  "Chandra Harish-1039774",
  "Prasanna Kumar J-2763080",
  "Hemalatha D-1901922",
  "Asruf Nijamudin S-2163953",
  "Sruthi Chejarla-2832062",
  "Haritha Vetcha-1683080",
  "Senthil Vellaichamy-3223367",
  "Laliith Jayandran-2722861",
  "SRINIVASAN COORAM RAGHUNATHAN-157314",
  "Mitikela Guruswami-2573635",
  "Jawahar N-2785041",
  "Rahul A-2157550",
  "G Saravanan-204379",
  "Ansari A-2353350",
  "Ramya Boopalan-2892790",
  "Lakshmanan K-2178833",
  "Bharathy R-2784682",
  "Sankaran Chandrasekaran-399972",
  "Naveen K-2788892",
  "Ashwinraj G-2790793",
  "Lavanya Bhaskara Krishnan-2597476",
  "Jagathratchakan S-2795438",
  "Vignesh Nithiraj-2867893",
  "Kalaimathy Thirumaran-222213",
  "Keerthana Gopal-2801799",
  "Karthigaiselvi Velmurugan-1745892",
  "Gokul P-2789625",
  "Leena S-2930215",
  "Akhil M U-2984477",
  "Saravanan.-2754208",
  "Sivagurunathan.-2662493",
  "Manivel Sadayan-2755189",
  "Rakesh Venkatachalam-2754911",
  "Gowtham Dhanasekaran-2882809",
  "Balaji Kasinathan-2858979",
  "Ayyappamurthy Murugan-2266535",
  "Karthick V-2348483",
  "Krishnaveni Ganesan-2915697",
  "CH P S SESHU SANGEETHA NALLAN-1039152",
  "Vijay Pl-2920403",
  "Peehu Saxena-2210337",
  "Thirumurughan S-2233786",
  "Thivya THIRUVALABAN-661623",
  "Rekha NITHIYANANTHAM-373065",
  "Janaki Revuri-2319790",
  "Shankar K-1723785",
  "Babu P-2784155",
  "Praveenkumar Palaniyappan-2754560",
  "Muralidharan C J-2784449",
  "Dhanusu.-26633877",
  "Laila Y-2919758",
  "Balasubramaniyan Chandrasekaran-2166027",
  "R Purushothaman.-2813692",
  "Karuppusamy S-2199505",
  "Sivasubramani Vairapperumal-696052",
  "Viknesh S-2932265",
  "Balaramanathan JOTHI ANANDAN-690399",
  "Hanumanthu Naresh-662761",
  "Mohanraj R-894123",
  "Gangatharan Ramanan-2890689",
  "Indhuja Manickam-2010740",
  "Venkatreddy Puli-1429206",
  "Kavitha Sathiyamurthy-1744059",
  "Karthika Velusamy-2722404",
  "Yuvan A-2722497",
  "Prabhu Balakrishnan-309576",
  "Saisaranya Vidhyasankar-1428950",
  "Bhuvana K-2562306",
  "Ujjwal Srivastava-2732759",
  "Deepthi K-2882609",
  "Saraswathi S-2530231",
  "Venkatesh S.V-2107343",
  "Jeyasri A S-2789231",
  "Bindhu Badana-2722926",
  "Jansha.-1838750",
  "Ganesh Munagala-2563528",
  "Sushmitha A-1788112",
  "Shenbagaraajan A-1222406",
  "Sahitya K-2867684",
  "Aravindan Thatchinamoorthi-2892594",
  "Kishore Kumar M-2210058",
  "Bandisula Ramanjaneyulu-2823283",
  "Bhavani B-3158820",
  "Karthikeyan Chandrasekar-2831117",
  "Mareeswaran L-2755246",
  "Sakthi KANDASWAMY-760608",
  "Iswarya Jayakumar-2312644",
  "Harish C-2784658",
  "Sriharini M-1736835",
  "Gokul Jaganathan-1617729",
  "Valliammai V-2098316",
  "Arun G-2985329",
  "Priyanka K-1770914",
  "DHIVYA VELUSWAMY-384942",
  "Aakash M-2786350",
  "Gogula Thangavelu-2376841",
  "Barathi Pachaiappan-1723350",
  "Maheswari R-2882653",
  "Lingesh D-2786213",
  "Arish R-2784722"
];

// Extract valid IDs ahead of rendering for quick validation runtime performance
const VALID_EMPLOYEE_IDS = new Set(
  employees.map(emp => {
    const parts = emp.split('-');
    return parts[1] ? Number(parts[1].trim()) : null;
  }).filter(id => id !== null)
);

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
const duoCategories = categoriesData
    .filter(item => item.type === "Duo")
    .map(item => item.category);
const isTriggerQuestion = duoCategories.includes(watchedQuestion);
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
    placeholder: "Select Team Member",
    filterOption: (input, option) => {
      const searchInput = input.toLowerCase();
      const labelMatch = (option?.children ?? '').toLowerCase().includes(searchInput);
      const valueMatch = (option?.value ?? '').toLowerCase().includes(searchInput);
      return labelMatch || valueMatch;
    },
  };

  const employeeOptions = employees.map(emp => {
    const [name] = emp.split('-');
    return (
      <Option key={emp} value={emp}>
        {name}
      </Option>
    );
  });

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
          {/* <p style={{ color: '#6d7a86', marginTop: '6px', fontSize: '14px', marginBottom: 0, fontWeight: 500 }}>
            Internal operations portal for secure project evaluation submission metrics.
          </p> */}
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
                { type: 'number', message: 'Value must register numeric.' },
                () => ({
                  validator(_, value) {
                    if (!value || VALID_EMPLOYEE_IDS.has(Number(value))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Invalid Employee ID. No registration record matches this parameter.'));
                  },
                }),
              ]}
            >
              <InputNumber 
                prefix={<IdcardOutlined style={{ color: '#bfbfbf' }} />}
                style={{ width: '100%', borderRadius: '6px' }} 
                size="large"
                placeholder="Enter Employee ID (e.g., 1382433)" 
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
              <Select{...searchSelectProps} placeholder="Select category" size="large" style={{ borderRadius: '6px', width: '100%' }}>
    {categoriesData.map((item) => (
      <Option key={item.id} value={item.category} title={item.description}>
        {item.category} <span style={{ color: '#bfbfbf', fontSize: '12px', marginLeft: '8px' }}>— {item.description}</span>
      </Option>
    ))}
  </Select>
            </Form.Item>

            {!isTriggerQuestion && (  
              <Form.Item
                name="primaryName"
                label={<span style={{ fontWeight: 600 }}>Assigned Team Member</span>}
                rules={[{ required: true, message: 'Profile reference selection mandatory.' }]}
              >
                <Select {...searchSelectProps} prefix={<UserOutlined />} size="large" style={{ width: '100%' }}>
                  {employeeOptions}
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
              {/* <Alert
                message="Supplemental Review Requirements Active"
                description="Cross-functional evaluations require valid verified peer assignments."
                type="info"
                showIcon
                style={{ marginBottom: '16px', background: 'transparent', border: 'none', padding: 0 }}
              /> */}
              
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name1"
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Team Member 1</span>}
                    rules={[{ required: true, message: 'Required.' }]}
                  >
                    <Select {...searchSelectProps} size="large" style={{ width: '100%' }}>
                      {employeeOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name2"
                    label={<span style={{ fontWeight: 600, color: '#003a8c' }}>Team Member 2</span>}
                    dependencies={['name1']} 
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
                      {employeeOptions}
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