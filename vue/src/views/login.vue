// src\components\page\login.vue
<template>
  <el-container>
    <el-header>爱和孝</el-header>
    <el-main>
      <div class="login-wrap">
        <div class="ms-login">
          <div class="ms-title">密码登陆</div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="username">
              <el-input v-model="username" placeholder="请输入用户名或手机号" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入登陆密码"
                v-model="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item prop="code">
              <el-input
                v-model="code"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%"
                prefix-icon="el-icon-lock"
              ></el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" />
              </div>
            </el-form-item>-->
            <div class="login-btn">
              <el-button type="primary" @click="submitLoginForm()">登录</el-button>
            </div>
            <el-link type="primary" @click="goFindPwd()" style="text-align:center;float:right">忘记密码？</el-link>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <p>&copy;版权所有 爱和孝</p>
      <p>沪ICP备17018583号</p>
    </el-footer>
  </el-container>
</template>

<script>

import { getCurrentInstance, ref, toRefs, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
export default {
  name: 'login',
  setup (prop, ctx) {
    const store = useStore()
    const { proxy } = getCurrentInstance()
    // 全局cookie
    // proxy.$Cookies.set('isAuthenticated', false)
    let codeUrl = ref('');
    const loginForm = reactive({
      username: 'admin',
      password: '123456',
      code: '',
      uuid: ''
    })
    const rules = reactive({
      username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
      password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
      code: [{ required: false, trigger: 'change', message: '验证码不能为空' }]
    })
    // const getCode = () => {
    //   proxy.$Http.get("auth/code").then(res => {
    //     codeUrl.value = res && res.data.img
    //     loginForm.uuid = res.data.uuid
    //   })
    // }
    // onBeforeMount(() => {
    //   // 获取验证码
    //   //getCode()
    //   // 获取用户名密码等Cookie
    //   //   this.getCookie()
    //   // token 过期提示
    //   //   this.point()
    // })
    const submitLoginForm = () => {
      let data = {
        username: loginForm.username,
        password: proxy.$encrypt(loginForm.password),  // 字段加密
      }
      // 接口调用(注意get和post传参的属性不同params和data)
      proxy.$Http.post("/auth/login", { ...data }).then((result) => {
        if (result.status === 200) {
          store.commit('login/setUserInfo', { ...result.data })
          store.commit('login/setToken', result.data.token)
        }
      })
    }
    const goFindPwd = () => {
      store.commit('login/goFindPwd')
    }

    return {
      ...toRefs(loginForm),
      codeUrl,
      submitLoginForm,
      goFindPwd
    }
  }
}
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-footer {
    font-size: 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #c3cbd6;
    background-color: #fff;
  }
}
.el-main {
  padding: 0px;
  /* text-align: center; */
  color: #333;
  background-color: #e9eef3;
}
.el-header {
  line-height: 60px;
  text-align: center;
  color: #333;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-image: url(../../assets/img/101.png); */
  background-size: 100%;
  background-color: #ccc;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  padding-top: 10px;
  padding-left: 30px;
  font-size: 20px;
  color: #2d333f;
  font-family: "Arial-BoldMT", "Arial Bold", "Arial", sans-serif;
}
.ms-login {
  position: absolute;
  left: 70%;
  top: 50%;
  width: 350px;
  height: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.897);
  overflow: hidden;
  /* border: 1px solid black; */
}
.ms-content {
  padding: 20px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>




