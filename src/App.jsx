import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import DownloadPage from './DownloadPage'; // Import the new download component
import DynamicAntdForm from './component/DynamicAntdForm';
import SurveyResults from './SurveyResults';

const { Header, Content, Footer } = Layout;

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '100px' }}>
    <h1>Welcome to the Employee Portal</h1>
    <p>Please use the navigation bar above to apply or download reports.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        {/* <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="apply">
              <Link to="/apply">Application Form</Link>
            </Menu.Item>
            <Menu.Item key="download">
              <Link to="/download">Download Excel</Link>
            </Menu.Item>
          </Menu>
        </Header> */}
        
       
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<DynamicAntdForm />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/survay" element={<SurveyResults />} />

          </Routes>
        
        
        <Footer style={{ textAlign: 'center' }}>Employee Registry ©2026</Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;