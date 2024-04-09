<template>

  <el-row style="height: 100%">
    <div style="position: fixed;z-index: 1;padding-left: 64px">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="rgb(255,255,255,0)"
        text-color="#fff"
        active-text-color="#fff"
        style="width: 100%;">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
    <div style="position: fixed;z-index: 1;">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
        :collapse="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4" @click="zbck()">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="home"></div>
  </el-row>



</template>

<script>

  import url from "../assets/images/worldimage.jpg";
  import { createPoint, convertC3ToPosition } from "@/utils/cesiumPointUtils";

  export default {
    name: "cesiumView",
    data(){
      return {
        viewer: null,
        imageUrl: url,
        sceneModePicker: true,
        isCollapse: true
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let provider = new Cesium.SingleTileImageryProvider({
          url: this.imageUrl
        });
        this.viewer = new Cesium.Viewer("home", {
          homeButton: true, // 显示home按钮
          sceneModePicker: this.sceneModePicker, // 切换3D、2D、及哥伦布地图
          baseLayerPicker: false, // 影像切换
          animation: true, // 是否显示动画控件
          infoBox: false, // 是否显示点击要素之后的显示的信息
          selectionIndicator: false, // 要素选中框
          geocoder: true, // 是否显示地名查找控件
          timeline: true, // 是否显示时间控件
          baseLayerPicker:false, //选择三维数字地球的底图
          fullscreenButton: true, //全屏组件
          shouldAnimate: false,
          navigationHelpButton: false // 是否显示帮助信息控件
        });
        this.viewer._cesiumWidget._creditContainer.style.display = 'none'; // 隐藏版权信息
        this.viewer.imageryLayers.addImageryProvider(provider);

        // 设置相机
        //设置相机位置、方向，定位至模型
        this.viewer.scene.camera.setView({
          destination: new Cesium.Cartesian3(-2179842.5244151726, 4382614.895477712, 4091343.6810761136),
          orientation: {
            heading: 0.37618302221530087,
            pitch: -0.5853800962750686,
            roll: 1.4348522370255523e-11
          }
        });
      },
      zbck() {
        // this.viewer.scene.globe.depthTestAgainstTerrain = true;
        console.log(this.viewer.canvas);
        let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
        let inViewer = this.viewer;
        handler.setInputAction(function (event) {
          // let position = inViewer.scene.pickPosition(event.position);
          let ray = inViewer.camera.getPickRay(event.position);//获取一条射线
          let position = inViewer.scene.globe.pick(ray, inViewer.scene);
          let point = createPoint(inViewer, position);
          console.log("获取到的坐标：", convertC3ToPosition(inViewer, point));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    height: 100%;
  }
  .el-menu{
    border:0!important;
  }

</style>
