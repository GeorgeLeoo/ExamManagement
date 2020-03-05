<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:26 PM
-->
<template>
  <div class="app-container notice-container">
    <div class="filter-container">
      <el-input
        v-model="content"
        :placeholder="$t('notice.ph_content')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="author"
        :placeholder="$t('notice.ph_author')"
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
      :data="noticesList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('notice.index')"
        type="index"
        align="center"
      />
      <el-table-column
        :label="$t('notice.content')"
        prop="content"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('notice.author')"
        prop="author"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('notice.createTime')"
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
      :visible.sync="dialogNoticeVisible"
      :title="$t('notice.dialogTitleAdd')"
      width="500px"
      @closed="handleCancel"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('notice.content')">
          <el-input
            v-model="noticeItem.content"
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
import { createNotice, deleteNoticeById, getNotices, updateNotice } from '@/api/notices'
import {
  ICreateNoticeData,
  IDeleteParams,
  INoticeParams,
  IPage, IUpdateNoticeData
} from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { deepClone } from '@/utils'
import { isValidNotice } from '@/utils/validate'

  @Component({
    name: 'Notice',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private tableKey: Number = 0;
    private dialogNoticeVisible: boolean = false;
    private exportCurrentPageLoading: boolean = false;
    private exportAllPageLoading: boolean = false;
    private listLoading: boolean = false;
    private noticesList = []
    private content = ''
    private noticeItem: any = {}
    private author = ''
    private total = 0;
    // -1：默认，0：添加，1：编辑
    private dialogType = -1;

    private params: INoticeParams = {
      page: 1,
      limit: 10
    }

    created() {
      this.getNotices()
    }

    /**
     * 公告信息获取
     */
    private async getNotices() {
      if (this.content) {
        Object.assign(this.params, { no: this.content })
      }
      if (this.author) {
        Object.assign(this.params, { name: this.author })
      }
      this.listLoading = true
      const { data } = await getNotices(this.params)
      this.noticesList = data.list
      this.total = data.total
      this.listLoading = false
    }

    /**
     * 搜索
     */
    handleFilter() {
      this.getNotices()
    }

    /**
     * 分页
     */
    getList({ page }: IPage) {
      this.params.page = page
      this.getNotices()
    }

    /**
     * 添加
     */
    handleCreate() {
      this.dialogNoticeVisible = true
      this.dialogType = 0
    }

    /**
     * 取消
     */
    handleCancel() {
      this.dialogNoticeVisible = false
      this.noticeItem = {}
      this.dialogType = -1
    }

    /**
     * 编辑
     * @param row 每条item数据
     */
    handleModify(row: any) {
      this.dialogType = 1
      this.dialogNoticeVisible = true
      this.noticeItem = deepClone(row)
    }

    /**
     * 弹出框确定
     */
    async handleOk() {
      if (!isValidNotice(this.noticeItem.no)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '公告不能为空'
        })
        return
      }
      const base = {
        content: this.noticeItem.content
      }
      let res: any
      let message = ''
      if (this.dialogType === 0) {
        const body: ICreateNoticeData = base
        message = '添加成功'
        res = await createNotice(body)
      } else if (this.dialogType === 1) {
        const body: IUpdateNoticeData | {} = {}
        Object.assign(body, base, { _id: this.noticeItem._id })
        message = '更新成功'
        res = await updateNotice(body)
      }
      if (res.data === 'success') {
        this.handleFilter()
        this.dialogNoticeVisible = false
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
        this.deleteNoticeById(row._id)
      }).catch(() => {
      })
    }

    /**
     * 删除
     * @param _id
     */
    async deleteNoticeById(_id: string) {
      const body: IDeleteParams = {
        _id
      }
      const { data } = await deleteNoticeById(body)
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
