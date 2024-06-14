<template>
  <el-dialog :visible.sync="internalDialogVisible" title="嵌套可勾选的表格">
    <draggable v-model="tableData" :group="grpupA"  animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
    <transition-group>
      <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="uuid"
      key="uuid"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    
    </el-table>
    </transition-group>
</draggable> 
   
    <div slot="footer" class="dialog-footer">
      <el-button @click="internalDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="internalDialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as THREE from 'three';
//导入draggable组件
import draggable from 'vuedraggable'
export default {
  name: "EquipmentList",
   //注册draggable组件
  components: {
            draggable,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drag:false,
      internalDialogVisible: this.dialogVisible,
      // //设置:group="grpupA"只能拖出
      grpupA:{
        name:'site',
        pull:true,
        put:false
      },
  
    };
  },
  methods: {
   

    handleRowDrag : (row, event) => {
      event.dataTransfer.setData("text", JSON.stringify(row));
    
      console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeee");
    },
      //开始拖拽事件
     onStart(e){
        this.drag=true;
        console.log(e,"开始拖拽");
      },
      //拖拽结束事件
       onEnd(e) {
       this.drag=false;
       console.log(e,"结束拖拽");
    },
  },
  watch: {
    dialogVisible(newValue) {
      this.internalDialogVisible = newValue;
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些自定义样式 */
</style>
