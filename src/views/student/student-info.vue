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
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
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
      v-if="total > limit"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getStudents"
    />

    <el-dialog
      :visible.sync="dialogAddTeacherVisible"
      :title="$t('student.dialogTitleAdd')"
      width="500px"
    >
      <el-form
        ref="form"
        label-width="70px"
      >
        <el-form-item :label="$t('student.no')">
          <el-input v-model="no" />
        </el-form-item>
        <el-form-item :label="$t('student.name')">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item :label="$t('student.gender')">
          <el-radio-group v-model="gender">
            <el-radio :label="$t('male')" />
            <el-radio :label="$t('female')" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogAddTeacherVisible = false"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogAddTeacherVisible = false"
        >{{ $t('ok') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IStudentParams } from '@/api/types'
import { getStudents } from '@/api/students'
import Pagination from '@/components/Pagination/index.vue'

  @Component({
    name: 'StudentInfo',
    components: {
      Pagination
    }
  })

export default class extends Vue {
    private dialogAddTeacherVisible = false
    private tableKey: Number = 0
    private exportCurrentPageLoading: boolean = false
    private exportAllPageLoading: boolean = false
    private listLoading: boolean = false
    private studentsList = []
    private no = ''
    private name = ''
    private gender = ''
    private page = 1;
    private limit = 10;
    private total = 0;

    private params: IStudentParams = {
      page: this.page,
      limit: this.limit
    }

    created() {
      this.getStudents()
    }

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

    handleFilter() {
      this.getStudents()
    }

    handleCreate() {
      this.dialogAddTeacherVisible = true
    }

    handleExportCurrentPage() {}

    handleExportAllPage() {}

    handleModifyStatus(row: any, status: Number) {}
}
</script>

<style scoped lang="scss">
</style>
