import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import './MainLayout.less';
import { 
  PullRequestOutlined , 
  UnorderedListOutlined, 
  DeploymentUnitOutlined,
  ProjectOutlined,
  ContainerOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class MainLayout extends PureComponent {
   constructor(props) {
     super(props);
     
      
     this.state = {
        collapsed: false,
     }
   }

   toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

   render() {
    const { children, title, menu } = this.props;
    const { path } = children.props;
    const pathSnippets = path.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{title}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems =  [
                                <Breadcrumb.Item key="home">
                                  <Link to="/home">Home</Link>
                                </Breadcrumb.Item>,
                              ].concat(extraBreadcrumbItems);
    return (<Layout key="mainlayout" className="mainlayout">
    <Header className="header">
      <div className="logo" >
          <span ><h1 style={{ color: '#fff' }}>LOGO</h1></span>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="projects" icon={<DeploymentUnitOutlined />} title="Projects">
              <Menu.Item key="1" >
                  <span>List Project</span>
                  <Link to="/project" />
              </Menu.Item>            
            </SubMenu>
            <SubMenu key="pipeline" icon={<PullRequestOutlined />} title="Pipeline">
              <Menu.Item key="2" >
                  <span>List Pipeline</span>
                  <Link to="/pipeline" />
              </Menu.Item>
            </SubMenu>
            <SubMenu key="laporan" icon={<ContainerOutlined />} title="Laporan">
              <Menu.Item key="3" >
                  <span>Ringkasan Kinerja DJK</span>
                  <Link to="/ringkasan-kinerja" />
              </Menu.Item>
              <Menu.Item key="4" >
                  <span>Sebaran Proyek DJK</span>
                  <Link to="/sebaran-proyek" />
              </Menu.Item>    
              <Menu.Item key="5" >
                  <span>Mandat Carry-Over</span>
                  <Link to="/mandat-co" />
              </Menu.Item>               
              <Menu.Item key="6" >
                  <span>New Client</span>
                  <Link to="/new-client" />
              </Menu.Item>   
              <Menu.Item key="7" >
                  <span>Proses Mandat</span>
                  <Link to="/proses-mandat" />
              </Menu.Item>   
              <Menu.Item key="8" >
                  <span>Pergerakan Pipeline</span>
                  <Link to="/pergerakan-pipeline" />
              </Menu.Item>   
              <Menu.Item key="9" >
                  <span>Permasalahan Proyek</span>
                  <Link to="/permasalahan-proyek" />
              </Menu.Item>   
            </SubMenu>
          </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
            {breadcrumbItems}
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
           {children}
        </Content>
      </Layout>
    </Layout>
</Layout> );
   }
}

export default MainLayout;