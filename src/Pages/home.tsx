import { Layout } from 'antd';
import { css } from '@emotion/css';
import AddArticle from './addDoc';

const Home = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Layout className="site-layout" style={{ marginLeft: 0 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <AddArticle />
        </Content>
        <Footer style={{ textAlign: 'center' }}>markdown test by vv</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
