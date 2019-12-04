import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../../layouts').default,
    routes: [
      {
        path: '/user',
        routes: [
          {
            path: '/user/list',
            component: require('../user/UserList').default,
            exact: true,
          },
          {
            path: '/user/add',
            component: require('../user/UserAdd').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/order',
        routes: [
          {
            path: '/order/list',
            component: require('../order/OrderList').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/product',
        routes: [
          {
            path: '/product/list',
            component: require('../product/ProductList').default,
            exact: true,
          },
          {
            path: '/product/add',
            component: require('../product/ProductAdd').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/authority',
        routes: [
          {
            path: '/authority/list',
            component: require('../authority/AuthorityList').default,
            exact: true,
          },
          {
            path: '/authority/add',
            component: require('../authority/AuthorityAdd').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/AppSpace/Idea/productmanage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
