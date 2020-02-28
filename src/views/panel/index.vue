<!--
  @Description:
  @Author: George
  @Date: 2020/2/28 9:49 AM
-->
<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Panel',
  components: {
  }
})
export default class extends Vue {}
</script>

<style scoped lang="scss">

</style>
