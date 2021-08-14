<template>
  <el-container>
    <el-header>爱和孝</el-header>
    <el-main>
      <div class="goLogin">
        已有账号？
        <el-link type="success" @click="goLogin()" style>快速登陆</el-link>
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <el-form status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <el-steps :active="active" finish-status="success">
            <el-step title="验证手机号"></el-step>
            <el-step title="填写新密码"></el-step>
            <el-step title="重置成功"></el-step>
          </el-steps>
        </el-form-item>
        <el-form-item>
          <el-input type :model="phoneNumber" autocomplete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item>
          <SliderCheck ref="sliderRef" :successFun="handleSuccessFun" :errorFun="handleErrorFun"></SliderCheck>
        </el-form-item>
        <el-form-item>
          <div>为了您的账户安全，请进行安全校验</div>
        </el-form-item>
        <el-form-item>
          <el-button @click="next" style="width:100%">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <p>&copy;版权所有 爱和孝</p>
      <p>沪ICP备17018583号</p>
    </el-footer>
  </el-container>
</template>
<script>
import SliderCheck from '../components/SliderCheck.vue';
import { getCurrentInstance, ref, toRefs, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex'
export default {
  name: 'goFindPwd',
  setup (prop, ctx) {

    const store = useStore()
    const { proxy } = getCurrentInstance()
    // 全局cookie
    // proxy.$Cookies.set('isAuthenticated', false)
    const sliderRef = ref(null)
    const rules = reactive({
      username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
      password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
      code: [{ required: false, trigger: 'change', message: '验证码不能为空' }]
    })
    let active = ref(0);

    const handleSuccessFun = () => {
      console.log('test')
    }
    // 滑块验证失败回调
    const handleErrorFun = () => {

    }
    const goLogin = () => {
      store.commit('login/goBackLogin');
    }
    const next = () => {
      if (active.value++ > 2) active.value = 0;
    }
    return {
      sliderRef,
      active,
      handleSuccessFun,
      handleErrorFun,
      next,
      goLogin
    }
  },
  components: {
    SliderCheck
  }
}
</script>

<style lang="scss" scoped>
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
  position: relative;
  .goLogin {
    position: absolute;
    top: 50px;
    right: 200px;
  }
  .el-form {
    width: 600px;
    margin: auto;
    margin-top: 100px;
  }
}
.el-header {
  line-height: 60px;
  text-align: center;
  color: #333;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
</style>

