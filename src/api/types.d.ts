export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface ITeacherParams {
  no?: string
  name?: string
  gender?: string
  page: number
  limit: number
}

export interface ITeacherData {
  no: string
  email: string
  gender: string
  avatar: string
  phone: string
  state: number
  signUpAt: string
  createdAt: string
}

export interface IStudentParams extends ITeacherParams{
}

export interface IStudentData extends ITeacherData{
}

export interface ISubjectParams {
  desc?: string,
  name?: string,
  page: number
  limit: number
}

export interface ISubjectData {
  name: string,
  desc: string,
  author: string,
  paperCount: number,
  createdAt: string
}

export interface INoticeParams {
  content?: string,
  author?: string,
  page: number
  limit: number
}

export interface IScoreParams {
  no?: string,
  name?: string,
  page: number
  limit: number
}

export interface IPaperParams {
  subject?: string,
  gender?: number,
  name?: string,
  page: number
  limit: number
}

export interface IQuestionParams {
  subject?: string,
  question?: number,
  page: number
  limit: number
}

export interface IDeleteParams {
  _id: string,
}

export interface ICreateOrUpdateNoticeData {
  content: string,
  _id: string
}
export interface ICreateOrUpdateSubjectData {
  name: string,
  desc: string,
  _id: string
}

export interface IDeleteNoticeParams {
  _id: string
}

export interface INoticeItemData {
  content: string,
  author: string,
  createdAt: string,
  _id: string
}

export interface ICreateOrUpdateNoticeResponseData {
  code: number,
  message: string,
  data: string,
}

export interface IPage {
  page: number,
  limit: number
}
