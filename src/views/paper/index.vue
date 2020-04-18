<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:26 PM
-->
<template>
  <div class="app-container paper-container">
    <div class="filter-container">
      <el-input
        v-model="paperName"
        :placeholder="$t('paper.ph_name')"
        style="width: 200px;"
        class="filter-item gap-right-32"
        @input="handleFilter"
      />
      <el-select
        v-model="subject"
        :placeholder="$t('questionBank.ph_subject')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in subjectsList"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        />
      </el-select>
      <el-select
        v-model="paperType"
        :placeholder="$t('paper.ph_type')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in paperTypes"
          :key="item.id"
          :label="item.text"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="testType"
        :placeholder="$t('paper.ph_type')"
        style="width: 200px"
        class="filter-item gap-right-32"
      >
        <el-option
          v-for="item in testTypes"
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
          <span>{{ scope.row.subject ? scope.row.subject.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.testType')"
        prop="testType"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.testType === 0"
          >
            {{ scope.row.testType | testTypeFilter }}
          </el-tag>
          <el-tag
            v-if="scope.row.testType === 1"
            type="success"
          >
            {{ scope.row.testType | testTypeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.durationTime')"
        prop="durationTime"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.durationTime')"
        prop="durationTime"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.durationTime')"
        prop="durationTime"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row | getDurationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.difficulty')"
        prop="difficulty"
        align="center"
        width="140"
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
          <span>{{ scope.row | paperTotalScore }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('paper.participantNumber')"
        prop="participantNumber"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.participantNumber ? scope.row.participantNumber : 0 }}</span>
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
            @click="handleShowPaper(row)"
          >
            {{ $t('paper.showPaper') }}
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleModifyStatus(row)"
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
      @close="handleCancel"
    >
      <div>
        <h3 class="paper-name">
          {{ paperQuestions.paperName }}
        </h3>
        <p class="subject-name">
          {{ paperQuestions.subject ? paperQuestions.subject.name : '' }}
        </p>
        <p class="subject-name">
          考试时间：{{ paperQuestions.startTime }} - {{ paperQuestions.endTime }}
        </p>
        <p class="subject-name">
          考试时长：{{ paperQuestions | getDurationTime }}
        </p>
      </div>
      <div
        v-loading="isLoading"
        class="paper-dialog-list paper-question"
      >
        <Single
          :data="paperQuestions.single"
          :score="paperQuestions.singleScore"
        />
        <Multiple
          :data="paperQuestions.multiple"
          :score="paperQuestions.multipleScore"
        />
        <Judge
          :data="paperQuestions.judge"
          :score="paperQuestions.judgeScore"
        />
        <Completion
          :data="paperQuestions.completion"
          :score="paperQuestions.completionScore"
        />
        <AFQ
          :data="paperQuestions.afq"
          :score="paperQuestions.afqScore"
        />
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
          @click="handleRandomOk"
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
        class="paper-dialog-list"
      >
        <el-form label-width="100px">
          <el-form-item label="所属科目">
            <el-select
              v-model="fixedForm.subject"
              class="fixedInput100"
              placeholder="请选择科目"
              @input="handleSelectSubject"
            >
              <el-option
                v-for="item in subjectList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试类型">
            <el-select
              v-model="fixedForm.testType"
              class="fixedInput100"
              placeholder=""
              @input="handleSelectSubject"
            >
              <el-option
                v-for="item in testTypesList"
                :key="item.id"
                :label="item.text"
                :value="item.id"
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
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
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
            :title="`单选题：已选择 ${singleCheckList.length} 题`"
            name="1"
          >
            <div>
              <el-input
                v-model="questionSingle"
                :placeholder="$t('paper.ph_name')"
                style="width: 200px;"
                class="w100"
                @input="getSingles"
              />
              <el-checkbox-group v-model="singleCheckList">
                <div
                  v-for="(item, index) in singleList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ JSON.parse(item).question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="`多选题：已选择 ${multipleCheckList.length} 题`"
            name="2"
          >
            <div>
              <el-input
                v-model="questionMultiple"
                :placeholder="$t('paper.ph_name')"
                style="width: 200px;"
                class="w100"
                @input="getMultiples"
              />
              <el-checkbox-group v-model="multipleCheckList">
                <div
                  v-for="(item, index) in multipleList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ JSON.parse(item).question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="`判断题：已选择 ${judgeCheckList.length} 题`"
            name="3"
          >
            <div>
              <el-input
                v-model="questionJudge"
                :placeholder="$t('paper.ph_name')"
                style="width: 200px;"
                class="w100"
                @input="getJudges"
              />
              <el-checkbox-group v-model="judgeCheckList">
                <div
                  v-for="(item, index) in judgeList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ JSON.parse(item).question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="`填空题：已选择 ${completionCheckList.length} 题`"
            name="4"
          >
            <div>
              <el-input
                v-model="questionCompletion"
                :placeholder="$t('paper.ph_name')"
                style="width: 200px;"
                class="w100"
                @input="getCompletions"
              />
              <el-checkbox-group v-model="completionCheckList">
                <div
                  v-for="(item, index) in completionList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ JSON.parse(item).question }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="`解答题：已选择 ${afqCheckList.length} 题`"
            name="5"
          >
            <div>
              <el-input
                v-model="questionAFQ"
                :placeholder="$t('paper.ph_name')"
                style="width: 200px;"
                class="w100"
                @input="getAFQs"
              />
              <el-checkbox-group v-model="afqCheckList">
                <div
                  v-for="(item, index) in afqList"
                  :key="index"
                >
                  <el-checkbox :label="item">
                    {{ index + 1 }}. {{ JSON.parse(item).question }}
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
        <span class="total-score">共 {{ fixTotalScore }} 分</span>
        <el-button
          @click="handleCancel"
        >{{ $t('cancel') }}</el-button>
        <!--        <el-button-->
        <!--          type="success"-->
        <!--          @click="handleDialogShowPaper"-->
        <!--        >{{ $t('paper.showPaper') }}</el-button>-->
        <el-button
          type="primary"
          @click="handleFixedOk"
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
        class="paper-dialog-list"
      >
        <el-form label-width="100px">
          <el-form-item label="所属科目">
            <el-select
              v-model="randomForm.subject"
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
          <el-form-item label="考试类型">
            <el-select
              v-model="randomForm.testType"
              class="fixedInput100"
              placeholder=""
              @input="handleSelectSubject"
            >
              <el-option
                v-for="item in testTypesList"
                :key="item.id"
                :label="item.text"
                :value="item.id"
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
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
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
          共 {{ totalScore }} 分
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
          @click="handleRandomOk"
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
import { createPapers, deletePaper, getPaperQuestions, getPapers, updatePapers } from '@/api/papers'
import { getSubjects } from '@/api/subjects'
import { getAFQs, getCompletions, getJudges, getMultiples, getSingles } from '@/api/questions'
import { deepClone } from '@/utils'
import { UserModule } from '@/store/modules/user'

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
    private papersList = [];
    private questionAFQ = '';
    private questionCompletion = '';
    private questionJudge = '';
    private questionMultiple = '';
    private questionSingle = '';
    private testType = '';
    private testTypes = [
      {
        id: '',
        text: '全部'
      },
      {
        id: 0,
        text: '模拟考试'
      },
      {
        id: 1,
        text: '正式考试'
      }
    ];
    private testTypesList = [
      {
        id: 0,
        text: '模拟考试'
      },
      {
        id: 1,
        text: '正式考试'
      }
    ];
    private paperTypes = [
      {
        id: '',
        text: '全部'
      },
      {
        id: 0,
        text: '固定组卷'
      },
      {
        id: 1,
        text: '随机组卷'
      }
    ];
    private paperQuestions = {};
    private activeName = '1'
    private subject = ''
    private paperType = ''
    private gender = ''
    private paperName = ''
    private page = 1;
    private limit = 10;
    private total = 0;
    private paperId = '';
    private fixedForm = {
      subject: '',
      paperName: '',
      time: '',
      testType: '',
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
      subject: '',
      testType: '',
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
    private subjectList:any = []
    private subjectsList:any = [
      {
        _id: '0',
        name: '全部'
      }
    ]

    created() {
      this.getSubjects()
      this.getPapers()
    }

    get fixTotalScore() {
      const { singleScore, multipleScore, judgeScore, completionScore, afqScore } = this.fixedForm
      return Number(singleScore) * this.singleCheckList.length +
        Number(multipleScore) * this.multipleCheckList.length +
        Number(judgeScore) * this.judgeCheckList.length +
        Number(completionScore) * this.completionCheckList.length +
        Number(afqScore) * this.afqCheckList.length
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

    /**
     * 获取科目信息
     */
    private async getSubjects() {
      let params:any = {
        page: 1,
        limit: 100000000
      }
      const { data } = await getSubjects(params)
      this.subjectList.push(...data.list)
      this.subjectsList.push(...data.list)
    }

    private async getPapers() {
      let params:any = { ...this.params }
      this.paperName && (params.paperName = this.paperName)
      this.subject !== '0' && (params.subject = this.subject)
      this.paperType !== '' && (params.paperType = this.paperType)
      this.testType !== '' && (params.testType = this.testType)
      this.listLoading = true
      const { data } = await getPapers(params)
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
     * 选择科目
     */
    handleSelectSubject() {
      this.handleFixedCombinePager()
    }

    private async getSingles() {
      const params:any = deepClone(this.params)
      this.fixedForm.subject && (params.subject = this.fixedForm.subject)
      this.questionSingle && (params.question = this.questionSingle)
      const { data } = await getSingles(params)
      this.singleList = data.list.map((item: any) => JSON.stringify(item))
    }

    private async getMultiples() {
      const params:any = deepClone(this.params)
      this.fixedForm.subject && (params.subject = this.fixedForm.subject)
      this.questionMultiple && (params.question = this.questionMultiple)
      const { data } = await getMultiples(params)
      this.multipleList = data.list.map((item: any) => JSON.stringify(item))
    }

    private async getJudges() {
      const params:any = deepClone(this.params)
      this.fixedForm.subject && (params.subject = this.fixedForm.subject)
      this.questionJudge && (params.question = this.questionJudge)
      const { data } = await getJudges(params)
      this.judgeList = data.list.map((item: any) => JSON.stringify(item))
    }

    private async getCompletions() {
      const params:any = deepClone(this.params)
      this.fixedForm.subject && (params.subject = this.fixedForm.subject)
      this.questionCompletion && (params.question = this.questionCompletion)
      const { data } = await getCompletions(params)
      this.completionList = data.list.map((item: any) => JSON.stringify(item))
    }

    private async getAFQs() {
      const params:any = deepClone(this.params)
      this.fixedForm.subject && (params.subject = this.fixedForm.subject)
      this.questionAFQ && (params.question = this.questionAFQ)
      const { data } = await getAFQs(params)
      this.afqList = data.list.map((item: any) => JSON.stringify(item))
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

    handleModifyStatus(row: any) {
      if (row.paperType === 0) {
        this.fixedForm = deepClone(row)
        // @ts-ignore
        this.fixedForm.time = [this.fixedForm.startTime, this.fixedForm.endTime]
        this.fixedForm.subject = this.fixedForm.subject._id
        this.handleFixedCombinePager()
        this.singleCheckList = row.single.map((item: any) => JSON.stringify(item))
        this.multipleCheckList = row.multiple.map((item: any) => JSON.stringify(item))
        this.judgeCheckList = row.judge.map((item: any) => JSON.stringify(item))
        this.completionCheckList = row.completion.map((item: any) => JSON.stringify(item))
        this.afqCheckList = row.afq.map((item: any) => JSON.stringify(item))
      }
      if (row.paperType === 1) {
        this.randomForm = deepClone(row)
        // @ts-ignore
        this.randomForm.time = [this.randomForm.startTime, this.randomForm.endTime]
        this.randomForm.subject = this.randomForm.subject._id
        this.handleRandomCombinePager()
      }
    }

    handleShowPaper(row: any) {
      this.dialogVisible = true
      this.paperQuestions = row
    }

    handleDialogShowPaper() {}

    handleCancel() {
      this.dialogVisible = false
      this.fixedCombinePagerVisible = false
      this.randomCombinePagerVisible = false
      this.randomForm = {
        subject: '',
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
        afqNumber: 0,
        testType: ''
      }
      this.fixedForm = {
        testType: '',
        subject: '',
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
      this.singleCheckList = []
      this.multipleCheckList = []
      this.judgeCheckList = []
      this.completionCheckList = []
      this.afqCheckList = []
    }

    /**
     * 固定组卷保存
     */
    async handleFixedOk() {
      const body = deepClone(this.fixedForm)
      body.startTime = this.fixedForm.time[0]
      body.endTime = this.fixedForm.time[1]
      // @ts-ignore
      body.single = this.singleCheckList.map(item => JSON.parse(item)._id)
      // @ts-ignore
      body.multiple = this.multipleCheckList.map(item => JSON.parse(item)._id)
      // @ts-ignore
      body.judge = this.judgeCheckList.map(item => JSON.parse(item)._id)
      // @ts-ignore
      body.completion = this.completionCheckList.map(item => JSON.parse(item)._id)
      // @ts-ignore
      body.afq = this.afqCheckList.map(item => JSON.parse(item)._id)
      delete body['time']
      body.admin = UserModule.uid
      body.paperType = 0
      if (!body._id) {
        await createPapers(body)
      } else {
        await updatePapers(body)
      }
      this.handleCancel()
      this.getPapers()
      this.handleCancel()
    }

    /**
     * 随机组卷
     */
    async handleRandomOk() {
      const body = deepClone(this.randomForm)
      body.startTime = this.randomForm.time[0]
      body.endTime = this.randomForm.time[1]
      delete body['time']
      body.admin = UserModule.uid
      body.paperType = 1
      await createPapers(body)
      this.handleCancel()
      this.getPapers()
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
    }
}
</script>

<style lang="scss">
  .paper-container{
    .paper-dialog-list{
      height: calc(100vh - 600px);
      overflow: auto;
    }
    .paper-question {
      padding: 0 16px;
    }
    .paper-name {
      text-align: center;
      margin-top: 0;
    }
    .subject-name {
      text-align: center;
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
      padding: 0 20px;
    }
    .el-checkbox__label {
      width: 550px;
      display: inline-grid;
      white-space: pre-line;
      word-wrap: break-word;
      overflow: hidden;
      line-height: 26px;
    }
    .w100 {
      width: 100%!important;
      margin-bottom: 14px;
    }
    .selected-question {
      margin-left: 16px;
    }
  }
</style>
