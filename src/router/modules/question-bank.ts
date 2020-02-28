import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import Panel from '@/views/panel/index.vue'

const questionBankRoutes: RouteConfig = {
  path: '/question-bank',
  component: Layout,
  redirect: '/question-bank/question-bank-single',
  name: 'QuestionBank',
  meta: {
    title: 'questionBank',
    icon: 'questionBank'
  },
  children: [
    {
      path: 'question-bank-single',
      component: Panel,
      // component: () => import(/* webpackChunkName: "question-bank-single" */ '@/views/teacher/teacher-info.vue'),
      redirect: '/question-bank/question-bank-single/question-bank-single-info',
      name: 'questionBankSingle',
      meta: { title: 'questionBankSingle', icon: 'documentation' },
      children: [
        {
          path: 'question-bank-single-info',
          component: () => import(/* webpackChunkName: "question-bank-single-info" */ '@/views/question-bank/question-bank-single/question-bank-single-info.vue'),
          name: 'questionBankSingleInfo',
          meta: { title: 'questionBankSingleInfo', icon: 'excel' }
        },
        {
          path: 'question-bank-single-upload',
          component: () => import(/* webpackChunkName: "question-bank-single-upload" */ '@/views/question-bank/question-bank-single/question-bank-single-upload.vue'),
          name: 'questionBankSingleUpload',
          meta: { title: 'questionBankSingleUpload', icon: 'excel' }
        }
      ]
    },
    {
      path: 'question-bank-multiple',
      component: Panel,
      // component: () => import(/* webpackChunkName: "question-bank-multiple" */ '@/views/teacher/teacher-info.vue'),
      redirect: '/question-bank/question-bank-multiple/question-bank-multiple-info',
      name: 'questionBankMultiple',
      meta: { title: 'questionBankMultiple', icon: 'documentation' },
      children: [
        {
          path: 'question-bank-multiple-info',
          component: () => import(/* webpackChunkName: "question-bank-multiple-info" */ '@/views/question-bank/question-bank-multiple/question-bank-multiple-info.vue'),
          name: 'questionBankMultipleInfo',
          meta: { title: 'questionBankMultipleInfo', icon: 'excel' }
        },
        {
          path: 'question-bank-multiple-upload',
          component: () => import(/* webpackChunkName: "question-bank-multiple-upload" */ '@/views/question-bank/question-bank-multiple/question-bank-multiple-upload.vue'),
          name: 'questionBankMultipleUpload',
          meta: { title: 'questionBankMultipleUpload', icon: 'excel' }
        }
      ]
    },
    {
      path: 'question-bank-judge',
      component: Panel,
      // component: () => import(/* webpackChunkName: "question-bank-single" */ '@/views/teacher/teacher-info.vue'),
      redirect: '/question-bank/question-bank-judge/question-bank-judge-info',
      name: 'questionBankJudge',
      meta: { title: 'questionBankJudge', icon: 'documentation' },
      children: [
        {
          path: 'question-bank-judge-info',
          component: () => import(/* webpackChunkName: "question-bank-judge-info" */ '@/views/question-bank/question-bank-judge/question-bank-judge-info.vue'),
          name: 'questionBankJudgeInfo',
          meta: { title: 'questionBankJudgeInfo', icon: 'excel' }
        },
        {
          path: 'question-bank-judge-upload',
          component: () => import(/* webpackChunkName: "question-bank-judge-upload" */ '@/views/question-bank/question-bank-judge/question-bank-judge-upload.vue'),
          name: 'questionBankJudgeUpload',
          meta: { title: 'questionBankJudgeUpload', icon: 'excel' }
        }
      ]
    },
    {
      path: 'question-bank-completion',
      component: Panel,
      // component: () => import(/* webpackChunkName: "question-bank-completion" */ '@/views/teacher/teacher-info.vue'),
      redirect: '/question-bank/question-bank-completion/question-bank-completion-info',
      name: 'questionBankCompletion',
      meta: { title: 'questionBankCompletion', icon: 'documentation' },
      children: [
        {
          path: 'question-bank-completion-info',
          component: () => import(/* webpackChunkName: "question-bank-completion-info" */ '@/views/question-bank/question-bank-completion/question-bank-completion-info.vue'),
          name: 'questionBankCompletionInfo',
          meta: { title: 'questionBankCompletionInfo', icon: 'excel' }
        },
        {
          path: 'question-bank-completion-upload',
          component: () => import(/* webpackChunkName: "question-bank-completion-upload" */ '@/views/question-bank/question-bank-completion/question-bank-completion-upload.vue'),
          name: 'questionBankCompletionUpload',
          meta: { title: 'questionBankCompletionUpload', icon: 'excel' }
        }
      ]
    },
    {
      path: 'question-bank-afq',
      component: Panel,
      // component: () => import(/* webpackChunkName: "question-bank-completion" */ '@/views/teacher/teacher-info.vue'),
      redirect: '/question-bank/question-bank-afq/question-bank-afq-info',
      name: 'questionBankAFQ',
      meta: { title: 'questionBankAFQ', icon: 'documentation' },
      children: [
        {
          path: 'question-bank-afq-info',
          component: () => import(/* webpackChunkName: "question-bank-afq-info" */ '@/views/question-bank/question-bank-afq/question-bank-afq-info.vue'),
          name: 'questionBankAFQInfo',
          meta: { title: 'questionBankAFQInfo', icon: 'excel' }
        },
        {
          path: 'question-bank-afq-upload',
          component: () => import(/* webpackChunkName: "question-bank-afq-upload" */ '@/views/question-bank/question-bank-afq/question-bank-afq-upload.vue'),
          name: 'questionBankAFQUpload',
          meta: { title: 'questionBankAFQUpload', icon: 'excel' }
        }
      ]
    }
  ]
}

export default questionBankRoutes
