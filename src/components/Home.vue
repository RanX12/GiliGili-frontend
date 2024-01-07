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
            :src="videoCover(video)"
            class="image"
          />
          <div style="padding: 14px">
            <div class="bottom">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="video.info"
                placement="bottom"
              >
                <router-link :to="{ name: 'VideoInfo', params: { id: video.id }}" target="_blank" class="gili-card_info-title">
                  {{ video.title }}
                </router-link>
              </el-tooltip>
              <div class="time">{{ formatTimestampToDateTime(video.created_at) }}</div>
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

// 时间戳格式化
function formatTimestampToDateTime(timestamp) {
  const now = new Date();
  const currentYear = now.getFullYear();

  // 将时间戳从秒转换为毫秒
  const date = new Date(timestamp * 1000);

  // 获取日期的各个部分
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回的月份是从 0 开始的
  const day = date.getDate().toString().padStart(2, '0');

  // 如果是当前年份，只展示 月-日
  if (year === currentYear) {
    return `${month}-${day}`;
  } else { // 反之则展示 年-月-日
    return `${year}-${month}-${day}`;
  }
}


onBeforeMount(() => {
  loadVideos()
})

function videoCover(video) {
  return video?.cover || 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
}
</script>

<style lang="scss" scoped>
.ep-row.home-videos-row {
  display: grid;
  padding: 20px 0;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);

  .bottom {
    text-align: left;

    .ep-tooltip__trigger {
      margin-bottom: 8px;
    }
  }

  .ep-col-8 {
    max-width: 250px;
    flex: 1;
  }

  .image {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }

  a {
    color: #18191C;
    text-decoration: none;
    background-color: transparent;
    transition: color .2s linear;
    cursor: pointer;

    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    &:hover {
      color: #00AEEC;
    }
  }

  a:focus, a:hover, a:active {
    outline: none 0;
  }

  .gili-card_info-title {
    font-size: 15px;
    height: calc(2 * 22px);
  }
}
</style>