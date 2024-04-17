<template>
  <div>
    <fm-making-form ref="makingForm" upload preview generate-code generate-json clearable>
  <template slot="action">
  </template>
</fm-making-form>
  </div>
</template>

<script>
export default {
  created() {
    this.loadLanguage();
  },
  methods: {
    handleHome() {
   this.$router.push({ path: "/" });
 },
 handleLangCommand(command) {
   this.$router.replace({
     name: this.$route.name,
     params: { lang: command },
   });
 },
    loadLanguage() {
      if (this.$route.params.lang == "zh-CN") {
        this.$i18n.locale = "zh-CN";
        localStorage.setItem("language", "zh-CN");
      } else if (this.$route.params.lang == "en-US") {
        this.$i18n.locale = "en-US";
        localStorage.setItem("language", "en-US");
      } else {
        // this.$router.replace({name: this.$route.name, params: {lang: navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US'}})
      }

      this.$route.params.lang == "zh-CN";
    },
  },
  watch: {
    "$route.params.lang": function (val) {
      this.loadLanguage();
    },
  },
};
</script>

<style lang="scss">
.fm-header{
  height: 50px;
  box-shadow: 0 2px 10px rgba(70,160,252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right,#1278f6,#00b4aa);
  position: relative;

  .fm-logo{
    height: 26px;
    vertical-align: middle;
  }
  .fm-title{
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
  .fm-link{
    height: 50px;
    float: right;
    
    a{
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 15px;
      
      &:hover{
        opacity: 0.8;
      }

      &.ad{
        color: #f5dab1;
      }
    }

    .action-item{
      display: inline-block;
      margin-left: 15px;
      .el-dropdown{
        // font-size: 16px;
        // font-weight: 500;
      }
      .el-dropdown-link{
        cursor: pointer;
        color: #fff;

        &:hover{
          opacity: 0.8;
        }
      }

      &.action-item-user{
        .el-dropdown-link{
          color: #f5dab1;
        }
      }
    }
  }
}
.fm-container{
  height: calc(100% - 50px);
}
*, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
html,body{
  height: 100%;
}
</style>
