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
        prop="no"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.name')"
        prop="author"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.paperName')"
        prop="paperName"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paperName }}</span>
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
          <span>{{ scope.row.startTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.endTime')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('score.diffTime')"
        prop="diffTime"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.diffTime }}</span>
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
              {{ index + 1 }}. {{ item.question.question }}
            </dt>
            <dd class="afq-item">
              参考答案：{{ item.question.correctAnswer }}
            </dd>
            <dd class="afq-item">
              考试答案：{{ item.answer }}
            </dd>
            <dd class="afq-judgement">
              得分：
              <el-input
                v-model="judgeScore[index]"
                style="width: 100px"
                placeholder="0"
              />
              <span class="padding" />
              <el-button
                type="primary"
                @click="handleOk(index, item.question._id)"
              >
                {{ $t('submit') }}
              </el-button>
            </dd>
            <dd>
              <el-divider />
            </dd>
          </dl>
        </template>
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
    private answers = [];
    private judgeScore: any = {};
    private no = ''
    private name = ''

    private total = 0;
    private filename = new Date().toLocaleDateString()
    private autoWidth = true

    private bookType = 'xlsx'
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
      const tHeader = ['学号', '姓名', '试卷名称', '分数', '开始考试时间', '结束考试时间', '总耗时']
      const filterVal = ['no', 'name', 'paperName', 'score', 'startTime', 'endTime', 'diffTime']
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
      const res = await getAllScores()
      this.handleDownload(res.data.list)
      this.exportAllPageLoading = false
    }

    handleShowPaper(row: any) {
      this.dialogVisible = true
      this.getAnswers(row._id)
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
    async handleOk(index: string, _id: string) {
      const score = Number(this.judgeScore[index])
      if (isNaN(score)) {
        this.$message({
          type: 'error',
          duration: 3 * 1000,
          message: '请输入数字'
        })
        return
      }
      const params = {
        _id,
        score
      }
      await updateScore(params)
      this.$message({
        type: 'success',
        duration: 3 * 1000,
        message: '提交成功'
      })
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
  }
</style>
