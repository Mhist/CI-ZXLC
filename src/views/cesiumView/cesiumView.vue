<template>
  <div class="cesiumContainer">
    <div key="uuid2" id="home" class="homeContainer"></div>
    <el-row class="menu">
      <el-button @click="handleEquipment">弹窗(内嵌可拖拽列表项)</el-button>
      <div>
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          background-color="rgb(255,255,255,0)"
          text-color="#fff"
          active-text-color="#fff"
          style="width: 100%"
        >
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
          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item
          >
        </el-menu>
      </div>
      <div>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @open="handleOpen"
          @close="handleClose"
          :collapse="true"
        >
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
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="嵌套可勾选的表格">
      <el-table
        class="dragTableList"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="uuid"
        key="uuid"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="日期" width="120">
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="model" label="Model">
          <template slot-scope="scope">
            <div ref="modelContainer" class="model-container"></div>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from "../../assets/images/worldimage.jpg";
import profile from "../../assets/images/profile.jpg";
import { createPoint, convertC3ToPosition } from "@/utils/cesiumPointUtils";
import "cesium/Build/Cesium/Widgets/widgets.css";

import Sortable, { create } from "sortablejs";
import { Material } from "three";
let viewer;
export default {
  name: "cesiumView",
  components: {},

  data() {
    return {
      tableData: [
        {
          uuid: "13AC3FE2-F6BC-2287-24EF-2EC62015177F",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          img: "",
        },
        {
          uuid: "B267864B-63F5-4EB2-D731-D3E6ABD9D34F",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          img: "",
        },
        {
          uuid: "9EFA451D-0A34-429D-DBEE-FF75447CE371",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          img: "",
        },
        {
          uuid: "99889895-4D41-240C-2004-F50A1E0CF3F8",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          img: "",
        },
      ],
      multipleSelection: [],
      arr2: [],
      drag: false,
      viewer: null,
      imageUrl: url,
      sceneModePicker: true,
      isCollapse: true,
      dialogVisible: false, // 用于控制EquipmentList组件的显示与隐藏
      groupB: {
        name: "site",
        pull: true,
        put: true,
      },
    };
  },
  mounted() {
    this.init();
    this.$nextTick(function () {
      //  仅在整个视图都被重新渲染之后才会运行的代码
      this.rowDrop();
    });
  },
  /** 生命周期函数 */
  updated: function () {
    this.$nextTick(function () {
      //  仅在整个视图都被重新渲染之后才会运行的代码
      this.rowDrop();
    });
  },
  methods: {
    rowDrop() {
      console.log("rowDrop", "**************");
      const cesiumDragElement = document.querySelector(".homeContainer");
      new Sortable.create(cesiumDragElement, {
        animation: 100,
        group: "shared",
        ghostClass: "ghostClass",
        delay: 20,
        put: true,
        sort: false,
      });

      const equipDragElement = document.querySelector(
        ".dragTableList .el-table__body-wrapper tbody"
      );
      new Sortable.create(equipDragElement, {
        group: "shared",
        ghostClass: "ghostClass",
        delay: 20,
        pull: true,
        clone: true,
        onEnd: (evt) => {
          console.log(evt, "evt");
          let oldIndex = evt.oldIndex;
          let dragItem = this.tableData[oldIndex];
          console.log(dragItem, "dragItem");
          this.handleFlyTo();
          this.dialogVisible = false;
        },
      });
    },
    handleFlyTo() {
      // viewer
      let position = new Cesium.Cartesian3.fromDegrees(116.40,39.90,0);
      this.viewer.entities.add({
      position: position,
      billboard: {
        // 图像地址，URI或Canvas的属性
        image: require('../../assets/images/profile.jpg'),
        // 设置颜色和透明度
        color: Cesium.Color.WHITE.withAlpha(0.8),
        // 高度（以像素为单位）
        height: 100,
        // 宽度（以像素为单位）
        width: 500,
        // 逆时针旋转
        rotation: 0,
        // 大小是否以米为单位
        sizeInMeters: false,
        // 相对于坐标的垂直位置
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        // 相对于坐标的水平位置
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
        pixelOffset: new Cesium.Cartesian2(10, 0),
        // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
        scale: 1.0,
        // 显示在距相机的距离处的属性，多少区间内是可以显示的
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1500),
        // 是否显示
        show: true
      }
    });


      // 跳转
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.40,39.90,0),
        orientation: {
          heading: Cesium.Math.toRadians(175.0),
          pitch: Cesium.Math.toRadians(-35.0),
          roll: 0.0,
        },
      });
    },
    init() {
      let provider = new Cesium.SingleTileImageryProvider({
        url: this.imageUrl,
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
        baseLayerPicker: false, //选择三维数字地球的底图
        fullscreenButton: true, //全屏组件
        shouldAnimate: false,
        navigationHelpButton: false, // 是否显示帮助信息控件
        
      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权信息
      this.viewer.imageryLayers.addImageryProvider(provider);

      // 设置相机
      //设置相机位置、方向，定位至模型
      this.viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          -2179842.5244151726,
          4382614.895477712,
          4091343.6810761136
        ),
        orientation: {
          heading: 0.37618302221530087,
          pitch: -0.5853800962750686,
          roll: 1.4348522370255523e-11,
        },
      });
    },
    zbck() {
      // this.viewer.scene.globe.depthTestAgainstTerrain = true;
      console.log(this.viewer.canvas);
      let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      let inViewer = this.viewer;
      handler.setInputAction(function (event) {
        // let position = inViewer.scene.pickPosition(event.position);
        let ray = inViewer.camera.getPickRay(event.position); //获取一条射线
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
    },

    handleEquipment() {
      console.log("handleEquipment");
      this.dialogVisible = !this.dialogVisible;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //开始拖拽事件
    onStart(e) {
      this.drag = true;
      console.log(e, "开始拖拽");
    },
    //拖拽结束事件
    onEnd(e) {
      this.drag = false;
      console.log(e, "结束拖拽");
    },
  },
};
</script>

<style lang="scss" scoped>
.cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;

  .menu {
    position: absolute;
    top: 10px;
    z-index: 1;
  }
}
.el-menu {
  border: 0 !important;
}
</style>
