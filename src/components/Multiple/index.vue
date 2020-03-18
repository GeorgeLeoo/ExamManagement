<!--
  @Description:
  @Author: George
  @Date: 2020/3/15 8:23 PM
-->
<template>
  <div class="question-list">
    <h3>多选题（共{{ data.list.length }}题，每小题{{ data.multipleScore }}分）</h3>
    <dl
      v-for="(item, index) in data.list"
      :key="index"
      class="question-list-item"
    >
      <dt class="question-list-item-title">
        {{ index + 1 }}. {{ item.question }}
      </dt>
      <dd class="question-list-item-option">
        {{ $t("questionBank.a") }}：{{ item.a }}
      </dd>
      <dd class="question-list-item-option">
        {{ $t("questionBank.b") }}：{{ item.b }}
      </dd>
      <dd class="question-list-item-option">
        {{ $t("questionBank.c") }}：{{ item.c }}
      </dd>
      <dd class="question-list-item-option">
        {{ $t("questionBank.d") }}：{{ item.d }}
      </dd>
      <dd class="question-list-item-option question-list-item-correctAnswer">
        {{ $t("questionBank.correctAnswer") }}：{{ item.correctAnswer.join(", ") }}
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Multiple',
    components: {}
  })
export default class extends Vue {
    @Prop({ required: true }) private data!: []
}
</script>

<style scoped lang="scss">
  .question-list {
    .question-list-item {
      padding: 10px 0;
      font-size: 16px;
      line-height: 26px;
    }
    .question-list-item-title {
      padding-bottom: 10px;
    }
    .question-list-item-option {
      margin-left: 0;
      color: #606266;
    }
    .question-list-item-correctAnswer {
      padding-top: 10px;
    }
  }
</style>
