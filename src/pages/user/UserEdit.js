import React from 'react';
import {Form, Input, Modal, Divider} from 'antd';
import { connect } from 'dva';
const Fragment = React.Fragment;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const formItemLayout = {
    labelCol: {xs: {span: 24}, sm: {span: 7},},
    wrapperCol: {xs: {span: 24}, sm: {span: 12}, md: {span: 10},},
};
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
class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
    }
    showModel = () =>{
        this.setState({
            visible: true
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false
        })
    };
    handleSave = () => {
      const { form, getFieldValue } = this.props.form;
      const id = this.props.record.id;
      const name = getFieldValue("name");
      console.log(name);
      const age = getFieldValue("age");
      console.log(age);
      const address = getFieldValue("address");
      const phone = getFieldValue("phone");
      const email = getFieldValue("email");
      const tags = getFieldValue("tags");
      const params = {id,name,age,address,phone,email,tags};
      this.props.addOrEdit(params);
      this.setState({
          visible: false
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
    deleteUser = () =>{
        const params = this.props.record.id;
        console.log("view"+params);
        this.props.delete(params);
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
        const record = this.props.record;
        const {getFieldDecorator} = this.props.form;
        return (
            <Fragment>
                <a onClick={() => {this.showModel()}}>
                    编辑
                </a>
                <Divider type="vertical" />
                <a onClick={()=>{this.deleteUser()}}>
                    删除
                </a>
                <Modal title={'编辑'} width={640} visible={this.state.visible} onOk={() => {
                    this.handleSave()}} onCancel={() => {this.handleCancel()}} destroyOnClose={true}>
                    <Form hideRequiredMark style={{marginTop: 8}}>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name', {
                                initialValue: record.name,
                                rules: [{
                                    required: true,
                                    message: "此项为必填项"
                                }]})
                            (<Input style={{width: '100%'}} disabled={false}/>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: record.age,
                                rules: [{
                                    required: true,
                                    message: "此项为必填项"}]})
                            (<Input style={{width: '100%'}} disabled={false}/>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="地址">
                            {getFieldDecorator('address', {
                                initialValue: record.address,
                                rules: [{
                                    required: true,
                                    message: "此项为必填项"}]})
                            (<Input style={{width: '100%'}} disabled={false}/>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="电话">
                            {getFieldDecorator('phone', {
                                initialValue: record.phone,
                                rules: [{
                                    required: true,
                                    message: "此项为必填项"}]})
                            (<Input style={{width: '100%'}} disabled={false}/>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                initialValue: record.email,
                                rules: [{
                                    required: true,
                                    message: "此项为必填项"
                                }]})
                            (<Input style={{width: '100%'}} disabled={false}/>)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}
export default UserEdit;