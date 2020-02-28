import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const studentRoutes: RouteConfig = {
  path: '/student',
  component: Layout,
  redirect: '/student/student-info',
  name: 'Student',
  meta: {
    title: 'student',
    icon: 'student'
  },
  children: [
    {
      path: 'student-info',
      component: () => import(/* webpackChunkName: "student-info" */ '@/views/student/student-info.vue'),
      name: 'StudentInfo',
      meta: { title: 'studentInfo', icon: 'documentation' }
    },
    {
      path: 'student-info-upload',
      component: () => import(/* webpackChunkName: "student-info-upload" */ '@/views/student/student-info-upload.vue'),
      name: 'StudentInfoUpload',
      meta: { title: 'studentInfoUpload', icon: 'excel' }
    }
  ]
}

export default studentRoutes
