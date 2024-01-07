<template>
  <div class="base-header">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/about">关于我们</el-menu-item>
      <template v-if="userStore.isLogged">
        <el-menu-item index="/postvideo">投稿</el-menu-item>
      </template>
      <template v-else>
        <el-menu-item @click="uiStore.showUI('loginFormVisible')">投稿</el-menu-item>
      </template>
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
    </el-menu>
    <div class="content" v-if="!userStore.isLogged">
      <el-button @click="uiStore.showUI('loginFormVisible')">登录</el-button>
      <el-button @click="uiStore.showUI('registerFormVisible')">注册</el-button>
    </div>

    <RegisterDialog />
    <LoginDialog />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { toggleDark } from "~/composables";
import { getCurrentUser } from "@/api/users"
import { useUiStore } from '@/store/ui';
import { useUserStore } from "@/store/user"
import RegisterDialog from '@/components/dialog/RegisterDialog.vue';
import LoginDialog from '@/components/dialog/LoginDialog.vue';


const uiStore = useUiStore();
const userStore = useUserStore();

onBeforeMount(() => {
  getCurrentUser().then((res) => {
    console.log('----res.code: ', res, res.code)
    if (res.code == 0) {
      userStore.setUser(res.data)
    }
  })
})

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
