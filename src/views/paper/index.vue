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
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-plus"
        @click="handleFixedCombinePager"
      >
        {{ $t('paper.fixedCombinePager') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item gap-right-32"
        type="primary"
        icon="el-icon-plus"
        @click="handleRandomCombinePager"
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
            :disabled="row.paperType === 0"
            @click="handleShowPaper(row)"
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

    <el-dialog
      :visible.sync="dialogVisible"
      :title="$t('paper.showPaper')"
      width="1024px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @opened="handleGetPaperQuestions"
      @close="handleCancel"
    >
      <div
        v-loading="isLoading"
        class="paperDialogList"
      >
        <Single :data="paperQuestions.single" />
        <Multiple :data="paperQuestions.multiple" />
        <Judge :data="paperQuestions.judge" />
        <Completion :data="paperQuestions.completion" />
        <AFQ :data="paperQuestions.afq" />
      </div>
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

    <el-dialog
      :visible.sync="fixedCombinePagerVisible"
      :title="$t('paper.fixedCombinePager')"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="handleCancel"
    >
      <div
        v-loading="isLoading"
        class="paperDialogList"
      >
        <el-form label-width="100px">
          <el-form-item label="所属科目">
            <el-select
              v-model="fixedForm.subjectId"
              class="fixedInput100"
              placeholder="请选择科目"
            >
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="试卷名称">
            <el-input v-model="fixedForm.paperName" />
          </el-form-item>
          <el-form-item label="考试时间">
            <el-date-picker
              v-model="fixedForm.time"
              class="fixedInput100"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="难度系数">
            <el-rate
              v-model="fixedForm.difficulty"
              class="fixedFormDifficulty"
              text-color="#ff9900"
            />
          </el-form-item>
          <el-form-item label="注意事项">
            <el-input
              v-model="fixedForm.attention"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="单选题分值">
            <el-input-number
              v-model="fixedForm.singleScore"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="多选题分值">
            <el-input-number
              v-model="fixedForm.multipleScore"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="判断题分值">
            <el-input-number
              v-model="fixedForm.judgeScore"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="填空题分值">
            <el-input-number
              v-model="fixedForm.completionScore"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="解答题分值">
            <el-input-number
              v-model="fixedForm.afqScore"
              :min="0"
              :max="100"
            />
          </el-form-item>
        </el-form>
        <el-collapse
          v-model="activeName"
          accordion
        >
          <el-collapse-item
            title="单选题"
            name="1"
          >
            <div>
              <el-checkbox-group v-model="singleCheckList">
                <div
                  v-for="(item, index) in singleList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ item.question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="多选题"
            name="2"
          >
            <div>
              <el-checkbox-group v-model="multipleCheckList">
                <div
                  v-for="(item, index) in multipleList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ item.question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="判断题"
            name="3"
          >
            <div>
              <el-checkbox-group v-model="judgeCheckList">
                <div
                  v-for="(item, index) in judgeList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ item.question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="填空题"
            name="4"
          >
            <div>
              <el-checkbox-group v-model="completionCheckList">
                <div
                  v-for="(item, index) in completionList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ item.question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="解答题"
            name="5"
          >
            <div>
              <el-checkbox-group v-model="afqCheckList">
                <div
                  v-for="(item, index) in afqList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ item.question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleCancel"
        >{{ $t('cancel') }}</el-button>
        <el-button
          type="success"
          @click="handleDialogShowPaper"
        >{{ $t('paper.showPaper') }}</el-button>
        <el-button
          type="primary"
          @click="handleOk"
        >{{ $t('ok') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="randomCombinePagerVisible"
      :title="$t('paper.randomCombinePager')"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="handleCancel"
    >
      <div
        v-loading="isLoading"
        class="paperDialogList"
      >
        <el-form label-width="100px">
          <el-form-item label="所属科目">
            <el-select
              v-model="randomForm.subjectId"
              class="fixedInput100"
              placeholder="请选择科目"
            >
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="试卷名称">
            <el-input v-model="randomForm.paperName" />
          </el-form-item>
          <el-form-item label="考试时间">
            <el-date-picker
              v-model="randomForm.time"
              class="fixedInput100"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="难度系数">
            <el-rate
              v-model="randomForm.difficulty"
              class="fixedFormDifficulty"
              text-color="#ff9900"
            />
          </el-form-item>
          <el-form-item label="注意事项">
            <el-input
              v-model="randomForm.attention"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="单选题分值">
            <el-input-number
              v-model="randomForm.singleScore"
              :min="0"
              :max="100"
            />
            <span class="padding">数量</span>
            <el-input-number
              v-model="randomForm.singleNumber"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="多选题分值">
            <el-input-number
              v-model="randomForm.multipleScore"
              :min="0"
              :max="100"
            />
            <span class="padding">数量</span>
            <el-input-number
              v-model="randomForm.multipleNumber"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="判断题分值">
            <el-input-number
              v-model="randomForm.judgeScore"
              :min="0"
              :max="100"
            />
            <span class="padding">数量</span>
            <el-input-number
              v-model="randomForm.judgeNumber"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="填空题分值">
            <el-input-number
              v-model="randomForm.completionScore"
              :min="0"
              :max="100"
            />
            <span class="padding">数量</span>
            <el-input-number
              v-model="randomForm.completionNumber"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="解答题分值">
            <el-input-number
              v-model="randomForm.afqScore"
              :min="0"
              :max="100"
            />
            <span class="padding">数量</span>
            <el-input-number
              v-model="randomForm.afqNumber"
              :min="0"
              :max="100"
            />
          </el-form-item>
        </el-form>
        <h3 class="total-score">
          一共 {{ totalScore }} 分
        </h3>
      </div>
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
import { IDeleteParams, IScoreParams, ISubjectParams } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import Single from '@/components/Single/index.vue'
import Multiple from '@/components/Multiple/index.vue'
import Judge from '@/components/Judge/index.vue'
import Completion from '@/components/Completion/index.vue'
import AFQ from '@/components/AFQ/index.vue'
import { deletePaper, getPaperQuestions, getPapers } from '@/api/papers'
import { getSubjects } from '@/api/subjects'
import { getAFQs, getCompletions, getJudges, getMultiples, getSingles } from '@/api/questions'

  @Component({
    name: 'Paper',
    components: {
      Pagination,
      Single,
      Multiple,
      Judge,
      Completion,
      AFQ
    }
  })

export default class extends Vue {
    private defaultProps = {
      question: 'question'
    }
    private singleCheckList: [] = [];
    private multipleCheckList: [] = [];
    private judgeCheckList: [] = [];
    private completionCheckList: [] = [];
    private afqCheckList: [] = [];
    private tableKey: Number = 0;
    private isLoading: boolean = false;
    private dialogVisible: boolean = false;
    private fixedCombinePagerVisible: boolean = false;
    private randomCombinePagerVisible: boolean = false;
    private listLoading: boolean = false;
    private subjectList = [];
    private papersList = [];
    private paperQuestions = {};
    private activeName = '1'
    private subject = ''
    private gender = ''
    private name = ''
    private page = 1;
    private limit = 10;
    private total = 0;
    private paperId = '';
    private fixedForm = {
      subjectId: '',
      paperName: '',
      time: '',
      startTime: '',
      endTime: '',
      difficulty: 0,
      attention: '',
      singleScore: '',
      multipleScore: '',
      judgeScore: '',
      completionScore: '',
      afqScore: ''
    };
    private randomForm = {
      subjectId: '',
      paperName: '',
      time: '',
      startTime: '',
      endTime: '',
      difficulty: 0,
      attention: '',
      singleScore: 0,
      singleNumber: 0,
      multipleScore: 0,
      multipleNumber: 0,
      judgeScore: 0,
      judgeNumber: 0,
      completionScore: 0,
      completionNumber: 0,
      afqScore: 0,
      afqNumber: 0
    };

    private params: IScoreParams = {
      page: this.page,
      limit: this.limit
    }

    private singleList = []
    private multipleList = []
    private judgeList = []
    private completionList = []
    private afqList = []

    created() {
      this.getPapers()
      this.getSubjects()
    }

    get totalScore() {
      const {
        singleScore,
        singleNumber,
        multipleScore,
        multipleNumber,
        judgeScore,
        judgeNumber,
        completionScore,
        completionNumber,
        afqScore,
        afqNumber
      } = this.randomForm
      return singleNumber * singleScore +
        multipleNumber * multipleScore +
        judgeNumber * judgeScore +
        completionNumber * completionScore +
        afqNumber * afqScore
    }

    private async getPapers() {
      this.gender && Object.assign(this.params, { name: this.gender })
      this.subject && Object.assign(this.params, { name: this.subject })
      this.name && Object.assign(this.params, { no: this.name })
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

    /**
     * 获取科目信息
     */
    private async getSubjects() {
      const params: ISubjectParams = {
        page: 1,
        limit: 200
      }
      const { data } = await getSubjects(params)
      this.subjectList = data.list
    }

    private async getSingles() {
      const { data } = await getSingles(this.params)
      this.singleList = data.list
    }

    private async getMultiples() {
      const { data } = await getMultiples(this.params)
      this.multipleList = data.list
    }

    private async getJudges() {
      const { data } = await getJudges(this.params)
      this.judgeList = data.list
    }

    private async getCompletions() {
      const { data } = await getCompletions(this.params)
      this.completionList = data.list
    }

    private async getAFQs() {
      const { data } = await getAFQs(this.params)
      this.afqList = data.list
    }

    handleFixedCombinePager() {
      this.fixedCombinePagerVisible = true
      this.getSingles()
      this.getMultiples()
      this.getJudges()
      this.getCompletions()
      this.getAFQs()
    }

    handleRandomCombinePager() {
      this.randomCombinePagerVisible = true
    }

    async getPaperQuestions(_id: string) {
      this.isLoading = true
      const res = await getPaperQuestions({ _id })
      this.paperQuestions = res.data
      this.isLoading = false
    }

    handleModifyStatus(row: any, status: Number) {}

    handleShowPaper(row: any) {
      this.dialogVisible = true
      this.paperId = row._id
    }

    handleGetPaperQuestions() {
      this.getPaperQuestions(this.paperId)
    }

    handleDialogShowPaper() {}

    handleCancel() {
      this.dialogVisible = false
      this.fixedCombinePagerVisible = false
      this.randomCombinePagerVisible = false
      this.randomForm = {
        subjectId: '',
        paperName: '',
        time: '',
        startTime: '',
        endTime: '',
        difficulty: 0,
        attention: '',
        singleScore: 0,
        singleNumber: 0,
        multipleScore: 0,
        multipleNumber: 0,
        judgeScore: 0,
        judgeNumber: 0,
        completionScore: 0,
        completionNumber: 0,
        afqScore: 0,
        afqNumber: 0
      }
      this.fixedForm = {
        subjectId: '',
        paperName: '',
        time: '',
        startTime: '',
        endTime: '',
        difficulty: 0,
        attention: '',
        singleScore: '',
        multipleScore: '',
        judgeScore: '',
        completionScore: '',
        afqScore: ''
      }
    }

    handleOk() {}

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

<style lang="scss">
  .paper-container{
    .paperDialogList{
      height: calc(100vh - 400px);
      overflow: auto;
    }
    .fixedInput100 {
      width: 100%;
    }
    .fixedFormDifficulty{
      margin-top: 8px;
    }
    .padding{
      padding-left: 20px;
      padding-right: 10px;
      color: #1f2d3d;
      font-weight: 700;
    }
    .total-score {
      padding-left: 20px;
    }
    .el-checkbox__label {
      width: 550px;
      display: inline-grid;
      white-space: pre-line;
      word-wrap: break-word;
      overflow: hidden;
      line-height: 26px;
    }
  }
</style>
