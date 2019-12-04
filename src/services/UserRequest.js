import request from "../util/HttpRequest";

// 查询
export async function queryRequest(params) {
    return request("http://localhost:8080/user/list",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(params)
    });
}
export async function addOrEditRequest(params) {
    return request("http://localhost:8080/user/add",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(params)
    });
}
export async function deleteUserRequest(params) {
    return request("http://localhost:8080/user/delete?"+"id="+params,{
        method: 'get'
    });
}