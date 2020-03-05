<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:08 PM
-->
<template>
  <div class="app-container student-container">
    <div class="filter-container">
      <el-input
        v-model="no"
        :placeholder="$t('student.ph_no')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="name"
        :placeholder="$t('student.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="gender"
        :placeholder="$t('student.ph_gender')"
        style="width: 120px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in $t('student.select_genders')"
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
        {{ $t('student.search') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item gap-right-32"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        {{ $t('student.add') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportCurrentPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportCurrentPage"
      >
        {{ $t('student.exportCurrentPage') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportAllPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportAllPage"
      >
        {{ $t('student.exportAllPage') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="studentsList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('student.no')"
        prop="no"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.name')"
        prop="name"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.gender')"
        prop="gender"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.avatar')"
        prop="avatar"
        align="center"
      >
        <template slot-scope="scope">
          <el-avatar
            size="medium"
            :src="scope.row.avatar"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.email')"
        prop="email"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.phone')"
        prop="phone"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.signUpAt')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.signUpAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('student.createdAt')"
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
            @click="handleModify(row)"
          >
            {{ $t('edit') }}
          </el-button>
          <el-button
            v-if="row.status === 1"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 0)"
          >
            {{ $t('enable') }}
          </el-button>
          <el-button
            v-if="row.status === 0"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row, 1)"
          >
            {{ $t('disable') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="total > params.limit"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.limit"
      @pagination="getList"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :title="$t('student.dialogTitleAdd')"
      width="500px"
      @close="handleCancel"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('student.no')">
          <el-input v-model="studentItem.no" />
        </el-form-item>
        <el-form-item :label="$t('student.name')">
          <el-input v-model="studentItem.name" />
        </el-form-item>
        <el-form-item :label="$t('student.gender')">
          <el-radio-group v-model="studentItem.gender">
            <el-radio
              :label="0"
            >
              {{ $t('male') }}
            </el-radio>
            <el-radio
              :label="1"
            >
              {{ $t('female') }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('student.email')">
          <el-input v-model="studentItem.email" />
        </el-form-item>
        <el-form-item :label="$t('student.phone')">
          <el-input v-model="studentItem.phone" />
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
  ICreateStudentsData,
  IPage,
  IStudentParams, IUpdateStudentData, IUpdateStudentStatusData
} from '@/api/types'
import { createStudents, getAllStudents, getStudents, updateStudent, updateStudentStatus } from '@/api/students'
import Pagination from '@/components/Pagination/index.vue'
import { deepClone, formatJson } from '@/utils'
import { isValidEmail, isValidGender, isValidName, isValidNo, isValidPhone } from '@/utils/validate'
import { exportJson2Excel } from '@/utils/excel'

  @Component({
    name: 'StudentInfo',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private dialogVisible = false
    private tableKey: Number = 0
    private exportCurrentPageLoading: boolean = false
    private exportAllPageLoading: boolean = false
    private listLoading: boolean = false
    private studentsList = []
    private studentItem: any = {}
    private no = ''
    private name = ''
    private gender = ''
    private total = 0;
    // -1：默认，0：添加，1：编辑
    private dialogType = -1;

    private filename = new Date().toLocaleDateString()
    private autoWidth = true
    private bookType = 'xlsx'

    private params: IStudentParams = {
      page: 1,
      limit: 10
    }

    created() {
      this.getStudents()
    }

    /**
     * 公告学生获取
     */
    private async getStudents() {
      if (this.no) {
        Object.assign(this.params, { no: this.no })
      }
      if (this.name) {
        Object.assign(this.params, { name: this.name })
      }
      if (this.gender) {
        Object.assign(this.params, { gender: this.gender })
      }
      this.listLoading = true
      const { data } = await getStudents(this.params)
      this.studentsList = data.list
      this.total = data.total
      this.listLoading = false
    }

    /**
     * 搜索
     */
    handleFilter() {
      this.getStudents()
    }

    /**
     * 分页
     */
    getList({ page }: IPage) {
      this.params.page = page
      this.getStudents()
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
      this.studentItem = {}
    }

    /**
     * 弹出框确定
     */
    async handleOk() {
      if (!isValidNo(this.studentItem.no)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '学号不能为空'
        })
        return
      }
      if (!isValidName(this.studentItem.name)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '姓名不能为空'
        })
        return
      }
      if (!isValidGender(this.studentItem.gender)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请选择性别'
        })
        return
      }
      if (!isValidEmail(this.studentItem.email)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入正确的邮箱'
        })
        return
      }
      if (!isValidPhone(this.studentItem.phone)) {
        this.$message({
          type: 'warning',
          duration: 3 * 1000,
          message: '请输入正确的手机号'
        })
        return
      }
      let res: any
      let message = ''
      let base = {
        no: this.studentItem.no,
        name: this.studentItem.name,
        gender: this.studentItem.gender,
        email: this.studentItem.email,
        phone: this.studentItem.phone
      }
      if (this.dialogType === 0) {
        const body: ICreateStudentsData = base
        message = '添加成功'
        res = await createStudents(body)
      } else if (this.dialogType === 1) {
        const body: IUpdateStudentData | {} = {}
        Object.assign(body, base, { _id: this.studentItem._id })
        message = '更新成功'
        res = await updateStudent(body)
      }
      if (res.data === 'success') {
        this.handleFilter()
        this.dialogVisible = false
        this.$message({
          type: 'success',
          duration: 3 * 1000,
          message
        })
      } else {
        this.$message({
          type: 'error',
          duration: 3 * 1000,
          message: res.data
        })
      }
    }

    /**
     * 下载数据
     */
    handleDownload(obj: any) {
      const tHeader = ['学号', '姓名', '性别', '邮箱', '手机号', '注册时间', '创建时间']
      const filterVal = ['no', 'name', 'gender', 'email', 'phone', 'signUpAt', 'createdAt']
      const data = formatJson(filterVal, obj)
      exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, this.autoWidth, this.bookType)
    }

    /**
     * 导出当前页
     */
    handleExportCurrentPage() {
      this.exportCurrentPageLoading = true
      this.handleDownload(this.studentsList)
      this.exportCurrentPageLoading = false
    }

    /**
     * 导出所有页
     */
    async handleExportAllPage() {
      this.exportAllPageLoading = true
      const res = await getAllStudents()
      this.handleDownload(res.data.list)
      this.exportAllPageLoading = false
    }

    /**
     * 修改账号状态
     * @param row
     * @param status
     */
    async handleModifyStatus(row: any, status: number) {
      const body: IUpdateStudentStatusData = {
        _id: row._id,
        status: status
      }
      let res = await updateStudentStatus(body)
      if (res.data === 'success') {
        this.handleFilter()
        this.dialogVisible = false
        this.$message({
          type: 'success',
          duration: 3 * 1000,
          message: '操作成功'
        })
      } else {
        this.$message({
          type: 'error',
          duration: 3 * 1000,
          message: res.data
        })
      }
    }

    /**
     * 更新学生信息
     * @param row
     */
    handleModify(row: any) {
      this.dialogType = 1
      this.dialogVisible = true
      this.studentItem = deepClone(row)
    }
}
</script>

<style scoped lang="scss">
</style>
