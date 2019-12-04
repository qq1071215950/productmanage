import { queryRequest, addOrEditRequest, deleteUserRequest } from "../../services/UserRequest";
import {message} from 'antd';
export default {
    namespace: 'userList',
    state: {
        data: [],
        total: null,
        pageSzie: null,
        currentPage: null,
    },
    // 定义数据处理方法 进行数据绑定
    reducers: {
        initUserList(state, {payload:result}) {
            if (result != null) {
                return {
                    data: result.datalist,
                    total: result.total,
                    pageSzie: result.pageSzie,
                    currentPage: result.currentPage
                }
            }
        }

    },

    // 定义请求的方法 得到返回数据
    effects: {
        * initData({payload: params}, { call, put }) {
            const result = yield call(queryRequest,params);
            yield put({
                type: 'initUserList',
                payload:result.data,
            });
            message.success("操作成功");
        },
        * addOrEdit({payload: params}, { call, put }){
            message.success("操作成功");
            yield call(addOrEditRequest,params);
        },
        * delete({payload: params}, {call, put}){
            console.log("model"+params);
            yield call(deleteUserRequest,params);
            message.success("删除成功");
        }

    }
}