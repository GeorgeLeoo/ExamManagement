<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:08 PM
-->
<template>
  <div class="app-container teacher-container">
    <div class="filter-container">
      <el-input
        v-model="no"
        :placeholder="$t('teacher.ph_no')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="name"
        :placeholder="$t('teacher.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="gender"
        :placeholder="$t('teacher.ph_gender')"
        style="width: 120px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in $t('teacher.select_genders')"
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
        {{ $t('teacher.search') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item gap-right-32"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        {{ $t('teacher.add') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportCurrentPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportCurrentPage"
      >
        {{ $t('teacher.exportCurrentPage') }}
      </el-button>
      <el-button
        v-waves
        :loading="exportAllPageLoading"
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-download"
        @click="handleExportAllPage"
      >
        {{ $t('teacher.exportAllPage') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="teachersList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('teacher.no')"
        prop="no"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.name')"
        prop="name"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.gender')"
        prop="gender"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.avatar')"
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
        :label="$t('teacher.email')"
        prop="email"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.phone')"
        prop="phone"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.signUpAt')"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.signUpAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.createdAt')"
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
      :title="$t('teacher.dialogTitleAdd')"
      width="500px"
      @close="handleCancel"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('teacher.no')">
          <el-input v-model="teacherItem.no" />
        </el-form-item>
        <el-form-item :label="$t('teacher.name')">
          <el-input v-model="teacherItem.name" />
        </el-form-item>
        <el-form-item :label="$t('teacher.gender')">
          <el-radio-group v-model="teacherItem.gender">
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
        <el-form-item :label="$t('teacher.email')">
          <el-input v-model="teacherItem.email" />
        </el-form-item>
        <el-form-item :label="$t('teacher.phone')">
          <el-input v-model="teacherItem.phone" />
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
  ICreateTeachersData,
  IPage,
  ITeacherParams, IUpdateTeacherData, IUpdateTeacherStatusData
} from '@/api/types'
import { createTeachers, getAllTeachers, getTeachers, updateTeacher, updateTeacherStatus } from '@/api/teachers'
import Pagination from '@/components/Pagination/index.vue'
import { deepClone, formatJson } from '@/utils'
import { isValidEmail, isValidGender, isValidName, isValidNo, isValidPhone } from '@/utils/validate'
import { exportJson2Excel } from '@/utils/excel'

@Component({
  name: 'TeacherInfo',
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
  private teachersList = []
  private teacherItem: any = {}
  private no = ''
  private name = ''
  private gender = ''
  private total = 0;
  // -1：默认，0：添加，1：编辑
  private dialogType = -1;

  private filename = new Date().toLocaleDateString()
  private autoWidth = true
  private bookType = 'xlsx'

  private params: ITeacherParams = {
    page: 1,
    limit: 10
  }

  created() {
    this.getTeachers()
  }

  /**
   * 公告教师获取
   */
  private async getTeachers() {
    this.no && Object.assign(this.params, { no: this.no })
    this.name && Object.assign(this.params, { name: this.name })
    this.gender && Object.assign(this.params, { gender: this.gender })
    this.listLoading = true
    const { data } = await getTeachers(this.params)
    this.teachersList = data.list
    this.total = data.total
    this.listLoading = false
  }

  /**
   * 搜索
   */
  handleFilter() {
    this.getTeachers()
  }

  /**
   * 分页
   */
  getList({ page }: IPage) {
    this.params.page = page
    this.getTeachers()
  }

  handleCreate() {
    this.dialogVisible = true
    this.dialogType = 0
  }

  /**
   * 取消
   */
  handleCancel() {
    this.dialogVisible = false
    this.teacherItem = {}
  }

  checkValid() {
    if (!isValidNo(this.teacherItem.no)) {
      this.$message({
        type: 'warning',
        duration: 3 * 1000,
        message: '工号不能为空'
      })
      return true
    }
    if (!isValidName(this.teacherItem.name)) {
      this.$message({
        type: 'warning',
        duration: 3 * 1000,
        message: '姓名不能为空'
      })
      return true
    }
    if (!isValidGender(this.teacherItem.gender)) {
      this.$message({
        type: 'warning',
        duration: 3 * 1000,
        message: '请选择性别'
      })
      return true
    }
    if (!isValidEmail(this.teacherItem.email)) {
      this.$message({
        type: 'warning',
        duration: 3 * 1000,
        message: '请输入正确的邮箱'
      })
      return true
    }
    if (!isValidPhone(this.teacherItem.phone)) {
      this.$message({
        type: 'warning',
        duration: 3 * 1000,
        message: '请输入正确的手机号'
      })
      return true
    }
    return false
  }

  /**
   * 弹出框确定
   */
  async handleOk() {
    if (this.checkValid()) {
      return
    }
    let messages = ['添加成功', '更新成功']
    let base = {
      no: this.teacherItem.no,
      name: this.teacherItem.name,
      gender: this.teacherItem.gender,
      email: this.teacherItem.email,
      phone: this.teacherItem.phone
    }
    if (this.dialogType === 0) {
      const body: ICreateTeachersData = base
      await createTeachers(body)
    } else if (this.dialogType === 1) {
      const body: IUpdateTeacherData | {} = {}
      Object.assign(body, base, { _id: this.teacherItem._id })
      await updateTeacher(body)
    }
    this.dialogVisible = false
    this.handleFilter()
    this.$message({
      type: 'success',
      duration: 3 * 1000,
      message: messages[this.dialogType]
    })
  }

  /**
   * 下载数据
   */
  handleDownload(obj: any) {
    const tHeader = ['工号', '姓名', '性别', '邮箱', '手机号', '注册时间', '创建时间']
    const filterVal = ['no', 'name', 'gender', 'email', 'phone', 'signUpAt', 'createdAt']
    const data = formatJson(filterVal, obj)
    exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, this.autoWidth, this.bookType)
  }

  /**
   * 导出当前页
   */
  handleExportCurrentPage() {
    this.exportCurrentPageLoading = true
    this.handleDownload(this.teachersList)
    this.exportCurrentPageLoading = false
  }

  /**
   * 导出所有页
   */
  async handleExportAllPage() {
    this.exportAllPageLoading = true
    const res = await getAllTeachers()
    this.handleDownload(res.data.list)
    this.exportAllPageLoading = false
  }

  /**
   * 修改账号状态
   * @param row
   * @param status
   */
  async handleModifyStatus(row: any, status: number) {
    const body: IUpdateTeacherStatusData = {
      _id: row._id,
      status: status
    }
    let res = await updateTeacherStatus(body)
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
    this.teacherItem = deepClone(row)
  }
}
</script>

<style scoped lang="scss">
</style>
