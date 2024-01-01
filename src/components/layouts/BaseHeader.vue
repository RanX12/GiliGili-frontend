<template>
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
</template>

<script lang="ts" setup>
import { toggleDark } from "~/composables";
</script>
