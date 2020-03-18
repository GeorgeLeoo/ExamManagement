<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:36 PM
-->
<template>
  <div class="app-container question-bank-single-info">
    <div class="filter-container">
      <el-input
        v-model="question"
        :placeholder="$t('questionBank.ph_question')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="subject"
        :placeholder="$t('questionBank.ph_subject')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('search') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item gap-right-32"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        {{ $t('add') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="questionBanksList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            class="table-expand-content"
          >
            <el-form-item :label="$t('questionBank.selection')">
              <el-form-item label="">
                <span />
              </el-form-item>
              <el-form-item :label="$t('questionBank.a')">
                <span>{{ props.row.a }}</span>
              </el-form-item>
              <el-form-item :label="$t('questionBank.b')">
                <span>{{ props.row.b }}</span>
              </el-form-item>
              <el-form-item :label="$t('questionBank.c')">
                <span>{{ props.row.c }}</span>
              </el-form-item>
              <el-form-item :label="$t('questionBank.d')">
                <span>{{ props.row.d }}</span>
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('questionBank.knowledgePoint')">
              <el-form-item label="">
                <span />
              </el-form-item>
              <el-form-item label="">
                <span>{{ props.row.knowledgePoint }}</span>
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('questionBank.correctAnswer')">
              <el-form-item label="">
                <span />
              </el-form-item>
              <el-form-item label="">
                <span>{{ props.row.correctAnswer }}</span>
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('questionBank.explanation')">
              <el-form-item label="">
                <span />
              </el-form-item>
              <el-form-item label="">
                <span>{{ props.row.explanation }}</span>
              </el-form-item>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('index')"
        type="index"
        align="center"
      />
      <el-table-column
        :label="$t('questionBank.question')"
        prop="question"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.question }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('questionBank.subject')"
        prop="subject"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('questionBank.difficulty')"
        prop="difficulty"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.difficulty"
            disabled
            text-color="#ff9900"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('questionBank.picture')"
        prop="picture"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          <el-avatar
            :size="100"
            shape="square"
            :src="scope.row.picture"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('createTime')"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('operation')"
        align="center"
        width="200"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="handleModify(row, 0)"
          >
            {{ $t('edit') }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            {{ $t('delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getList"
    />

    <DialogQuestionBank
      v-if="dialogVisible"
      :data="singleItem"
      :dialog-type="dialogType"
      :bank-type="0"
      @cancel="handleCancel"
      @fetch="handleFetch"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { deleteSingle, getSingles } from '@/api/questions'
import { IDeleteParams, IQuestionParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import DialogQuestionBank from '@/components/DialogQuestionBank/index.vue'
import { deepClone } from '@/utils'

  @Component({
    name: 'QuestionBankSingleInfo',
    components: {
      DialogQuestionBank,
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private dialogVisible: boolean = false;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private questionBanksList = []
    private singleItem = {
      difficulty: 0
    }
    private question = ''
    private subject = ''
    private page = 1;
    private limit = 10;
    private total = 0;
    // -1：默认，0：添加，1：编辑
    private dialogType = -1;

    private params: IQuestionParams = {
      page: this.page,
      limit: this.limit
    }

    created() {
      this.getSingles()
    }

    handleFetch() {
      this.handleFilter()
      this.dialogVisible = false
    }

    private async getSingles() {
      this.question && Object.assign(this.params, { no: this.question })
      this.subject && Object.assign(this.params, { name: this.subject })
      this.listLoading = true
      const { data } = await getSingles(this.params)
      this.questionBanksList = data.list
      this.total = data.total
      this.listLoading = false
    }

    handleFilter() {
      this.getSingles()
    }

    getList() {
      this.getSingles()
    }

    /**
     * 添加
     */
    handleCreate() {
      this.dialogVisible = true
      this.dialogType = 0
    }

    /**
     * 取消
     */
    handleCancel() {
      this.dialogVisible = false
    }

    /**
     * 取消
     */
    handleOk() {
    }

    handleExportCurrentPage() {}

    handleExportAllPage() {}

    /**
     * 更新学生信息
     * @param row
     */
    handleModify(row: any) {
      this.dialogType = 1
      this.singleItem = deepClone(row)
      this.dialogVisible = true
    }

    async handleDelete(row: any) {
      const data: IDeleteParams = {
        _id: row._id
      }
      const res = await deleteSingle(data)
      if (res.data === 'success') {
        this.getSingles()
        this.$message({
          type: 'success',
          duration: 3 * 1000,
          message: '删除成功'
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
  .question-bank-single-info {
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
