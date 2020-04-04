<template>
  <div class="manage">
    <!-- 弹出框 -->
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isDialogVisible" width="40%">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :isInline="false"> </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 头部 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUserRow">新增 +</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :isInline="true">
        <el-button type="primary" @click="getList(searchForm.keyword)">查询</el-button>
      </common-form>
    </div>
    <!-- 内容-表格 -->
    <div class="manage-content">
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @editRow="editUserRow"
        @deleteRow="deleteUserRow"
      ></common-table>
    </div>
  </div>
</template>

<script>
import CommonTable from '../../components/CommonTable'
import CommonForm from '../../components/CommonForm'
export default {
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      isDialogVisible: false,
      operateType: 'add',
      operateForm: {
        id: '',
        name: '',
        age: '',
        addr: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期'
        },
        {
          prop: 'addr',
          label: '地址'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      }
    }
  },
  methods: {
    getList(name) {
      // 获取用户管理数据
      this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          // console.log(res.data.list)
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    childChangePage(val) {
      // 这里没有用到此函数，仅供参考
      // 分页按钮操作(从子组件传过来的)
      // console.log(val)
    },
    addUserRow(row) {
      // 新增-按钮
      // console.log(row, 'addUserRow')
      this.operateType = 'add'
      this.operateForm = {
        id: '',
        name: '',
        age: '',
        addr: '',
        birth: '',
        sex: ''
      }
      this.isDialogVisible = true
    },
    editUserRow(row) {
      // 编辑-按钮
      // console.log(row, 'editUserRow')
      this.operateType = 'edit'
      this.operateForm = {
        id: row.id,
        name: row.name,
        age: row.age,
        addr: row.addr,
        birth: row.birth,
        sex: row.sex
      }
      this.isDialogVisible = true
    },
    deleteUserRow(row) {
      // 删除-按钮
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id
          this.$http.get('/api/user/del', { params: { id } }).then(res => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    dialogConfirm() {
      // dialog-确定按钮
      if (this.operateType === 'edit') {
        // 编辑(更新)用户
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          // console.log(res.data, 'dialogConfirm-edit')
          this.isDialogVisible = false
          this.getList()
        })
      } else if (this.operateType === 'add') {
        // 新增用户
        let formData = this.operateForm
        for (let i in formData) {
          if (formData[i] !== '') {
            this.$http.post('/api/user/add', this.operateForm).then(res => {
              // console.log(res.data, 'dialogConfirm-add')
              this.isDialogVisible = false
              this.getList()
              this.$message({
                type: 'success',
                message: '新增用户成功!'
              })
            })
            // 注意：这里必须加return，避免添加多条相同数据！
            return
          } else {
            this.$message({
              type: 'warning',
              message: '请您完整填写信息!'
            })
            // 注意：这里必须加return，避免多次弹出提示！
            return
          }
        }
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common.scss';
.manage-content {
  height: calc(100% - 62px);
  background-color: #ffffff;
}
/deep/.el-dialog .el-input {
  width: 85%;
}
/deep/.el-dialog__title {
  font-weight: 600;
}
</style>
<style lang="scss">
.el-message-box__content {
  font-size: 15px;
}
</style>
