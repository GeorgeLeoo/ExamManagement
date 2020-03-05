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
                <span>{{ props.row.correctAnswer | trueOrFalseFilter }}</span>
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
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('questionBank.difficulty')"
        prop="difficulty"
        align="center"
        width="140"
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
            @click="handleDelete(row, 1)"
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
      :data="judgeItem"
      :dialog-type="dialogType"
      :bank-type="2"
      @cancel="handleCancel"
      @fetch="handleFetch"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { deleteJudge, getJudges } from '@/api/questions'
import { IDeleteParams, IQuestionParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import DialogQuestionBank from '@/components/DialogQuestionBank/index.vue'
import { deepClone } from '@/utils'

  @Component({
    name: 'QuestionBankJudgeInfo',
    components: {
      Pagination,
      DialogQuestionBank
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private dialogVisible: boolean = false;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private questionBanksList = []
    private judgeItem = {
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
      this.getJudges()
    }

    handleFetch() {
      this.handleFilter()
      this.dialogVisible = false
    }

    private async getJudges() {
      if (this.question) {
        Object.assign(this.params, { no: this.question })
      }
      if (this.subject) {
        Object.assign(this.params, { name: this.subject })
      }
      this.listLoading = true
      const { data } = await getJudges(this.params)
      this.questionBanksList = data.list
      this.total = data.total
      this.listLoading = false
    }

    handleFilter() {
      this.getJudges()
    }

    getList() {
      this.getJudges()
    }

    /**
     * 添加
     */
    handleCreate() {
      this.dialogVisible = true
      this.dialogType = 0
    }

    handleExportCurrentPage() {}

    handleExportAllPage() {}

    handleModify(row: any) {
      this.dialogType = 1
      this.dialogVisible = true
      this.judgeItem = deepClone(row)
    }

    async handleDelete(row: any) {
      const data: IDeleteParams = {
        _id: row._id
      }
      const res = await deleteJudge(data)
      if (res.data === 'success') {
        this.getJudges()
        this.$message({
          type: 'success',
          duration: 3 * 1000,
          message: '删除成功'
        })
      }
    }

    /**
     * 取消
     */
    handleCancel() {
      this.dialogVisible = false
      this.judgeItem = {}
    }
}
</script>

<style lang="scss">
  .question-bank-single-info {
    .table-expand-content{
      color: #606266;
    }
  }
</style>
