import React from 'react';
import {Layout,Menu,Icon,Button} from 'antd';
import Link from 'umi/link';

const {Header,Footer,Sider,Content} = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            collapsed: false,
        }
    }
    render() {
        return (
            <Layout>
                <Sider width={256} style={{minHeight:'100vh', color:'white', textAlign:'center'}}>
                    <div style={{paddingTop: '16px'}}>后端管理系统</div>
                    <div style={{height:'32px', background:'rgba(255,2555,255,.2)',margin:'16px'}}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            <SubMenu key="sub1" title={
                                <span>
                                    <Icon type="user"/>
                                    <span>
                                        用户管理
                                    </span>
                                </span>
                            }>
                                <Menu.Item key="1">
                                    <Link to="/user/add">新增用户</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/user/list">用户列表</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub2" title={
                                <span>
                                    <Icon type="qq"/>
                                    <span>
                                        商品管理
                                    </span>
                                </span>
                            }>
                                <Menu.Item key="3">
                                    <Link to="/product/list">商品列表</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/product/add">添加商品</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub3" title={
                                <span>
                                    <Icon type="desktop"/>
                                    <span>
                                        订单管理
                                    </span>
                                </span>
                            }>
                                <Menu.Item key="5">
                                    <Link to="/order/list">订单列表</Link>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub4" title={
                                <span>
                                    <Icon type="wifi"/>
                                    <span>
                                        权限管理
                                    </span>
                                </span>
                            }>
                                <Menu.Item key="6">
                                    <Link to="/authority/list">权限列表</Link>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Link to="/authority/add">添加权限</Link>
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Content style={{margin: '16px 16px 0'}}>
                        <div style={{padding: '20px', background: '#fff', minHeight: 550}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>后台管理系统</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default BasicLayout;
