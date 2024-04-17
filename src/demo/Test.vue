<template>
  <div>
    <!-- <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">
      
    </fm-generate-form>

    <el-button type="primary" @click="handleDisabled">Disabled</el-button>
    <el-button type="primary" @click="handleEnabled">Enabled</el-button> -->


    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        jsonData: { "list": [ { "type": "input", "icon": "icon-input", "options": { "width": "100%", "defaultValue": "", "required": false, "dataType": "string", "pattern": "", "placeholder": "", "disabled": false, "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1712175553000_1405" }, "name": "单行文本", "key": "1712175553000_1405", "model": "input_1712175553000_1405", "rules": [ { "type": "string", "message": "单行文本格式不正确" } ] }, { "type": "textarea", "icon": "icon-diy-com-textarea", "options": { "width": "100%", "defaultValue": "", "required": false, "disabled": false, "pattern": "", "placeholder": "", "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1712175554000_8504" }, "name": "多行文本", "key": "1712175554000_8504", "model": "textarea_1712175554000_8504", "rules": [] }, { "type": "number", "icon": "icon-number", "options": { "width": "", "required": false, "defaultValue": 0, "min": 0, "max": 0, "step": 1, "disabled": false, "controlsPosition": "", "remoteFunc": "func_1712175555000_11674" }, "name": "计数器", "key": "1712175555000_11674", "model": "number_1712175555000_11674", "rules": [] }, { "type": "radio", "icon": "icon-radio-active", "options": { "inline": false, "defaultValue": "", "showLabel": false, "options": [ { "value": "Option 1", "label": "Option 1" }, { "value": "Option 2", "label": "Option 2" }, { "value": "Option 3", "label": "Option 3" } ], "required": false, "width": "", "remote": false, "remoteOptions": [], "props": { "value": "value", "label": "label" }, "remoteFunc": "func_1712175557000_54864", "disabled": false }, "name": "单选框组", "key": "1712175557000_54864", "model": "radio_1712175557000_54864", "rules": [] }, { "type": "checkbox", "icon": "icon-check-box", "options": { "inline": false, "defaultValue": [], "showLabel": false, "options": [ { "value": "Option 1" }, { "value": "Option 2" }, { "value": "Option 3" } ], "required": false, "width": "", "remote": false, "remoteOptions": [], "props": { "value": "value", "label": "label" }, "remoteFunc": "func_1712175558000_522", "disabled": false }, "name": "多选框组", "key": "1712175558000_522", "model": "checkbox_1712175558000_522", "rules": [] }, { "type": "time", "icon": "icon-time", "options": { "defaultValue": "", "readonly": false, "disabled": false, "editable": true, "clearable": true, "placeholder": "", "startPlaceholder": "", "endPlaceholder": "", "isRange": false, "arrowControl": true, "format": "HH:mm:ss", "required": false, "width": "", "remoteFunc": "func_1712175560000_73404" }, "name": "时间选择器", "key": "1712175560000_73404", "model": "time_1712175560000_73404", "rules": [] }, { "type": "color", "icon": "icon-color", "options": { "defaultValue": "", "disabled": false, "showAlpha": false, "required": false, "remoteFunc": "func_1712175562000_63677" }, "name": "颜色选择器", "key": "1712175562000_63677", "model": "color_1712175562000_63677", "rules": [] }, { "type": "select", "icon": "icon-select", "options": { "defaultValue": "", "multiple": false, "disabled": false, "clearable": false, "placeholder": "", "required": false, "showLabel": false, "width": "", "options": [ { "value": "Option 1" }, { "value": "Option 2" }, { "value": "Option 3" } ], "remote": false, "filterable": false, "remoteOptions": [], "props": { "value": "value", "label": "label" }, "remoteFunc": "func_1712175564000_39960" }, "name": "下拉选择框", "key": "1712175564000_39960", "model": "select_1712175564000_39960", "rules": [] } ], "config": { "labelWidth": 100, "labelPosition": "right", "size": "small" } },
        editData: {},
        remoteFuncs: {
          
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    methods: {
      handleDisabled () {
        this.$refs.generateForm.disabled(['text4', 'editor'], true)
      },

      handleEnabled () {
        this.$refs.generateForm.disabled('editor', false)
      }
    }
  }
</script>
