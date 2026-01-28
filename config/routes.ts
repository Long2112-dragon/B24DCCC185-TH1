export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },
  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },
  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/bai-1',
    name: 'Bài 1: Đoán số',
    component: './Bai1',
    icon: 'QuestionCircleOutlined', 
  },
  {
    path: '/bai-2',
    name: 'Bài 2: TodoList',
    component: './Bai2',
    icon: 'CheckSquareOutlined', 
  },
]
 