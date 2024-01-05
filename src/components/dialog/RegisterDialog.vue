<template>
  <el-dialog v-model="registerFormVisible" title="注册" @closed="uiStore.hideUI('registerFormVisible')">
    <el-form
    ref="registerFormRef"
    :rules="rules"
    :model="registerForm"
    status-icon
    label-width="120px"
    >
      <el-form-item label="昵称">
        <el-input v-model="registerForm.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="registerForm.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" show-password v-model="registerForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再次确认密码">
        <el-input type="password" show-password v-model="registerForm.password_confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(registerFormRef)">
          立即注册
        </el-button>
        <el-button @click="resetForm(registerFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

import { useUiStore } from '@/store/ui';
import { useUserStore } from "@/store/user"

import type { FormInstance, FormRules } from 'element-plus'
import { register } from "@/api/users";

interface RegisterForm {
  nickname: string
  user_name: string
  password: string
  password_confirm: string
}

const uiStore = useUiStore();
const registerFormVisible = computed(() => uiStore.registerFormVisible);

const userStore = useUserStore();

const registerFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterForm>({
  nickname: '',
  user_name: '',
  password: '',
  password_confirm: ''
})

const rules = reactive<FormRules<RegisterForm>>({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该在 3 到 10之间', trigger: 'blur' },
  ],
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该在 3 到 10之间', trigger: 'blur' },
  ],

  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '长度应该在 6 到 30 之间', trigger: 'blur' },
  ],
  password_confirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 30, message: '长度应该在 6 到 30 之间', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== rules.password[0].value) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      register(registerForm)
        .then((res) => {
          userStore.setUser(res.data)
          uiStore.hideUI('registerFormVisible')
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
