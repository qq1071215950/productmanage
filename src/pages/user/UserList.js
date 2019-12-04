import React from 'react';
import {Form, Col, Row, Table, Divider, Tag, Pagination, Input, Select, Button } from 'antd';
import UserEdit from "./UserEdit";
import { connect } from 'dva';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        // render: tags => (
        //     <span>
        // {tags.map(tag => {
        //     let color = tag.length > 5 ? 'geekblue' : 'green';
        //     if (tag === 'loser') {
        //         color = 'volcano';
        //     }
        //     return (
        //         <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //         </Tag>
        //     );
        // })}
      // </span>
      //   ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <UserEdit record={record}/>
            </span>
        ),
    },
];
const FormItem = Form.Item;
// 1申明form表单,使其自动注入this.pros中
// mock数据 1引入connect 2 定义model 3 定义@connect的两个接口函数state  4 命名空间
const namespace = 'userList';
const mapStateToProps = (state) =>{
    const data = state[namespace].data;
    const total = state[namespace].total;
    const pageSzie = state[namespace].pageSize;
    const currentPage = state[namespace].currentPage;
    return {
        data, total, pageSzie, currentPage
    }
};
const mapDispatchToProps = (dispatch) =>{
    return {
        initData:(params) => {
            dispatch({
                type: namespace+'/initData',
                payload: params
            })
        }
    }
};
@connect(mapStateToProps,mapDispatchToProps)
@Form.create()
class UserList extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const params = {
            pageSzie: 5,
            currentPage: 1,
            name: null,
            phone: null,
            email: null
        };
        this.props.initData(params);
    }

    // 查询  获取form对象，对数据进行验证以及其他的操作，发起请求或者调用请求的函数
    handleSearch = e =>{
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, fieldsValue) =>{
            // 构造查询条件
            const values = {
                ...fieldsValue,
                currPage: 1,
                pageSize: 10
            };
            // 进行查询操作
            this.props.initData(values);
        });

    };
    render() {
        // 2申明getFieldDecorator，对form的数据自动注册绑定
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <h2>用户列表</h2>
                <Form onSubmit={this.handleSearch} layout="inline">
                    <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                        <Col md={6} sm={24}>
                            <FormItem label="">
                                {getFieldDecorator('name')(<Input placeholder="姓名" />)}
                            </FormItem>
                        </Col>
                        <Col md={6} sm={24}>
                            <FormItem label="">
                                {getFieldDecorator('phone')(<Input placeholder="电话" />)}
                            </FormItem>
                        </Col>
                        <Col md={6} sm={24}>
                            <FormItem label="">
                                {getFieldDecorator('email')(<Input placeholder="邮箱" />)}
                            </FormItem>
                        </Col>
                        <Col md={6} sm={24}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Table columns={columns} dataSource={this.props.data} bordered={true} style={{marginTop: 16}}
                       pagination={{position:"bottom",total:9,
                           pageSize:5, defaultCurrent:1,showQuickJumper:"ReactNode " }}/>
            </div>
        );
    }
}
export default UserList;
