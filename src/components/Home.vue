<template>
  <div class="home">
    <el-row class="home-videos-row">
      <el-col
        v-for="video in videos"
        :key="video.id"
        :span="8"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{ video.title }}</span>
            <div class="bottom">
              <span>{{ video.info }}</span>
              <time class="time">{{ formatTimestampToDateTime(video.created_at) }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { getVideos } from "@/api/videos";

const videos = ref([]);

function loadVideos() {
  getVideos().then((res) => {
    videos.value = res.data
  })
}

// 将 时间戳格式化为日期：20xx-xx-xx:xx
function formatTimestampToDateTime(timestamp) {
  // 将时间戳从秒转换为毫秒
  const date = new Date(timestamp * 1000);

  // 获取日期的各个部分
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回的月份是从 0 开始的
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // 构造并返回格式化的日期字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onBeforeMount(() => {
  loadVideos()
})
</script>

<style lang="scss" scoped>
.ep-row.home-videos-row {
  display: grid;
  padding: 20px 0;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);

  .bottom {
    display: flex;
    justify-content: space-between;
  }

  .ep-col-8 {
    max-width: 250px;
    flex: 1;
  }
}
</style>