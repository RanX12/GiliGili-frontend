<template>
  <div class="base-header">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/about">关于我们</el-menu-item>
      <el-menu-item index="/postvideo">投稿</el-menu-item>
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <el-button>登录</el-button>
      <el-button @click="showRegisterForm()">注册</el-button>
    </div>

    <RegisterDialog />
  </div>
</template>

<script lang="ts" setup>
import { toggleDark } from "~/composables";
import { useStore } from 'vuex';
import RegisterDialog from '@/components/dialog/RegisterDialog.vue'; 

const store = useStore();

// 只触发特定的 actions
const showRegisterForm = () => {
  console.log('---showRegisterForm');
  store.dispatch('showUI', 'registerFormVisible');
};

const hideRegisterForm = () => {
  store.dispatch('hideUI', 'registerFormVisible');
};
</script>

<style lang="scss" scoped>
.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--ep-menu-border-color);

  .ep-menu--horizontal.ep-menu {
    border-bottom: unset;
    width: 50%;
  }

  .content {
    margin-right: 40px;
  }
}
</style>
