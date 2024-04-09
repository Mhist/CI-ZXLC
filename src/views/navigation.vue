<template>
  <el-container>
    <el-main>
      <el-row style="text-align: center">
        <el-col :span="3" v-for="(item, index) in navigationData" :key="index" @click="goTo(item)">
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item.img" class="image">
            <div style="padding: 14px;text-align: center;">
              <el-button type="text" class="button" @click="goTo(item)">{{ item.title }}</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "navigation",
    data() {
      return {
        redirect: undefined,
        navigationData: [
          {
            id: 1,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '后台管理',
            path: '/index'
          },
          {
            id: 2,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '实体库编辑',
            path: '/index'
          },
          {
            id: 3,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '想定编辑',
            path: '/cesiumView'
          },
          {
            id: 4,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '仿真推演',
            path: '/index'
          },
          {
            id: 5,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '人机对抗',
            path: '/index'
          },
          {
            id: 6,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '人人对抗',
            path: '/index'
          },
          {
            id: 7,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '导调控制',
            path: '/index'
          },
          {
            id: 8,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '态势展示',
            path: '/index'
          },
          {
            id: 9,
            img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            title: '效能评估',
            path: '/index'
          }
        ]
      }
    },
    methods: {
      goTo(item) {
        this.redirect = item.path;
        this.$router.push({ path: this.redirect || "/navigation" }).catch(()=>{});
      }
    }
  }
</script>

<style scoped>
  .button {
    padding: 5px;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
