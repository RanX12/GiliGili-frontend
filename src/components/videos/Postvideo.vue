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
      <el-form-item label="视频封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
          :auto-upload="true"
          :http-request="upload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-progress
          v-if="showPercent"
          style="width: 180px"
          :percentage="percent"
        />
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
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { postVideo } from "@/api/videos";
import { uplpadTokenAPI } from "@/api/upload"
import { Plus } from '@element-plus/icons-vue'
import { CosUtil } from '@/libs/cos-util'


interface RuleForm {
  title: string
  info: string
  cover: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  title: '',
  info: '',
  cover: '',
})
const imageUrl = ref('')
const region = import.meta.env.VITE_TENCENT_OSS_REGION
const bucket = import.meta.env.VITE_TENCENT_OSS_BUCKET
const storePath = import.meta.env.VITE_TENCENT_STORE_PATH
const cdnHost = import.meta.env.VITE_TENCENT_CDN_HOST
const showPercent = ref(false)
const percent = ref(0)
const cosUtil = ref({})


onMounted(() => {
  cosUtil.value = new CosUtil('http://localhost:5173/api/v1/upload/token', bucket, region, storePath, cdnHost)
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

const handleCoverSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeCoverUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const validFileType = ['.png', '.jpg', '.jpeg', '.doc', '.docx', '.pdf']
  const suffix = rawFile.name.substring(rawFile.name.lastIndexOf('.')).toLowerCase()

  if (validFileType.indexOf(suffix.toLowerCase()) < 0) {
    ElMessage.error('Cover picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Cover picture size can not exceed 2MB!')
    return false
  }

  showPercent.value = true
  return true
}

const upload = (params) => {
  console.log('---params:', params)
  cosUtil.value.putCosObject({
    fileKey: "upload/cover/" + params.file.name,
    fileObject: params.file,
    progress: (progressData) => {
      percent.value = params.percent * 100;
    },
    success: (data, params) => {
      imageUrl.value = data.Location
      setTimeout(() => {
        showPercent.value = false; // 隐藏进度条
        percent.value = 0; // 进度归0
      }, 1000);
    },
    error: (err) => {
      console.log('upoad err: ', err)
    }
  })
}
</script>

<style lang="scss">
.post-video {
  h3 {
    text-align: left;
    margin-left: 50px;
  }
}

.avatar-uploader .ep-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .2s;
}

.avatar-uploader .ep-upload:hover {
  border-color: var(--el-color-primary);
}

.ep-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>