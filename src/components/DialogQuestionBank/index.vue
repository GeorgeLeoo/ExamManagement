<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:36 PM
-->
<template>
  <div class="app-container question-bank-single-info-add">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 1 ? $t('questionBank.dialogTitleModify') : (dialogType === 0 ? $t('questionBank.dialogTitleAdd') : '')"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="handleCancel"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('questionBank.question')">
          <el-input
            v-model="data.question"
            :autosize="{minRows: 4, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>
        <el-form-item :label="$t('questionBank.subject')">
          <el-select
            v-model="data.subjectId"
            :placeholder="$t('questionBank.ph_subject')"
            style="width: 100%"
            class="filter-item gap-right-32"
          >
            <el-option
              v-for="item in subjectsList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="bankType !==2"
          :label="$t('questionBank.picture')"
        >
          <el-upload
            class="avatar-uploader"
            action="/upload-img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="data.picture"
              :src="data.picture | pic"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
        <template v-if="bankType === 0 || bankType === 1">
          <el-form-item :label="$t('questionBank.a')">
            <el-input v-model="data.a" />
          </el-form-item>
          <el-form-item :label="$t('questionBank.b')">
            <el-input v-model="data.b" />
          </el-form-item>
          <el-form-item :label="$t('questionBank.c')">
            <el-input v-model="data.c" />
          </el-form-item>
          <el-form-item :label="$t('questionBank.d')">
            <el-input v-model="data.d" />
          </el-form-item>
        </template>
        <template v-if="bankType === 0">
          <el-form-item :label="$t('questionBank.correctAnswer')">
            <el-radio-group v-model="data.correctAnswer">
              <el-radio label="A" />
              <el-radio label="B" />
              <el-radio label="C" />
              <el-radio label="D" />
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-else-if="bankType === 1">
          <el-form-item :label="$t('questionBank.correctAnswer')">
            <el-checkbox-group v-model="data.correctAnswer">
              <el-checkbox label="A" />
              <el-checkbox label="B" />
              <el-checkbox label="C" />
              <el-checkbox label="D" />
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-else-if="bankType === 2">
          <el-form-item :label="$t('questionBank.correctAnswer')">
            <el-radio-group v-model="data.correctAnswer">
              <el-radio :label="0">
                正确
              </el-radio>
              <el-radio :label="1">
                错误
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('questionBank.correctAnswer')">
            <el-input v-model="data.correctAnswer" />
          </el-form-item>
        </template>
        <template v-if="bankType === 4">
          <el-form-item label="关键词">
            <p>多个关键词可以已中文顿号分割</p>
            <el-input v-model="data.keywords" />
          </el-form-item>
        </template>
        <el-form-item :label="$t('questionBank.explanation')">
          <el-input
            v-model="data.explanation"
            :autosize="{minRows: 4, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          class="knowledge-point"
          :label="$t('questionBank.knowledgePoint')"
        >
          <el-popover
            placement="right"
            width="400"
            trigger="click"
          >
            <el-input
              slot="reference"
              v-model="data.knowledgePoint"
              class="knowledge-point-input"
              type="text"
              placement="bottom"
              @input="toSearchKnowledgePoint"
            />
            <div
              v-if="knowledgePointList.length > 0"
              style="height: 200px;overflow: auto;"
            >
              <div
                v-for="item in knowledgePointList"
                :key="item._id"
              >
                <p
                  style="line-height: 32px;cursor: pointer;padding: 0 16px;margin: 0;"
                  onmouseover="this.style.background='rgba(15,174,243,0.09)'"
                  onmouseleave="this.style.background='#fff'"
                  @click="data.knowledgePoint = item.knowledgePoint"
                >
                  {{ item.knowledgePoint }}
                </p>
              </div>
            </div>
            <div
              v-else
              class="empty"
            >
              <p>暂无数据</p>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item :label="$t('questionBank.difficulty')">
          <div class="rate-wrapper">
            <el-rate
              v-model="data.difficulty"
              text-color="#ff9900"
            />
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleCancel"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleOk"
        >{{ $t('ok') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { pic, questionFilter } from '@/filters'
import { IQuestion } from '@/api/types'
import { isEmpty } from '@/utils/validate'
import { getSubjects } from '@/api/subjects'
import { UserModule } from '@/store/modules/user'
import { url } from '@/config/index'
import { getKnowledgePoints } from '@/api/papers'

  @Component({
    name: 'QuestionBankDialog',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private dialogVisible: boolean = true;
    private question = ''
    private subject = ''
    private knowledgePoint = ''
    private isLoadingKnowledgePoint = false
    private url:string = url
    private subjectsList = []
    private keywords: [] = []
    private knowledgePointList = []
    // -1：默认，0：添加，1：编辑
    // private dialogType = -1;

    @Prop({ required: true }) private data!: IQuestion
    @Prop({ required: true }) private dialogType!: number
    @Prop({ required: true }) private bankType!: number

    created() {
      this.getSubjects()
    }

    mounted() {
      // @ts-ignore
      this.data.subjectId && (this.data.subjectId = this.data.subjectId._id)
    }

    toSearchKnowledgePoint() {
      this.getKnowledgePoint()
    }
    /**
     * 根据考点查询
     */
    async getKnowledgePoint() {
      let params: any = {
        page: 1,
        limit: 100000000
      }
      this.data.knowledgePoint && (params.knowledgePoint = this.data.knowledgePoint)
      console.log(params)
      const { data } = await getKnowledgePoints(params)
      this.knowledgePointList = data.list
    }

    /**
     * 获取科目信息
     */
    private async getSubjects() {
      let params:any = {
        page: 1,
        limit: 100000000
      }
      const { data } = await getSubjects(params)
      this.subjectsList = data.list
    }

    /**
     * 取消
     */
    handleCancel() {
      this.keywords = []
      this.$emit('cancel')
    }

    checkEmpty() {
      const singleFilter = [0, 1]
      if (isEmpty(this.data.question)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '题目不能为空'
        })
        return true
      }
      if (!this.data.subjectId) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请选择科目'
        })
        return true
      }
      if (singleFilter.includes(this.bankType) && isEmpty(this.data.a)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入选项A'
        })
        return true
      }
      if (singleFilter.includes(this.bankType) && isEmpty(this.data.b)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入选项B'
        })
        return true
      }
      if (singleFilter.includes(this.bankType) && isEmpty(this.data.c)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入选项C'
        })
        return true
      }
      if (singleFilter.includes(this.bankType) && isEmpty(this.data.d)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入选项D'
        })
        return true
      }
      if (typeof this.data.correctAnswer === 'undefined' || this.data.correctAnswer.length === 0) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请选择或输入正确答案'
        })
        return true
      }
      if (isEmpty(this.data.knowledgePoint)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入考点'
        })
        return true
      }
      if (!this.data.difficulty || this.data.difficulty <= 0) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请选择难度系数'
        })
        return true
      }
      return false
    }

    /**
     * ok
     */
    async handleOk() {
      if (this.checkEmpty()) {
        return
      }
      this.data.admin = UserModule.uid
      await questionFilter(this.dialogType, this.bankType)(this.data)
      this.$emit('fetch')
    }

    handleAvatarSuccess(res:any, file:any) {
      this.$set(this.data, 'picture', res.data)
    }
    beforeAvatarUpload(file: any) {
      // const isJPG = file.type === 'image/jpeg'
      return file.size / 1024 / 1024 < 2
    }
}
</script>

<style lang="scss">
  .question-bank-single-info-add {
    .knowledge-point-input {
      position: relative;
    }
    .knowledge-point-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
    }
    .table-expand-content{
      color: #606266;
    }
    .rate-wrapper {
      padding-top: 7px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-dialog {
      margin-top: 0!important;
    }
    p{
      margin: 0;
      padding: 0;
    }
    .empty {
      text-align: center;
      color: #9aaabf;
    }
  }
</style>
