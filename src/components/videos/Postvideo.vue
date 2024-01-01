<template>
  <div class="post-video">
    <h3 class="text-lg">欢迎投稿</h3>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="视频详情" prop="info">
        <el-input v-model="ruleForm.info" type="textarea" :autosize="true" :maxRows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          立即投稿
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { postVideo } from "@/api/videos";

interface RuleForm {
  title: string
  info: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  info: '',
})

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: '请输入视频标题', trigger: 'blur' },
    { min: 3, max: 30, message: '长度应该在 3 到 30之间', trigger: 'blur' },
  ],

  info: [
    { required: false, message: '请输入视频详情', trigger: 'blur' },
    { min: 0, max: 40, message: '长度应该在 0 到 40之间', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      postVideo(ruleForm)
        .then((res) => {
          console.log('res ', res)
          console.log('submit!', fields)
        })
        .catch((err) => {
          console.error('error!', err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style lang="scss" scoped>
.post-video {
  h3 {
    text-align: left;
    margin-left: 50px;
  }
}
</style>