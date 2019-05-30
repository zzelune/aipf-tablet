export default [
  { path: '/', component: './Home',},
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/console',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/console', redirect: '/console/market/modelmarket', authority: ['admin', 'user'] },
      { 
        path: 'market', 
        name: 'market',
        icon:'smile',
        component:'./Market/Market',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/console/market',
            redirect:'modelmarket',
          },
          {
            path: 'modelmarket',
            name: 'modelmarket',
            component: './Market/ModelMarket',
          },
          {
            path: 'datamarket',
            name: 'datamarket',
            component: './Market/DataMarket',
          }
        ]
      },
      { 
        path: 'automl', 
        name: 'automl',
        icon:'smile',
        component: './AutoML'
      },
      { 
        path: 'datalabeling', 
        name: 'datalabeling',
        icon:'smile',
        component: './DataLabeling'
      },
      { 
        path: 'datamanagement', 
        name: 'datamanagement',
        icon:'smile',
        component: './DataManagement'
      },
      { 
        path: 'devenviron', 
        name: 'devenviron',
        icon:'smile',
        component: './DevEnviron'
      },
      { 
        path: 'sqlflow', 
        name: 'sqlflow',
        icon:'smile',
        component: './SQLFlow'
      },
      { 
        path: 'trainingjobs', 
        name: 'trainingjobs',
        icon:'smile',
        component: './TrainingJobs'
      },
      { 
        path: 'modelmanagement', 
        name: 'modelmanagement',
        icon:'smile',
        component: './ModelManagement'
      },
      { 
        path: 'servicedeployment', 
        name: 'servicedeployment',
        icon:'smile',
        component: './ServiceDeployment'
      },
      { 
        path: 'settings', 
        name: 'settings',
        icon:'smile',
        component: './Settings'
      },
      {
        component: '404',
      },
    ],
  },
];
