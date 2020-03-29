<template>
  <div>
    <el-form :inline="isInline" :model="form" class="demo-form-inline">
      <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label" label-width="100px">
        <el-input v-model="form[item.model]" placeholder="请输入" v-if="!item.type"></el-input>
        <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
          <el-option v-for="subItem in item.opts" :key="subItem.value" :label="subItem.label" :value="subItem.value"></el-option>
        </el-select>
        <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
        <el-date-picker v-model="form[item.model]" type="date" v-if="item.type === 'date'" placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item> -->
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    isInline: Boolean,
    form: Object,
    formLabel: Array
  }
}
</script>

<style lang="scss" scoped></style>
