<template>
  <!-- vue内置的动画组件 -->
  <transition name="slide">
    <!-- v-show控制元素样式是否显示. 需要某个元素频繁的显示或隐藏，用v-show -->
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{confirmText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType==2" @click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{confirmText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'modal',
  props: {
    // 接收父组件传递的模态框类型：小，中middle，大，表单
    modalType: {
      type: String,
      default: 'form'
    },
    // 模态框标题
    title: String,
    // 按钮类型：1：确定按钮  2：取消按钮  3：确定和取消
    btnType: String,
    // 确定按钮的值
    confirmText: {
      type: String,
      default: '确定'
    },
    // 取消按钮的值
    cancelText: {
      type: String,
      default: '取消'
    },
    // 是否展示弹框
    showModal: Boolean
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/modal.scss';
</style>
