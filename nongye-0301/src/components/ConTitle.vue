<template>
   <el-card class="box-card">
    <div>
      <span class="title-n" v-if="topTitle.type !== ''"
        >{{ topTitle.type }} /
      </span>
      <span class="title-m">{{ topTitle.text }}</span
      ><span class="title-msg"> - {{ topTitle.msg }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
    name: "ConTitle",
  props: ["topTitle"],
}
</script>

<style lang="scss" scoped>
.title-n {
  color: #b8b8cb;
  font-size: 16px;
}
.title-m {
  font-size: 18px;
  font-weight: bold;
}
.title-msg {
  font-size: 14px;
}
</style>