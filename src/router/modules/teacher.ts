import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const teacherRoutes: RouteConfig = {
  path: '/teacher',
  component: Layout,
  redirect: '/teacher/teacher-info',
  name: 'Teacher',
  meta: {
    title: 'teacher',
    icon: 'people'
  },
  children: [
    {
      path: 'teacher-info',
      component: () => import(/* webpackChunkName: "teacher-info" */ '@/views/teacher/teacher-info.vue'),
      name: 'TeacherInfo',
      meta: { title: 'teacherInfo', icon: 'documentation' }
    },
    {
      path: 'teacher-info-upload',
      component: () => import(/* webpackChunkName: "teacher-info-upload" */ '@/views/teacher/teacher-info-upload.vue'),
      name: 'TeacherInfoUpload',
      meta: { title: 'teacherInfoUpload', icon: 'excel' }
    }
  ]
}

export default teacherRoutes
