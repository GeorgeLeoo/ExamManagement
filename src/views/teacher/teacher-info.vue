<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:08 PM
-->
<template>
  <div class="app-container teacher-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.no"
        :placeholder="$t('teacher.ph_no')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        :placeholder="$t('teacher.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.gender"
        :placeholder="$t('teacher.ph_gender')"
        style="width: 120px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in genders"
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
        icon="el-icon-edit"
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
      :data="list"
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
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('teacher.avatar')"
        prop="avatar"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.avatar }}</span>
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
        :label="$t('teacher.state')"
        prop="state"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
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
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            v-if="row.status === 1"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 0)"
          >
            {{ $t('teacher.enable') }}
          </el-button>
          <el-button
            v-if="row.status === 0"
            size="mini"
            @click="handleModifyStatus(row, 1)"
          >
            {{ $t('teacher.disable') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ITeacherData } from '@/api/types'

@Component({
  name: 'TeacherInfo',
  components: {
  }
})

export default class extends Vue {
  private tableKey: Number = 0;
  private exportCurrentPageLoading: boolean = false;
  private exportAllPageLoading: boolean = false;
  private listLoading: boolean = false;
  private list: ITeacherData[] = [];
  private listQuery = {
    no: '',
    name: '',
    gender: '',
    page: 1,
    limit: 10
  };
  private genders = [
    {
      text: '全部',
      id: ''
    },
    {
      text: '男',
      id: 0
    },
    {
      text: '女',
      id: 1
    }
  ];

  handleFilter() {}

  getList() {}

  handleCreate() {}

  handleExportCurrentPage() {}

  handleExportAllPage() {}

  handleModifyStatus(row: any, status: Number) {}
}
</script>

<style scoped lang="scss">
</style>
