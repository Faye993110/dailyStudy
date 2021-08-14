<template>
  <div class="slider-check-box">
    <div class="slider-check" :class="rangeStatus ? 'success' : ''">
      <i @mousedown="rangeMove" :class="rangeStatus ? 'el-icon-success' : 'el-icon-d-arrow-right'"></i>
      {{ rangeStatus ? "验证成功" : "按住滑块滑动，拖到最右边" }}
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, ref, toRefs, reactive, onBeforeMount } from 'vue';
export default {
  setup (props) {
    // 1. 定义响应式的数据
    let disX = ref(0)

    let rangeStatus = ref(false);
    // let {
    //   successFun,
    //   successIcon,
    //   successText,
    //   startIcon,
    //   startText,
    //   errorFun,
    //   status
    // } = props;
    //滑块移动
    const rangeMove = (e) => {
      let ele = e.target
      let startX = e.clientX
      let eleWidth = ele.offsetWidth
      let parentWidth = ele.parentElement.offsetWidth
      let MaxX = parentWidth - eleWidth
      if (rangeStatus.value) {
        //不运行
        return false
      }
      document.onmousemove = e => {
        let endX = e.clientX
        disX.value = endX - startX
        if (disX.value <= 0) {
          disX.value = 0
        }
        if (disX.value >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          disX.value = MaxX
        }
        ele.style.transition = '.1s all'
        ele.style.transform = 'translateX(' + disX.value + 'px)'
        e.preventDefault()
      }
      document.onmouseup = () => {
        if (disX.value !== MaxX) {
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(0)'
          //执行成功的函数
          props.errorFun && props.errorFun()
        } else {
          rangeStatus.value = true
          if (status) {
            this.$parent[this.status] = true
          }
          //执行成功的函数
          props.successFun && props.successFun()
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    // 2. 把响应式数据 return 给 Template 使用
    return {
      disX,
      rangeStatus,
      rangeMove
    }
  }

}
</script>
<style lang="scss" scoped>
$blue: #198eeb;
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider-check-box {
  .slider-check {
    background-color: #e9e9e9;
    position: relative;
    transition: 1s all;
    user-select: none;
    color: #585858;
    @include jc-flex;
    height: 40px;
    &.success {
      background-color: $blue;
      color: #fff;
      i {
        color: $blue;
      }
    }
    i {
      position: absolute;
      left: 0;
      width: 50px;
      height: 100%;
      color: $blue;
      background-color: #fff;
      border: 1px solid #d8d8d8;
      cursor: pointer;
      font-size: 24px;
      @include jc-flex;
    }
  }
}
</style>