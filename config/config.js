export default {
    plugins:[
        [
            'umi-plugin-react', {
            //暂时不启用任何功能
            dva:true,
            // 开启antd的引用
            antd: true
        }]
    ],
    routes:[
        {
            path: '/',
            component: '../layouts',
            routes: [
                {
                    path: '/user',
                    routes: [
                        {
                            path: '/user/list',
                            component: './user/UserList'
                        },
                        {
                            path: '/user/add',
                            component: './user/UserAdd'
                        }
                    ]
                },
                {
                    path: '/order',
                    routes: [
                        {
                            path: '/order/list',
                            component: './order/OrderList'
                        }
                    ]
                },
                {
                    path: '/product',
                    routes: [
                        {
                            path: '/product/list',
                            component: './product/ProductList'
                        },
                        {
                            path: '/product/add',
                            component: './product/ProductAdd'
                        }
                    ]
                },
                {
                    path: '/authority',
                    routes: [
                        {
                            path: '/authority/list',
                            component: './authority/AuthorityList'
                        },
                        {
                            path: '/authority/add',
                            component: './authority/AuthorityAdd'
                        }
                    ]
                }

            ]
        }
    ]
   /* proxy: {
        '/user/': {
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            pathRewrite: {'^/user/': ''}
        }
     },*/
}