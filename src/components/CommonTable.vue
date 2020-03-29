<template>
  <div class="common-table" style="height: 100%;">
    <el-table :data="tableData" height="calc(100% - 50px)" stripe v-loading="config.loading">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="config.total"
        :current-page.sync="config.page"
        :page-size="20"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit(index, row) {
      this.$emit('editRow', row)
    },
    handleDelete(index, row) {
      this.$emit('deleteRow', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
}
.pagination-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
