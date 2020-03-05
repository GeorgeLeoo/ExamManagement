<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:26 PM
-->
<template>
  <div class="app-container paper-container">
    <div class="filter-container">
      <el-input
        v-model="name"
        :placeholder="$t('paper.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="subject"
        :placeholder="$t('paper.ph_subject')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in $t('paper.select_genders')"
          :key="item.id"
          :label="item.text"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="gender"
        :placeholder="$t('paper.ph_type')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in $t('paper.select_genders')"
          :key="item.id"
          :label="item.text"
          :value="item.id"
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
        :loading="exportCurrentPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-plus"
        @click="handleExportCurrentPage"
      >
        {{ $t('paper.fixedCombinePager') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportAllPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-plus"
        @click="handleExportAllPage"
      >
        {{ $t('paper.randomCombinePager') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="papersList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('index')"
        type="index"
        align="center"
        width="100"
      />
      <el-table-column
        :label="$t('paper.name')"
        prop="paperName"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paperName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.subject')"
        prop="subject"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.testType')"
        prop="testType"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.testType | testTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.durationTime')"
        prop="durationTime"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.durationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.difficulty')"
        prop="difficulty"
        align="center"
        width="200"
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
        :label="$t('paper.attention')"
        prop="attention"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.attention }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.type')"
        prop="paperType"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.paperType === 1"
          >
            {{ scope.row.paperType | paperTypeFilter }}
          </el-tag>
          <el-tag
            v-if="scope.row.paperType === 0"
            type="danger"
          >
            {{ scope.row.paperType | paperTypeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.total')"
        prop="total"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.participantNumber')"
        prop="participantNumber"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.participantNumber }}</span>
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
        width="250"
        fixed="right"
      >
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 0)"
          >
            {{ $t('paper.showPaper') }}
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleModifyStatus(row, 0)"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IDeleteParams, IScoreParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { deletePaper, getPapers } from '@/api/papers'

  @Component({
    name: 'Paper',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private papersList = [];
    private subject = ''
    private gender = ''
    private name = ''
    private page = 1;
    private limit = 10;
    private total = 0;

    private params: IScoreParams = {
      page: this.page,
      limit: this.limit
    }

    created() {
      this.getPapers()
    }

    private async getPapers() {
      if (this.gender) {
        Object.assign(this.params, { name: this.gender })
      }
      if (this.subject) {
        Object.assign(this.params, { name: this.subject })
      }
      if (this.name) {
        Object.assign(this.params, { no: this.name })
      }
      this.listLoading = true
      const { data } = await getPapers(this.params)
      this.papersList = data.list
      this.total = data.total
      this.listLoading = false
    }

    handleFilter() {
      this.getPapers()
    }

    getList() {
      this.getPapers()
    }

    handleCreate() {}

    handleExportCurrentPage() {}

    handleExportAllPage() {}

    handleModifyStatus(row: any, status: Number) {}

    /**
     * 删除显示警告
     * @param row
     */
    handleDelete(row: any) {
      this.$confirm('此操作将永久删除此条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePaper(row._id)
      }).catch(() => {
      })
    }

    /**
     * 删除
     * @param _id
     */
    async deletePaper(_id: string) {
      const body: IDeleteParams = {
        _id
      }
      await deletePaper(body)
      this.handleFilter()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }
}
</script>

<style scoped lang="scss">
</style>
