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
              <div class="comment-header">
                <h3>全部评论</h3>
              </div>
              <div class="comment-content">
                <div
                  class="comment-list"
                  v-for="comment in videoComments"
                  :key="comment.id"
                >
                  <div class="comment">
                    <div class="comment-sub">
                      <router-link :to="{ name: 'ChatMessage', params: { id: comment.user.id }}" target="_blank" class="gili-card_info-title">
                        <!-- <a class="no-underline" href="javascript:void(0);"> -->
                          <el-avatar :size="50" :src="comment.user.avatar" />
                        <!-- </a> -->
                      </router-link>
                    </div>
                    <div class="comment-primary">
                      <div class="comment-main">
                        <div class="user-info">
                          <a class="no-underline" href="javascript:void(0);">
                            <div class="user-name">
                              <span class="name">{{ comment.user.nickname }}</span>
                              <span class="rank">v1</span>
                            </div>
                          </a>
                          <span class="address">来自广东</span>
                        </div>

                        <!-- 内容 -->
                        <div class="content">{{ comment.content }}</div>
                        <div class="action-box select-none">
                          <div class="item">
                            <el-icon><Star /></el-icon>
                            <span>11</span>
                          </div>
                          <div class="item">
                            <el-icon><ChatLineRound /></el-icon>
                            <span>回复</span>
                          </div>
                        </div>
                      </div>

                      <div class="reply-box">
                        <div class="reply-list">
                          <div class="comment reply" v-for="reply in comment.replies">
                            <div class="comment-sub">
                              <a class="no-underline" href="javascript:void(0);">
                                <el-avatar :size="50" :src="comment.user.avatar" />
                              </a>
                            </div>
                            <div class="comment-primary">
                              <div class="comment-main">
                                <div class="user-info">
                                  <a class="no-underline" href="javascript:void(0);">
                                    <div class="user-name">
                                      <span class="name">{{ reply.user.nickname }}</span>
                                      <span class="rank">v1</span>
                                    </div>
                                  </a>
                                  <span class="address">来自广东</span>
                                </div>
        
                                <!-- 内容 -->
                                <div class="content">{{ reply.content }}</div>
                                <div class="action-box select-none">
                                  <div class="item">
                                    <el-icon><Star /></el-icon>
                                    <span>11</span>
                                  </div>
                                  <div class="item">
                                    <el-icon><ChatLineRound /></el-icon>
                                    <span>回复</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import { Star, ChatLineRound } from '@element-plus/icons-vue'

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

  getVideoComment(videoId)
    .then((result) => {
      videoComments.value = result.data;
    })
    .catch((err) => {
      console.error('Error fetching video comments:', error);
    })
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

    .comment-container {
      background-color: #ffffff;
      color: #303133;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 25px 20px;
      margin-top: 15px;
    }

    .comment-m-v1 {
      margin-top: 40px;

      .comment {
        display: flex;
        padding: 16px 0;

        .gili-comment {
          width: 100%; 
        }

        &-sub {

        }

        &-primary {
          flex: 1;
          margin-left: 16px;
          overflow: hidden;
        }

        &-main {
          margin-right: 12px;

          .user-info {
            display: flex;
            align-items: center;

            .user-name {
              display: flex;
              align-items: center;

              .name {
                max-width: 10em;
                font-weight: 500;
                font-size: 15px;
                color: #303133;
                line-height: 32px;
                margin-right: 4px;
              }
            }

            .address {
              color: rgb(147, 147, 147);
              font-size: 12px;
            }
          }

          .action-box {
            display: flex;
            align-items: center;
            position: relative;

            .item {
              display: flex;
              align-items: center;
              margin-right: 16px;
              line-height: 22px;
              font-size: 14px;
              cursor: pointer;
              color: #909399;
            }
          }
        }

        .reply-box {
          margin-top: 16px;
          background: #f7f7f7;
          color: #606266;

          padding: 0 25px 20px;
        }
      }
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
