<!--
  @Description:
  @Author: George
  @Date: 2020/3/15 8:23 PM
-->
<template>
  <div class="question-list">
    <h3>填空题（共{{ data.length }}题，每小题{{ score }}分）</h3>
    <dl
      v-for="(item, index) in data"
      :key="index"
      class="question-list-item"
    >
      <dt class="question-list-item-title">
        {{ index + 1 }}. {{ item.question }}
      </dt>
      <dd class="question-list-item-option question-list-item-correctAnswer">
        {{ $t("questionBank.correctAnswer") }}：{{ item.correctAnswer }}
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Completion',
    components: {}
  })
export default class extends Vue {
    @Prop({ required: true }) private data!: []
    @Prop({ required: true }) private score!: 0
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
