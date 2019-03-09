<template>
  <el-menu class="navbar" mode="horizontal">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="hello">
          <!-- <template scope="scope"> -->
            <span style="margin-right: 30px;">欢迎您！</span>
          <!-- </template> -->
        </div>
        <img class="user-avatar" src="../../assets/ying.jpg">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/index/readme">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <a target='_blank' href="https://github.com/fighting-girls/bright-night">
          <el-dropdown-item>
            项目地址
          </el-dropdown-item>
        </a>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
<!--   <div class="hello">
    {{ name }}vuex获取数据未实现
    
  </div> -->

</template>

<script>
  // import { mapGetters } from 'vuex';

  export default {
    components: {
    },
    data() {
      return {
        hello:'管理员'
      };
    },
    methods: {
      logout() {
        this.$router.push("/");
      }
    }
  };
</script>

<style scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 45px;
  }
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    display: inline-flex;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: -25px;
    top: 20px;
    font-size: 12px;
  }
</style>