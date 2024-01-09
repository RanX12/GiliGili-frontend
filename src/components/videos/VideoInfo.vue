<template>
  <div class="video-container-v1">
    <div class="left-container scroll-sticky">
      <div id="viewbox_report" class="video-info-container report-wrap-module report-scroll-module">
        <h1 :title="video.title" class="video-title">{{ video.title }}</h1>
        <div class="video-info-detail">{{ formatTimestamp(video.created_at) }}</div>

        <div id="playerWrap" class="player-wrap">
          <div id="dplayer"></div>
        </div>
      </div>

      <div id="comment" class="comment-m-v1">
        <div class="comment">
          <div class="gili-comment browser-pc">
            <div class="comment-container">
              <div class="reply-header">
                <h3>全部评论</h3>
              </div>
              <div class="reply-content">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DPlayer from 'dplayer';
import { useRoute } from 'vue-router';
import { getVideo } from "@/api/videos";
import { getVideoComment } from "@/api/comments"

const route = useRoute();
const video = ref({});
const videoComments = ref({})

onMounted(async () => {
  const videoId = route.params.id;
  try {
    const response = await getVideo(videoId);
    video.value = response.data;

    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: video.value.video_url,
      },
    });
  } catch (error) {
    console.error('Error fetching video:', error);
  }

  try {
    videoComments.value = await getVideoComment(videoId);
    console.log("videoComments.value: ", videoComments.value);
  } catch (error) {
    console.error('Error fetching video comments:', error);
  }
});

// 将 时间戳格式化为日期：20xx-xx-xx:xx
function formatTimestamp(timestamp) {
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
</script>

<style lang="scss" scoped>
.video-container-v1 {
  width: auto;
  padding: 0 10px;
  
  max-width: 2540px;
  min-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  position: relative;

  .left-container {
    text-align: left;

    .video-info-container {
      .video-info-detail {
        margin-bottom: 20px;
      }
    }

    .comment-m-v1 {
      margin-top: 40px;
    }
  }

  .right-container {
    width: 350px;
    flex: none;
    margin-left: 30px;
    position: relative;
    pointer-events: none;
  }
}
</style>
