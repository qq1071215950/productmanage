import React from 'react';
import {Form, Col, Row,Input, Button, Card,Divider} from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};
const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};

const Fragment = React.Fragment;
const namespace = 'userList';
const mapStateToProps = () =>{
};
const mapDispatchToProps = (dispatch) =>{
    return {
        delete:(params) => {
            dispatch({
                type: namespace+'/delete',
                payload: params
            })
        },
        initData:(params) => {
            dispatch({
                type: namespace+'/initData',
                payload: params
            })
        },
        addOrEdit:(params) => {
            dispatch({
                type: namespace+'/addOrEdit',
                payload: params
            })
        },
    }
};
@connect(mapStateToProps,mapDispatchToProps)

@Form.create()
class UserAdd extends React.Component{

    // 提交处理
    addUser = () =>{
        const { form } = this.props;
        form.validateFields((err, fieldsValue) =>{
            // 构造查询条件
            if (!err){
                const values = {
                    id:null,
                    ...fieldsValue
                };
                // 进行查询操作
                this.props.addOrEdit(values);
            }
        });
        const param = {
            pageSzie: 5,
            currentPage: 1,
            name: null,
            phone: null,
            email: null
        };
        this.props.initData(param);
    };
    render() {
        const {form: { getFieldDecorator, getFieldValue },} = this.props;
        return (
            <Fragment>
                <h2>添加用户</h2>
                <Form hideRequiredMark style={{marginTop: 8}}>
                    <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: "此项为必填项"
                            }]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="年龄">
                        {getFieldDecorator('age', {

                            rules: [{
                                required: true,
                                message: "此项为必填项"}]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true,
                                message: "此项为必填项"}]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="电话">
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true,
                                message: "此项为必填项"}]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: "此项为必填项"
                            }]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="标签">
                        {getFieldDecorator('tags', {
                            rules: [{
                                required: true,
                                message: "此项为必填项"
                            }]})
                        (<Input style={{width: '100%'}} disabled={false}/>)
                        }
                    </FormItem>
                    <button style={{marginLeft:290, color:'blue'}} onClick={() => {this.addUser()}}>提交</button>
                </Form>
            </Fragment>
        );
    }
}
export default UserAdd;