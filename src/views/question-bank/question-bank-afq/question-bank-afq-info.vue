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
      <!--      <el-input-->
      <!--        v-model="subject"-->
      <!--        :placeholder="$t('questionBank.ph_subject')"-->
      <!--        style="width: 200px;"-->
      <!--        class="filter-item gap-right-32"-->
      <!--        @keyup.enter.native="handleFilter"-->
      <!--      />-->
      <el-select
        v-model="subject"
        :placeholder="$t('questionBank.ph_subject')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in subjectsList"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        />
      </el-select>
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
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subjectId && scope.row.subjectId.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('questionBank.difficulty')"
        prop="difficulty"
        width="150"
        align="center"
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
        width="140"
        align="center"
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
        :label="'作者'"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.admin && scope.row.admin.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('createTime')"
        width="200"
        align="center"
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
      v-show="total > limit"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getList"
    />

    <DialogQuestionBank
      v-if="dialogVisible"
      :data="afqItem"
      :subject-list="subjectsList"
      :dialog-type="dialogType"
      :bank-type="4"
      @cancel="handleCancel"
      @fetch="handleFetch"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { deleteAFQ, getAFQs } from '@/api/questions'
import { IDeleteParams, IQuestionParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import DialogQuestionBank from '@/components/DialogQuestionBank/index.vue'
import { deepClone } from '@/utils'
import { getSubjects } from '@/api/subjects'

  @Component({
    name: 'QuestionBankAFQInfo',
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
    private afqItem = {
      difficulty: 0
    }
    private subjectsList = [
      {
        _id: '0',
        name: '全部'
      }
    ]
    private question = ''
    private subject = '0'
    private page = 1;
    private limit = 10;
    private total = 0;
    // -1：默认，0：添加，1：编辑
    private dialogType = -1;

    private params: IQuestionParams = {
      page: this.page,
      limit: this.limit
    }

    mounted() {
      this.getSubjects()
      this.getAFQs()
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
      this.subjectsList.push(...data.list)
    }

    handleFetch() {
      this.handleFilter()
      this.afqItem = {
        difficulty: 0
      }
      this.dialogVisible = false
    }

    private async getAFQs() {
      let params:any = { ...this.params }
      this.question && (params.question = this.question)
      this.subject !== '0' && (params.subjectId = this.subject)
      this.listLoading = true
      const { data } = await getAFQs(params)
      this.questionBanksList = data.list
      this.total = data.total
      this.listLoading = false
    }

    handleFilter() {
      this.getAFQs()
    }

    getList() {
      this.getAFQs()
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
      this.afqItem = deepClone(row)
    }

    async handleDelete(row: any) {
      const data: IDeleteParams = {
        _id: row._id
      }
      await deleteAFQ(data)
      this.getAFQs()
    }

    /**
     * 取消
     */
    handleCancel() {
      this.dialogVisible = false
      this.afqItem = {
        difficulty: 0
      }
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
