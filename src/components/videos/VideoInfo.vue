<template>
  <div>
    <!-- 视频详情内容 -->
    <span>{{ video.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getVideo } from "@/api/videos";


const route = useRoute();
const video = ref({});

onMounted(async () => {
  const videoId = route.params.id;
  try {
    const response = await getVideo(videoId);
    video.value = response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
  }
});
</script>
