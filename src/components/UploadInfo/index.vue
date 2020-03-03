<!--
  @Description:
  @Author: George
  @Date: 2020/2/27 10:09 PM
-->
<template>
  <div class="info-upload-container">
    <el-button
      v-waves
      type="primary"
      icon="el-icon-download"
    >
      {{ btnText }}
    </el-button>
    <el-upload
      class="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        {{ $t('downloadTemplateTip') }}<em> {{ $t('download') }}</em>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'UploadInfo',
  components: {
  }
})

export default class extends Vue {
  @Prop({ required: true }) private btnText!: string
}
</script>

<style scoped lang="scss">
.info-upload-container {
  position: relative;
  padding-top: 16px;
  text-align: center;
  .upload {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 360px;
    height: 180px;
    margin: 80px auto;
  }
}
</style>
