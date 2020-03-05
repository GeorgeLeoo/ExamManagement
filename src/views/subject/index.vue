<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:26 PM
-->
<template>
  <div class="app-container subject-container">
    <div class="filter-container">
      <el-input
        v-model="name"
        :placeholder="$t('subject.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="author"
        :placeholder="$t('subject.ph_author')"
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
      :data="subjectsList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('subject.index')"
        type="index"
        align="center"
      />
      <el-table-column
        :label="$t('subject.name')"
        prop="name"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('subject.desc')"
        prop="desc"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('subject.author')"
        prop="author"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('subject.paperCount')"
        prop="paperCount"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paperCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('subject.createTime')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | parseTime }}</span>
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
            type="primary"
            @click="handleModify(row)"
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
      v-show="total > params.limit"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.limit"
      @pagination="getList"
    />

    <el-dialog
      :visible.sync="dialogSubjectVisible"
      :title="$t('notice.dialogTitleAdd')"
      width="500px"
      @closed="handleCancel"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('subject.name')">
          <el-input
            v-model="subjectItem.name"
          />
        </el-form-item>
        <el-form-item :label="$t('subject.desc')">
          <el-input
            v-model="subjectItem.desc"
            :autosize="{minRows: 8, maxRows: 8}"
            type="textarea"
          />
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
import { Component, Vue } from 'vue-property-decorator'
import {
  ICreateSubjectData,
  IDeleteParams,
  IPage,
  ISubjectParams, IUpdateSubjectData
} from '@/api/types'
import { createSubject, deleteSubject, getSubjects, updateSubject } from '@/api/subjects'
import Pagination from '@/components/Pagination/index.vue'
import { deepClone } from '@/utils'
import { isValidSubject, isValidSubjectDesc } from '@/utils/validate'

  @Component({
    name: 'Subject',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private dialogSubjectVisible: boolean = false;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private subjectsList = [];
    private subjectItem: any = {}
    private name = ''
    private author = ''
    private total = 0;
    // -1：默认，0：添加，1：编辑
    private dialogType = -1;

    private params: ISubjectParams = {
      page: 1,
      limit: 10
    }

    created() {
      this.getSubjects()
    }

    /**
     * 获取科目信息
     */
    private async getSubjects() {
      if (this.name) {
        Object.assign(this.params, { no: this.name })
      }
      if (this.author) {
        Object.assign(this.params, { name: this.author })
      }
      this.listLoading = true
      const { data } = await getSubjects(this.params)
      this.subjectsList = data.list
      this.total = data.total
      this.listLoading = false
    }

    /**
     * 搜索
     */
    handleFilter() {
      this.getSubjects()
    }

    /**
     * 分页
     */
    getList({ page }: IPage) {
      this.params.page = page
      this.getSubjects()
    }

    /**
     * 添加
     */
    handleCreate() {
      this.dialogSubjectVisible = true
      this.dialogType = 0
    }

    /**
     * 取消
     */
    handleCancel() {
      this.dialogSubjectVisible = false
      this.subjectItem = {}
      this.dialogType = -1
    }

    /**
     * 编辑
     * @param row 每条item数据
     */
    handleModify(row: any) {
      this.dialogType = 1
      this.dialogSubjectVisible = true
      this.subjectItem = deepClone(row)
    }

    /**
     * 弹出框确定
     */
    async handleOk() {
      if (!isValidSubject(this.subjectItem.no)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '科目名称不能为空'
        })
        return
      }
      if (!isValidSubjectDesc(this.subjectItem.no)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '科目描述不能为空'
        })
        return
      }
      const base = {
        name: this.subjectItem.name,
        desc: this.subjectItem.desc
      }
      let res: any
      let message = ''
      if (this.dialogType === 0) {
        const body: ICreateSubjectData = base
        message = '添加成功'
        res = await createSubject(body)
      } else if (this.dialogType === 1) {
        const body: IUpdateSubjectData | {} = {}
        Object.assign(body, base, { _id: this.subjectItem._id })
        message = '更新成功'
        res = await updateSubject(body)
      }
      if (res.data === 'success') {
        this.handleFilter()
        this.dialogSubjectVisible = false
        this.$message({
          type: 'success',
          message
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data
        })
      }
    }

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
        this.deleteSubject(row._id)
      }).catch(() => {
      })
    }

    /**
     * 删除
     * @param _id
     */
    async deleteSubject(_id: string) {
      const body: IDeleteParams = {
        _id
      }
      const { data } = await deleteSubject(body)
      if (data === 'success') {
        this.handleFilter()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: data
        })
      }
    }
}
</script>

<style scoped lang="scss">
</style>
