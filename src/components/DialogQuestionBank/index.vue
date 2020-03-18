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
          <el-input v-model="data.subject" />
        </el-form-item>
        <el-form-item
          v-if="bankType !==2"
          :label="$t('questionBank.picture')"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="data.picture"
              :src="data.picture"
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
        <el-form-item :label="$t('questionBank.knowledgePoint')">
          <el-input
            v-model="data.knowledgePoint"
            :autosize="{minRows: 4, maxRows: 4}"
            type="textarea"
          />
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
import { questionFilter } from '@/filters'
import { IQuestion } from '@/api/types'
import { isEmpty } from '@/utils/validate'

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
    // -1：默认，0：添加，1：编辑
    // private dialogType = -1;

    @Prop({ required: true }) private data!: IQuestion
    @Prop({ required: true }) private dialogType!: number
    @Prop({ required: true }) private bankType!: number

    created() {
    }

    /**
     * 取消
     */
    handleCancel() {
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
      // if (isEmpty(this.data.subjectId)) {
      //   this.$message({
      //     type: 'warning',
      //     duration: 3 * 1000,
      //     message: '请选择科目'
      //   })
      //   return true
      // }
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
      const res = await questionFilter(this.dialogType, this.bankType)(this.data)
      if (res.data === 'success') {
        this.$emit('fetch')
        let messages = ['添加成功', '修改成功']
        this.$message({
          type: 'success',
          duration: 3 * 1000,
          message: messages[this.dialogType]
        })
      }
    }

    handleAvatarSuccess(res:any, file:any) {
    }
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      return isJPG && isLt2M
    }
}
</script>

<style lang="scss">
  .question-bank-single-info-add {
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
  }
</style>
