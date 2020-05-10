<template>
  <div class="login-box">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" :loading="loginType" @click="login" keyup.enter.native="login ">{{ loginInfo }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginType: false, // 判断是否正在登陆，防止多次点击登录按钮
      loginInfo: '登录', // 登陆按钮描述
      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  mounted() {
    let that = this
    document.onkeydown = function(e) {
      if (e.keyCode === 13) {
        that.login()
      }
    }
  },
  methods: {
    login() {
      let that = this
      setTimeout(function() {
        that.loginType = true
        that.loginInfo = '登陆中...'
      }, 500)
      setTimeout(function() {
        that.$http.post('api/permission/getMenu', that.form).then(res => {
          res = res.data
          if (res.code === 20000) {
            that.loginInfo = '登陆成功'
            // 先清空，防止二次登陆
            that.$store.commit('clearMenu')
            that.$store.commit('setMenu', res.data.menu)
            that.$store.commit('setToken', res.data.token)
            that.$store.commit('addMenu', that.$router)
            that.$router.push({ name: 'home' })
          } else {
            that.$message.warning(res.data.message)
            that.loginType = false
            that.loginInfo = '登陆'
          }
        })
      }, 2000)
      // this.$store.commit('clearMenu')
      // this.$http.post('api/permission/getMenu', this.form).then(res => {
      //   res = res.data
      //   if (res.code === 20000) {
      //     // 先清空，防止二次登陆
      //     this.$store.commit('clearMenu')
      //     this.$store.commit('setMenu', res.data.menu)
      //     this.$store.commit('setToken', res.data.token)
      //     this.$store.commit('addMenu', this.$router)
      //     this.$router.push({ name: 'home' })
      //   } else {
      //     this.$message.warning(res.data.message)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('../../assets/images/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
.el-form {
  width: 35%;
  min-width: 320px;
  margin: auto;
  padding: 45px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 #333;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.4s;
  &:hover {
    box-shadow: 0 0 15px 0 orange;
  }
}
.el-button {
  position: relative;
  margin-top: 10%;
  padding: 14px 20px;
  width: 50%;
  background-color: #0085d0;
  transition: transform ease-in 0.1s, background-color ease-in 0.1s, box-shadow ease-in 0.25s;
  &::before {
    position: absolute;
    content: '';
    left: -2em;
    right: -2em;
    top: -2em;
    bottom: -2em;
    pointer-events: none;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%),
      radial-gradient(circle, #0085d0 20%, transparent 20%), radial-gradient(circle, #0085d0 20%, transparent 20%);
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 2%, 58% 6%, 80% 2%, 100% 2%, -5% 80%, 98% 55%, 2% 98%, 23% 100%, 42% 93%, 60% 95%,
      70% 92%, 95% 100%;
    background-size: 0% 0%;
    transition: background-position 0.5s ease-in-out, background-size 0.65s ease-in-out;
  }
  &:active {
    transform: scale(0.96);
    /deep/span {
      z-index: 100;
      position: relative;
      transform: scale(0.9);
      font-size: 13px;
    }
  }
  &:active::before {
    transition: 0s;
    background-size: 10% 20%, 20% 22%, 15% 20%, 20% 22%, 18% 20%, 10% 20%, 15% 20%, 10% 20%, 18% 20%, 15% 20%, 20% 20%, 18% 20%, 20% 20%, 15% 20%,
      10% 10%, 20% 20%;
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 60%, 25% 60%, 41% 60%, 50% 60%,
      64% 60%, 80% 65%;
  }
  &.is-loading:before {
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
