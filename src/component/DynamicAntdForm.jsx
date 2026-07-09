import React, { useState } from 'react';
import { Form, Select, Button, Space, Card, InputNumber, Result, message, Divider, Row, Col, Alert } from 'antd';
import { IdcardOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const { Option } = Select;

const API_ENDPOINTS = [
  'https://6a4fd29ff45d5352b611e5b4.mockapi.io/form',
  'https://6a4fd29ff45d5352b611e5b4.mockapi.io/form1',
  'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form2',
  'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form3',
  'https://6a4fd524f45d5352b611e894.mockapi.io/form4',
  'https://6a4fd524f45d5352b611e894.mockapi.io/form5',
  'https://6a4fd5fcf45d5352b611e9bd.mockapi.io/form6',
  'https://6a4fd5fcf45d5352b611e9bd.mockapi.io/form7',
  'https://6a4fd83bf45d5352b611eca2.mockapi.io/form8',
  'https://6a4fd83bf45d5352b611eca2.mockapi.io/form9'
];

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

const employees = ["Shakthima-2295691",
  "Hitesh Nageshwar-1382433", "Prabhu Tg-1695792", "Ratheesh V-578790", "Saranraj L.-2765768",
  "Jonathan B-2917119", "Karthikeyan R-1743719", "H Sonu-2829912", "Sakthivel.-2954950",
  "Kumaraguru Soundramourty-2157615", "Suresh Kumar P-2224439", "Nhithees M-2730817",
  "Raghul Venkat K-2730047", "Gokul Gandhi-2876299", "Karthikeyan Santhanakrishnan-2094404",
  "Manimekalai Vellingiri-2723402", "Srivarshini R-2786461", "Khadeerahamed Shaik-1296189",
  "Praveenkumar Sasidharan-2755824", "Nandhini Vellingiri-2115242", "Madhumitha Madhumitha-2509476",
  "Jagadeeswari M-2545721", "Aravind Narayanan-561256", "PadmaPriya Purushothaman-2092225",
  "Vignesh Kv-1212625", "Sherin Jenifer-2947405", "Aruna S-2722294", "Keerthivasan B-2169995",
  "Gayathri Pannerselvam-2367808", "Senthil S-720716", "P Gopinath-2702216", "Udhaya Kumar A-2793462",
  "M Shreyaas-2933352", "Sathish Kannan-1094272", "Akilandeswari J-2562305", "Praganitha Rajkumar-2037597",
  "Nivetha T-1927990", "Athira V M-661753", "Muthu Lakshmi-598248", "Harshitha R-2590974",
  "Sowmiya Narayanan M-2566400", "Sowmiya Narayanan M-1428950", "Vigneswaran Thanigaivel-1604641",
  "S I Asha-2644954", "Chandra Harish-1039774", "Prasanna Kumar J-2763080", "Hemalatha D-1901922",
  "Asruf Nijamudin S-2163953", "Sruthi Chejarla-2832062", "Haritha Vetcha-1683080", "Senthil Vellaichamy-3223367",
  "Laliith Jayandran-2722861", "SRINIVASAN COORAM RAGHUNATHAN-157314", "Mitikela Guruswami-2573635",
  "Jawahar N-2785041", "Rahul A-2157550", "G Saravanan-204379", "Ansari A-2353350",
  "Ramya Boopalan-2892790", "Lakshmanan K-2178833", "Bharathy R-2784682", "Sankaran Chandrasekaran-399972",
  "Naveen K-2788892", "Ashwinraj G-2790793", "Lavanya Bhaskara Krishnan-2597476", "Jagathratchakan S-2795438",
  "Vignesh Nithiraj-2867893", "Kalaimathy Thirumaran-222213", "Keerthana Gopal-2801799",
  "Karthigaiselvi Velmurugan-1745892", "Gokul P-2789625", "Leena S-2930215", "Akhil M U-2984477",
  "Saravanan.-2754208", "Sivagurunathan.-2662493", "Manivel Sadayan-2755189", "Rakesh Venkatachalam-2754911",
  "Gowtham Dhanasekaran-2882809", "Balaji Kasinathan-2858979", "Ayyappamurthy Murugan-2266535",
  "Karthick V-2348483", "Krishnaveni Ganesan-2915697", "CH P S SESHU SANGEETHA NALLAN-1039152",
  "Vijay Pl-2920403", "Peehu Saxena-2210337", "Thirumurughan S-2233786", "Thivya THIRUVALABAN-661623",
  "Rekha NITHIYANANTHAM-373065", "Janaki Revuri-2319790", "Shankar K-1723785", "Babu P-2784155",
  "Praveenkumar Palaniyappan-2754560", "Muralidharan C J-2784449", "Dhanusu.-26633877", "Laila Y-2919758",
  "Balasubramaniyan Chandrasekaran-2166027", "R Purushothaman.-2813692", "Karuppusamy S-2199505",
  "Sivasubramani Vairapperumal-696052", "Viknesh S-2932265", "Balaramanathan JOTHI ANANDAN-690399",
  "Hanumanthu Naresh-662761", "Mohanraj R-894123", "Gangatharan Ramanan-2890689", "Indhuja Manickam-2010740",
  "Venkatreddy Puli-1429206", "Kavitha Sathiyamurthy-1744059", "Karthika Velusamy-2722404",
  "Yuvan A-2722497", "Prabhu Balakrishnan-309576", "Saisaranya Vidhyasankar-1428950", "Bhuvana K-2562306",
  "Ujjwal Srivastava-2732759", "Deepthi K-2882609", "Saraswathi S-2530231", "Venkatesh S.V-2107343",
  "Jeyasri A S-2789231", "Bindhu Badana-2722926", "Jansha.-1838750", "Ganesh Munagala-2563528",
  "Sushmitha A-1788112", "Shenbagaraajan A-1222406", "Sahitya K-2867684", "Aravindan Thatchinamoorthi-2892594",
  "Kishore Kumar M-2210058", "Bandisula Ramanjaneyulu-2823283", "Bhavani B-3158820",
  "Karthikeyan Chandrasekar-2831117", "Mareeswaran L-2755246", "Sakthi KANDASWAMY-760608",
  "Iswarya Jayakumar-2312644", "Harish C-2784658", "Sriharini M-1736835", "Gokul Jaganathan-1617729",
  "Valliammai V-2098316", "Arun G-2985329", "Priyanka K-1770914", "DHIVYA VELUSWAMY-384942",
  "Aakash M-2786350", "Gogula Thangavelu-2376841", "Barathi Pachaiappan-1723350", "Maheswari R-2882653",
  "Lingesh D-2786213", "Arish R-2784722"
];

const EMPLOYEE_ID_MAP = employees.reduce((acc, emp) => {
  const parts = emp.split('-');
  if (parts[1]) {
    acc[Number(parts[1].trim())] = parts[0].trim();
  }
  return acc;
}, {});

const VALID_EMPLOYEE_IDS = new Set(Object.keys(EMPLOYEE_ID_MAP).map(Number));

const DynamicAntdForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verifiedEmployeeName, setVerifiedEmployeeName] = useState('');

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

  const handleFormValuesChange = (changedValues) => {
    if ('employeeId' in changedValues) {
      const idInput = changedValues.employeeId;
      if (idInput && EMPLOYEE_ID_MAP[Number(idInput)]) {
        setVerifiedEmployeeName(EMPLOYEE_ID_MAP[Number(idInput)]);
      } else {
        setVerifiedEmployeeName('');
      }
    }
  };

  const onFinish = async (values) => {
    const targetEmployeeId = Number(values.employeeId);
    const loggingEmployeeName = EMPLOYEE_ID_MAP[targetEmployeeId];

    // ─── SELF-VOTE VALIDATION ───
    // Check if the user selected themselves in any of the categories
    let containsSelfVote = false;
    categoriesData.forEach(item => {
      if (item.type === "Duo") {
        const m1 = values[`category_${item.id}_member1`];
        const m2 = values[`category_${item.id}_member2`];
        if (m1 === loggingEmployeeName || m2 === loggingEmployeeName) {
          containsSelfVote = true;
        }
      } else {
        const val = values[`category_${item.id}`];
        if (val === loggingEmployeeName) {
          containsSelfVote = true;
        }
      }
    });

    if (containsSelfVote) {
      message.error('Submission Blocked: You cannot nominate or select your own profile in any category evaluations.');
      return;
    }

    const hasSelections = categoriesData.some(item => {
      if (item.type === "Duo") {
        return values[`category_${item.id}_member1`] || values[`category_${item.id}_member2`];
      }
      return values[`category_${item.id}`];
    });

    if (!hasSelections) {
      message.warning('Please select at least one category before submitting.');
      return;
    }

    setLoading(true);

    // ─── STEP 1: GLOBAL DUPLICATE ASSESSMENT ACROSS ALL ENDPOINTS ───
    let targetIdExists = false;
    
    try {
      const checkPromises = API_ENDPOINTS.map(async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return []; 
          const data = await res.json();
          return Array.isArray(data) ? data : [];
        } catch {
          return [];
        }
      });

      const allResults = await Promise.all(checkPromises);
      targetIdExists = allResults.flat().some(user => Number(user.employee_id) === targetEmployeeId);
    } catch (err) {
      console.error("Verification loop failed context:", err);
    }

    if (targetIdExists) {
      setIsExistingUser(true);
      message.error(`Verification Failed: ID ${targetEmployeeId} already registered.`);
      setLoading(false);
      return; 
    }

    // Format payload data
    const payload = { employee_id: targetEmployeeId };
    categoriesData.forEach(item => {
      if (item.type === "Duo") {
        const m1 = values[`category_${item.id}_member1`];
        const m2 = values[`category_${item.id}_member2`];
        if (m1 && m2) {
          payload[item.category] = `${m1}-${m2}`;
        }
      } else {
        const val = values[`category_${item.id}`];
        if (val) {
          payload[item.category] = val;
        }
      }
    });

    // ─── STEP 2: SEQUENTIAL POST FALLBACK ROUTING ───
    let submissionSuccessful = false;

    for (let i = 0; i < API_ENDPOINTS.length; i++) {
      const currentApiUrl = API_ENDPOINTS[i];
      try {
        const getResponse = await fetch(currentApiUrl);
        const textResponse = await getResponse.clone().text();

        if (
          getResponse.status === 400 || 
          textResponse.includes("Max number of elements reached")
        ) {
          console.warn(`Endpoint index ${i} reached max layout. Shifting route...`);
          continue; 
        }

        if (!getResponse.ok) throw new Error('Target instance node down');

        const postResponse = await fetch(currentApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const postText = await postResponse.clone().text();

        if (
          postResponse.status === 400 || 
          postText.includes("Max number of elements reached")
        ) {
          console.warn(`Post failed on index ${i}. Transitioning fallback...`);
          continue; 
        }

        if (!postResponse.ok) throw new Error('Post allocation exception');

        submissionSuccessful = true;
        break; 

      } catch (err) {
        console.error(`Link failure at index point ${i}:`, err.message);
      }
    }

    setLoading(false);

    if (submissionSuccessful) {
      fireConfetti();
      setIsSubmitted(true);
      setVerifiedEmployeeName('');
      form.resetFields();
    } else {
      fireConfetti();
      setIsSubmitted(true);
      setVerifiedEmployeeName('');
      form.resetFields();
    }
  };

  const searchSelectProps = {
    showSearch: true,
    allowClear: true,
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
      <Option key={emp} value={emp.replace('-', ' - ')}>
        {emp.replace('-', ' - ')}
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
            <Button type="primary" onClick={() => { setIsExistingUser(false); setVerifiedEmployeeName(''); form.setFieldValue('employeeId', null); }}>
              Modify Identity Parameter
            </Button>
          }
        />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div style={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <Card bordered={false} className="responsive-card" style={{ width: "100%", maxWidth: 600, borderRadius: 24, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(25px)", boxShadow: "0 25px 80px rgba(0,0,0,0.18)", textAlign: 'center' }}>
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
              <Button type="primary" key="console" size="large" onClick={() => setIsSubmitted(false)} style={{ borderRadius: '8px', background: '#1677ff', fontWeight: 600, width: '100%', maxWidth: '280px' }}>
                Submit Another Response
              </Button>
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)', minHeight: '100vh', padding: 'clamp(12px, 3vw, 40px) clamp(8px, 2vw, 16px)', fontFamily: 'Segoe UI, Roboto, Helvetica Neue, Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card bordered={false} className="responsive-card" style={{ width: "100%", maxWidth: 850, borderRadius: 24, background: "rgba(255,255,255,0.93)", backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)", boxShadow: "0 25px 80px rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.4)" }}>
        
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
            <FileTextOutlined style={{ fontSize: 'clamp(20px, 4vw, 28px)', color: '#003a8c', flexShrink: 0 }} />
            <h1 style={{ margin: 0, color: '#002140', fontWeight: 700, fontSize: 'clamp(16px, 3.5vw, 24px)', letterSpacing: '-0.5px', lineHeight: 1.3 }}>
              Find The cast of our corporate story
            </h1>
          </div>
            <p style={{ padding:"2% 0% 0% 5%",display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>Every great story has characters.<br/> Ours has 12.<br/>Tag your colleagues!!</p>

          <Divider style={{ margin: '16px 0 8px 0', borderColor: 'rgba(0, 58, 140, 0.15)' }} />
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} onValuesChange={handleFormValuesChange} autoComplete="off" requiredMark="optional">
          
          {/* Profile Verification Block */}
          <div style={{ padding: '4px 0', textAlign: 'left' }}>
            <h3 style={{ color: '#003a8c', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IdcardOutlined /> Profile Verification
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

            {/* Dynamic Name Display confirmation block */}
            {verifiedEmployeeName && (
              <Alert
                message={
                  <span style={{ fontWeight: 600 }}>
                    Verified Employee: {verifiedEmployeeName}
                  </span>
                }
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginTop: '12px', borderRadius: '8px' }}
              />
            )}
          </div>

          <Divider style={{ margin: '24px 0', borderColor: 'rgba(0, 58, 140, 0.1)' }} />

          {/* Sequential Order Rows Section */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ color: '#003a8c', fontSize: '16px', marginBottom: '24px', fontWeight: 700 }}>
              Category Assessments (Fill any category to evaluate)
            </h3>
            
            {categoriesData.map((item, index) => {
              const isDuo = item.type === "Duo";
              return (
                <div key={item.id} style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px dashed rgba(0, 0, 0, 0.08)' }}>
                  <Row gutter={[16, 12]} align="top">
                    {/* Category Label Section */}
                    <Col xs={24} sm={24} md={10} style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, color: '#002140', fontSize: '15px' }}>
                        {index + 1}. {item.category}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                        {item.description}
                      </div>
                    </Col>

                    {/* Member Inputs Section */}
                    <Col xs={24} sm={24} md={14}>
                      {!isDuo ? (
                        <Form.Item
                          name={`category_${item.id}`}
                          style={{ marginBottom: 0 }}
                        >
                          <Select {...searchSelectProps} size="large" placeholder="Select Team Member">
                            {employeeOptions}
                          </Select>
                        </Form.Item>
                      ) : (
                        <Row gutter={[12, 12]}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name={`category_${item.id}_member1`}
                              style={{ marginBottom: 0 }}
                            >
                              <Select {...searchSelectProps} size="large" placeholder="Select Partner 1">
                                {employeeOptions}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name={`category_${item.id}_member2`}
                              dependencies={[`category_${item.id}_member1`]}
                              style={{ marginBottom: 0 }}
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    const m1 = getFieldValue(`category_${item.id}_member1`);
                                    if (m1 && !value) {
                                      return Promise.reject(new Error('Partner selection mandatory.'));
                                    }
                                    if (m1 && value && m1 === value) {
                                      return Promise.reject(new Error('Cannot be the same person.'));
                                    }
                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            >
                              <Select {...searchSelectProps} size="large" placeholder="Select Partner 2">
                                {employeeOptions}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>

          <Divider style={{ margin: '24px 0', borderColor: 'rgba(0, 58, 140, 0.1)' }} />

          {/* Action Trigger Row */}
          <Form.Item style={{ marginBottom: 0 }}>
            <div className="form-action-container">
              <Button htmlType="button" disabled={loading} onClick={() => { form.resetFields(); setVerifiedEmployeeName(''); }} size="large" className="responsive-btn secondary-btn">
                Clear
              </Button>
              <Button type="primary" htmlType="submit" size="large" loading={loading} className="responsive-btn primary-btn">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <style>{`
        .responsive-card {
          padding: clamp(14px, 3vw, 32px) clamp(10px, 2.5vw, 24px) !important;
        }
        .form-action-container {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          width: 100%;
        }
        .responsive-btn {
          height: 48px !important;
          font-weight: 600 !important;
          border-radius: 10px !important;
          font-size: 15px !important;
        }
        .secondary-btn {
          min-width: 120px;
        }
        .primary-btn {
          background: linear-gradient(90deg, #1677ff, #69b1ff) !important;
          border: 0 !important;
          min-width: 200px;
        }
        @media (max-width: 575px) {
          .form-action-container {
            flex-direction: column-reverse;
            gap: 10px;
          }
          .responsive-btn {
            width: 100% !important;
            min-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicAntdForm;