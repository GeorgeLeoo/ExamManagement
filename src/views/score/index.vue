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
            @click="handleShowPaper(row, 1)"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IPage, IScoreParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getAllScores, getScores } from '@/api/scores'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'

  @Component({
    name: 'Score',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private scoresList = [];
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
      if (this.no) {
        Object.assign(this.params, { name: this.no })
      }
      if (this.name) {
        Object.assign(this.params, { no: this.name })
      }
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

    handleShowPaper(row: any, status: Number) {}
}
</script>

<style scoped lang="scss">
</style>
