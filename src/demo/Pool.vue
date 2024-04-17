<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">
      
    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        jsonData: {"list":[{"type":"grid","icon":"icon-grid-","columns":[{"span":12,"list":[{"type":"number","icon":"icon-number","options":{"width":"","required":false,"defaultValue":0,"min":0,"max":0,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_1708589353000_69021"},"name":"数量","key":"1708589353000_69021","model":"number","rules":[]}]},{"span":12,"list":[{"type":"time","icon":"icon-time","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","isRange":false,"arrowControl":true,"format":"HH:mm:ss","required":false,"width":"","remoteFunc":"func_1708589358000_44906"},"name":"时间选择器","key":"1708589358000_44906","model":"time_1708589358000_44906","rules":[]}]}],"options":{"gutter":0,"justify":"start","align":"top","remoteFunc":"func_1708589350000_89878"},"name":"栅格布局","key":"1708589350000_89878","model":"grid_1708589350000_89878","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"1","required":false,"dataType":"string","pattern":"","placeholder":"请输入测试内容","disabled":false,"maxlength":99,"showWordLimit":true,"remoteFunc":"func_1708589286000_35987"},"name":"测试","key":"1708589286000_35987","model":"test","rules":[{"type":"string","message":"测试格式不正确"}]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}},
        editData: {},
        remoteFuncs: {
          
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.generateForm.getData().then(data => {
            console.log(data,"data");
          // data check success
          // data - form data
        }).catch(e => {
          // data check failed
        })
      }
    }
  }
</script>