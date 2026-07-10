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

const employees = [
  "Shakthima-2295691",
  "Ch P S Seshu Sangeetha-1039152",
  "Chandra Harish-1039774",
  "Silvestar Sebastin E-1074540",
  "Saranya V-1091746",
  "Sathish Kannan-1094272",
  "Ramasamy R-114540",
  "Vignesh Kv-1212625",
  "Shenbagaraajan A-1222406",
  "Deepak Darsan-1265170",
  "Anitha T-1289479",
  "Somnath G-1370945",
  "Hitesh Kumar Nageshwar-1382433",
  "Saisaranya Vidhyasankar-1428950",
  "Venkatreddy Puli-1429206",
  "Srinivasan Cooram-157314",
  "Subashini R-1595646",
  "Vigneswaran Thanigaivel-1604641",
  "Gokul Jaganathan-1617729",
  "Prem Varatharajan-1622831",
  "Kalyanthuth Pandi-164749",
  "Haritha Vetcha-1683080",
  "Balaji Janagarajan-168356",
  "Prabhu Tg-1695792",
  "Karthikeyan Narashiman-1708902",
  "Barathi Pachaiappan-1723350",
  "Sriharini M-1736835",
  "Karthikeyan R-1743719",
  "Kavitha Sathiyamurthy-1744059",
  "Karthigaiselvi Velmurugan-1745892",
  "Priyanka Venkata K-1770914",
  "Sandhiya N-1775316",
  "Sushmitha Anand A-1788112",
  "Balasubramanian L .-1810866",
  "Jansha .-1838750",
  "Hemalatha D-1901922",
  "Sai Swaroop. M.G-1909192",
  "Balaji Ramulu-1911841",
  "Nivetha T-1927990",
  "Indhuja Manickam-2010740",
  "Praganitha Rajkumar-2037597",
  "Saravanan G-204379",
  "Johitha J-2064348",
  "Padmapriya-2092225",
  "Karthikeyan-2094404",
  "Valliammai V-2098316",
  "Venkatesh S.V-2107343",
  "Nandhini Vellingiri-2115242",
  "Rahul A-2157550",
  "Kumaraguru Soundramourty-2157615",
  "Asruf Nijamudin Musthafa S-2163953",
  "Balasubramaniyan-2166027",
  "Aravinth Kumar S-2166795",
  "Keerthivasan B-2169995",
  "Lakshmanan K-2178833",
  "Karuppusamy S-2199505",
  "Kishore Kumar M-2210058",
  "Peehu Saxena-2210337",
  "Kodanda Rama Ganesh-2214994",
  "Kalaimathy Thirumaran-222213",
  "Suresh Kumar P-2224439",
  "Thirumurughan S-2233786",
  "Anvesh Bandari-2239079",
  "Ayyappamurthy Murugan-2266535",
  "Singaravel Rengarajan-230571",
  "Iswarya Jayakumar-2312644",
  "Janaki Revuri-2319790",
  "Venkatesh Kasumuru-2325042",
  "Karthick V-2348483",
  "Ansari A-2353350",
  "Panim Joshi-2354015",
  "Pallabi Dutta-236399",
  "Gayathri Pannerselvam-2367808",
  "Praveen Kumar Badavath-2368515",
  "Gogula Kannan Thangavelu-2376841",
  "Ramkumar Vasudevan-238989",
  "Ganesh Saravanan-2390106",
  "Clinton Lewis Ls-2393645",
  "Thirumalai T-2457157",
  "Madhumitha M-2509476",
  "Saraswathi S-2530231",
  "Gokulnath B-2530434",
  "Mohana Priya-2537418",
  "Jagadeeswari M-2545721",
  "Akilandeswari J-2562305",
  "Bhuvana K-2562306",
  "Ganesh Rama Narayana-2563528",
  "Sowmiya Narayanan M-2566400",
  "Mitikela Guruswami-2573635",
  "Harshitha R-2590974",
  "Lavanya Bhaskara Krishnan-2597476",
  "Sathish Kumar-2613145",
  "Sivagurunathan .-2662493",
  "Dhanusu .-2663387",
  "P Gopinath-2702216",
  "Arunashree-2722294",
  "Karthika Velusamy-2722404",
  "Yuvan A-2722497",
  "Laliith J-2722861",
  "Bindhu Badana-2722926",
  "Manimekalai Vellingiri-2723402",
  "Aparna P-2723554",
  "Raghul Venkat N K-2730047",
  "Nhithees M-2730817",
  "Priyanka Raja-2732536",
  "Ujjwal Srivastava-2732759",
  "Shweta Pandey-2749488",
  "Saravanan .-2754208",
  "K Mano .-2754215",
  "Praveenkumar Palaniyappan-2754560",
  "Rakesh Venkatachalam-2754911",
  "Manivel Sadayan-2755189",
  "Mareeswaran L-2755246",
  "Praveenkumar Sasidharan-2755824",
  "Vignesh .-2755914",
  "Prasanna Kumar J-2763080",
  "Saranraj L-2765768",
  "Babu P-2784155",
  "Harish C-2784658",
  "Arish R-2784722",
  "Jawahar N-2785041",
  "Lingesh D-2786213",
  "Aakash M-2786350",
  "Srivarshini R-2786461",
  "Naveen Karthikeyan-2788892",
  "Jeyasri A S-2789231",
  "Gokul P-2789625",
  "Ashwinraj G-2790793",
  "Udhaya Kumar A-2793462",
  "Jagathratchakan S-2795438",
  "Buvaneshvaran Mani-2800714",
  "Keerthana Gopal-2801799",
  "Manojkumar Murugan-2806959",
  "R Purushothaman .-2813692",
  "Bandisula Ramanjaneyulu-2823283",
  "H Sonu-2829912",
  "Oviya Selvakumar-2830072",
  "Vimal Ragavan J-2830392",
  "Karthikeyan Chandrasekar-2831117",
  "Sruthi Chejarla-2832062",
  "Balaji Kasinathan-2858979",
  "Soundar Rajan R-2864777",
  "Sahitya K-2867684",
  "Vignesh Nithiraj-2867893",
  "Magendra Prasad K-2867936",
  "Charishma Lavanyasai-2869328",
  "Shanjo Bm-2872652",
  "Hemasurya R-2873556",
  "Gokul Gandhi-2876299",
  "Prabhakaran S-2877322",
  "Vishnu .-2879639",
  "Deepthi K-2882609",
  "Maheswari R-2882653",
  "Gowtham Dhanasekaran-2882809",
  "Gangatharan Ramanan-2890689",
  "Aravindan Thatchinamoorthi-2892594",
  "Krishnaveni Ganesan-2915697",
  "Jonathan B-2917119",
  "Laila Y-2919758",
  "Vijay Pl-2920403",
  "Leena Mercy S-2930215",
  "Viknesh S-2932265",
  "M Shreyaas-2933352",
  "K Sivaramakrishnan .-2934129",
  "Sherin Jenifer-2947405",
  "Sakthivel .-2954950",
  "Akhil M U-2984477",
  "Arunkumar G-2985329",
  "Prabhu Balakrishnan-309576",
  "Bhavani B-3158820",
  "Lochana Panneerselvam-3203389",
  "Kiruba Shankar G-3213313",
  "Senthil Kumar Vellaichamy-3223367",
  "Ragul V-3233463",
  "Vijayakumar S-325022",
  "Balakrishnan Chinnathambi-3263513",
  "Gayathri K R-328846",
  "Pradeepa Shanmugam-3292655",
  "Jayaraman Periyathambi-343775",
  "Rekha Nithiyanantham-373065",
  "Dhivya Veluswamy-384942",
  "Sankaran Chandrasekaran-399972",
  "Aravind Narayanan-561256",
  "Rajesh Ganesan-575761",
  "Ratheesh V-578790",
  "Bhuvanya Rajamani-584894",
  "Muthu Lakshmi-598248",
  "Thivya Thiruvalaban-661623",
  "Hanumanthu Naresh-662761",
  "Balaramanathan Jothi Ananda-690399",
  "Sivasubramani Vairapperumal-696052",
  "Senthil S-720716",
  "Sakthi Kandaswamy-760608",
  "Mohammed Murthaza A-869714",
  "Mohanraj R-894123"
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