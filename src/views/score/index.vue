<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:26 PM
-->
<template>
  <div class="app-container score-container">
    <div class="filter-container">
      <el-input
        v-model="no"
        :placeholder="$t('score.ph_no')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="name"
        :placeholder="$t('score.ph_paperName')"
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
        :loading="exportCurrentPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportCurrentPage"
      >
        {{ $t('score.exportCurrentPage') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportAllPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportAllPage"
      >
        {{ $t('score.exportAllPage') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="scoresList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('score.no')"
        prop="username"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.paperName')"
        prop="paperName"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paper.paperName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.score')"
        prop="score"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.startTime')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paper.startTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.endTime')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paper.endTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.diffTime')"
        prop="diffTime"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paper | getDurationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="考试类型"
        prop="status"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.paper.testType === 0"
            type="success"
          >
            {{ scope.row.paper.testType | testTypeFilter }}
          </el-tag>
          <el-tag
            v-if="scope.row.paper.testType === 1"
            type="danger"
          >
            {{ scope.row.paper.testType | testTypeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.status')"
        prop="status"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status === 0"
            type="success"
          >
            {{ scope.row.status | paperStatusFilter }}
          </el-tag>
          <el-tag
            v-if="scope.row.status === 1"
            type="danger"
          >
            {{ scope.row.status | paperStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('operation')"
        align="center"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            @click="handleShowPaper(row)"
          >
            {{ $t('score.showAnswer') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > params.limit"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.limit"
      @pagination="getList"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :title="$t('score.showAnswer')"
      width="1024px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleCancel"
    >
      <div
        v-loading="isLoading"
        class="scoreDialogList"
      >
        <div>
          <el-tag
            type="success"
            effect="dark"
          >
            正确
          </el-tag>
          <span class="padding" />
          <el-tag
            type="danger"
            effect="dark"
          >
            错误
          </el-tag>
        </div>
        <h3>单选题</h3>
        <template v-for="(item, index) in answers.single">
          <span :key="'single' + index">
            <el-tag
              :type="item.score > 0 ? 'success' : 'danger'"
              effect="dark"
            >
              {{ index + 1 }}
            </el-tag>
            <span class="padding" />
          </span>
        </template>
        <h3>多选题</h3>
        <template v-for="(item, index) in answers.multiple">
          <span :key="'multiple' + index">
            <el-tag
              :type="item.score > 0 ? 'success' : 'danger'"
              effect="dark"
            >
              {{ index + 1 }}
            </el-tag>
            <span class="padding" />
          </span>
        </template>
        <h3>判断题</h3>
        <template v-for="(item, index) in answers.judge">
          <span :key="'judge' + index">
            <el-tag
              :type="item.score > 0 ? 'success' : 'danger'"
              effect="dark"
            >
              {{ index + 1 }}
            </el-tag>
            <span class="padding" />
          </span>
        </template>
        <h3>填空题</h3>
        <template v-for="(item, index) in answers.completion">
          <span :key="'completion' + index">
            <el-tag
              :type="item.score > 0 ? 'success' : 'danger'"
              effect="dark"
            >
              {{ index + 1 }}
            </el-tag>
            <span class="padding" />
          </span>
        </template>
        <h3>解答题</h3>
        <template v-for="(item, index) in answers.afq">
          <dl
            :key="'af1' + index"
            class="afq-list"
          >
            <dt class="afq-item-title afq-item">
              {{ index + 1 }}.
              <!--              {{ item.original.question }}-->
            </dt>
            <dd class="afq-item">
              参考答案：{{ item.original.correctAnswer }}
            </dd>
            <dd class="afq-item">
              考试答案：{{ item.answer }}
            </dd>
            <dd class="afq-judgement">
              得分：
              <el-input
                v-model.number="item.score"
                style="width: 100px"
                placeholder="0"
              />
            </dd>
            <dd class="afq-judgement">
              满分：<span style="display: inline-block;width: 100px;text-align: left;padding-left: 16px;">{{ afqScore }}</span>
            </dd>
            <dd>
              <el-divider />
            </dd>
          </dl>
        </template>
        <div class="submit-wrapper">
          <el-button
            type="primary"
            @click="handleOk"
          >
            {{ $t('submit') }}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IPage, IScoreParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getAllScores, getScores } from '@/api/scores'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import { getAnswers, updateScore } from '@/api/answers'
import {login} from '@/api/users';

  @Component({
    name: 'Score',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private isLoading: boolean = false;
    private dialogVisible: boolean = false;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private scoresList = [];
    private answers = {};
    private afqScore = 0;
    private score = 0;
    private currentAFQScore = 0;
    private judgeScore: any = {};
    private no = ''
    private name = ''

    private total = 0;
    private filename = new Date().toLocaleDateString()
    private autoWidth = true

    private bookType = 'xlsx'
    private scoreId = ''
    private answerId = ''
    private params: IScoreParams = {
      page: 1,
      limit: 10
    }

    created() {
      this.getScores()
    }

    private async getScores() {
      this.no && Object.assign(this.params, { name: this.no })
      this.name && Object.assign(this.params, { no: this.name })
      this.listLoading = true
      const { data } = await getScores(this.params)
      this.scoresList = data.list
      this.total = data.total
      this.listLoading = false
    }

    handleFilter() {
      this.getScores()
    }

    getList({ page }: IPage) {
      this.params.page = page
      this.getScores()
    }

    handleCreate() {}

    /**
     * 下载数据
     */
    handleDownload(obj: any) {
      const tHeader = ['账号', '姓名', '试卷名称', '分数', '开始考试时间', '结束考试时间', '总耗时']
      const filterVal = ['["user"]["username"]', 'name', 'paperName', 'score', 'startTime', 'endTime', 'diffTime']
      const data = formatJson(filterVal, obj)
      exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, this.autoWidth, this.bookType)
    }

    /**
     * 导出当前页
     */
    handleExportCurrentPage() {
      this.exportCurrentPageLoading = true
      this.handleDownload(this.scoresList)
      this.exportCurrentPageLoading = false
    }

    /**
     * 导出所有页
     */
    async handleExportAllPage() {
      this.exportAllPageLoading = true
      const { data } = await getScores({
        page: 1,
        limit: 10000000
      })
      this.handleDownload(data.list)
      this.exportAllPageLoading = false
    }

    handleShowPaper(row: any) {
      this.dialogVisible = true
      this.answers = row.answer
      this.afqScore = row.paper.afqScore
      this.scoreId = row._id
      this.answerId = row.answer._id
      this.score = row.score
      // this.getAnswers(row._id)
      // eslint-disable-next-line no-return-assign
      this.currentAFQScore = 0
      row.answer.afq.find((item: { score: number }) => {
        this.currentAFQScore += item.score
      })
    }

    async getAnswers(_id:string) {
      const res = await getAnswers({ _id })
      this.answers = res.data
    }

    handleCancel() {
      this.dialogVisible = false
      this.judgeScore = {}
    }

    /**
     * 提交分数
     */
    async handleOk() {
      let i = 0
      // @ts-ignore
      this.answers.afq.map((item: any) => {
        if (item.score > this.afqScore) i++
      })
      if (i !== 0) {
        this.$message({
          message: '输入的分数不得超过 ' + this.afqScore + ' 分',
          type: 'warning'
        })
        return
      }
      const data = {
        scoreId: this.scoreId,
        answerId: this.answerId,
        // @ts-ignore
        afq: this.answers.afq,
        // @ts-ignore
        paper: this.answers.paper,
        // @ts-ignore
        afqScore: this.afqScore,
        score: this.score,
        currentAFQScore: this.currentAFQScore
      }
      await updateScore(data)
      this.getScores()
    }
}
</script>

<style scoped lang="scss">
  .score-container{
    .padding::after{
      content: ".";
      visibility: hidden;
      padding: 0 10px;
    }
    .scoreDialogList{
      height: calc(100vh - 390px);
      overflow: auto;
    }
    .afq-list{
      font-size: 16px;
      color: #606266;
    }
    .afq-item-title {
      padding-bottom: 16px;
      color: #303133;
    }
    .afq-item {
      line-height: 26px;
      margin-left: 0;
    }
    .afq-item:nth-child(2) {
      color: #F56C6C;
    }
    .afq-judgement{
      margin-top: 16px;
      padding-right: 16px;
      text-align: right;
    }
    dd {
      margin-left: 0;
    }
    .submit-wrapper {
      text-align: right;
    }
  }
</style>
