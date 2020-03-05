export interface IPage {
  page: number
  limit: number
}

export interface IDeleteParams {
  _id: string
}

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

export interface ITeacherParams extends IPage{
  no?: string
  name?: string
  gender?: string
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

export interface ISubjectParams extends IPage{
  desc?: string
  name?: string
}

export interface ISubjectData {
  name: string
  desc: string
  author: string
  paperCount: number
  createdAt: string
}

export interface INoticeParams extends IPage {
  content?: string
  author?: string
}

export interface IScoreParams extends IPage {
  no?: string
  name?: string
}

export interface IPaperParams extends IPage {
  subject?: string
  gender?: number
  name?: string
}

export interface IQuestionParams extends IPage {
  subject?: string
  question?: number
}

export interface ICreateNoticeData {
  content: string
}
export interface IUpdateNoticeData {
  content: string
  _id: string
}

export interface ICreateSubjectData {
  name: string
  desc: string
}

export interface IUpdateSubjectData {
  name: string
  desc: string
  _id: string
}

export interface ICreateTeachersData {
  no: string
  name: string
  gender: number
  email: string
  phone: string
}

export interface IUpdateTeacherData extends ICreateTeachersData{
  _id: string
}

export interface IUpdateStudentData extends ICreateStudentsData{
  _id: string
}

export interface ICreateStudentsData extends ICreateTeachersData{}

export interface IUpdateTeacherStatusData {
  _id: string
  status: number
}

export interface IUpdateStudentStatusData extends IUpdateTeacherStatusData{}

export interface IQuestionBaseParams {
  question: string
  subjectId: number | undefined
  knowledgePoint: string
  explanation: string
  difficulty: number
}

export interface IId {
  _id: string
}

export interface ISingleMultipleParams extends IQuestionBaseParams{
  picture: string
  a: string
  b: string
  c: string
  d: string
  correctAnswer: string
}

export interface IJudgeParams extends IQuestionBaseParams{
  correctAnswer: string
}

export interface ICompletionAFQParams extends IQuestionBaseParams{
  correctAnswer: string
  picture: string
}

export interface ISingleMultipleData extends ISingleMultipleParams, IId{}

export interface IJudgeData extends IQuestionBaseParams, IId{}

export interface ICompletionAFQData extends ICompletionAFQParams, IId{}

export interface IQuestion extends IQuestionBaseParams{
  picture?: string
  a?: string | undefined
  b?: string | undefined
  c?: string | undefined
  d?: string | undefined
  correctAnswer: string | []
}
