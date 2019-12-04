import fetch from 'dva/fetch';

// 编写requset 1 函数需要编写将response转成json的形式
// 检查response的状态
// 编写请求函数
function parseJSON(response) {
    return response.json();
}
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({ data }))
        .catch(err => ({ err }));
}

