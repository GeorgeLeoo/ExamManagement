<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:37 PM
-->
<template>
  <div>
    <UploadInfo :btn-text="$t('teacher.downloadTemplate')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadInfo from '@/components/UploadInfo/index.vue'

@Component({
  name: 'QuestionBankAfqUpload',
  components: {
    UploadInfo
  }
})
export default class extends Vue {}
</script>

<style scoped lang="scss">

</style>
