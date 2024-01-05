<template>
  <el-dialog v-model="loginFormVisible" title="登录" @closed="uiStore.hideUI('loginFormVisible')">
    <el-form
    ref="loginFormRef"
    :rules="rules"
    :model="loginForm"
    status-icon
    label-width="120px"
    >
      <el-form-item label="用户名">
        <el-input v-model="loginForm.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" show-password v-model="loginForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

import { useUiStore } from '@/store/ui';
import { useUserStore } from "@/store/user"

import type { FormInstance, FormRules } from 'element-plus'
import { login } from "@/api/users";

interface LoginForm {
  user_name: string
  password: string
}

const uiStore = useUiStore();
const loginFormVisible = computed(() => uiStore.loginFormVisible);

const userStore = useUserStore();

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  user_name: '',
  password: '',
})

const rules = reactive<FormRules<LoginForm>>({
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该在 3 到 10之间', trigger: 'blur' },
  ],

  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '长度应该在 6 到 30 之间', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      login(loginForm)
        .then((res) => {
          userStore.setUser(res.data)
          uiStore.hideUI('loginFormVisible')
        })
        .catch((err) => {
          console.error('error!', err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
