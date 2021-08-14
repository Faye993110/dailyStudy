<template>
  <el-container>
    <el-header>Header</el-header>

    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-menu default-active="2" :collapse="isCollapse" :collapse-transition="false">
          <template v-for="item in mentList" :key="item.path">
            <el-submenu :index="item.path" v-if="item.children">
              <template #title>
                <i :class="'el-icon-'+item.meta.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="li in item.children" :key="li.path" :index="li.path">
                <i :class="'el-icon-'+li.meta.icon"></i>
                <span>{{li.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.path" v-else>
              <i :class="'el-icon-'+item.meta.icon"></i>
              <template #title>{{item.name}}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-container>

        <el-main>Main</el-main>

        <el-footer>
          <p>&copy;版权所有 爱和孝</p>
          <p>沪ICP备17018583号</p>
        </el-footer>
      </el-container>
    </el-container>

  </el-container>
</template>

<script>
import { getCurrentInstance, computed, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "home",
  setup () {
    const { proxy } = getCurrentInstance()
    const store = useStore()

    const state = reactive({
      userInfo: computed(() => store.state.login.userInfo),
      isCollapse: false,
      mentList: [],
    })

    const changeCollapse = () => {
      state.isCollapse = !state.isCollapse
    }

    const getMenu = () => {
      proxy.$Http.get("/api/menus/build").then((result) => {
        state.mentList = result.data || []
      })
    }

    watchEffect(() => {
      getMenu()
    })

    return {
      ...toRefs(state),
      changeCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-menu {
    height: 100%;
  }
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
.el-aside {
  line-height: 200px;
  text-align: center;
  color: #333;
  background-color: #d3dce6;
}
.el-main {
  text-align: center;
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

</style>
