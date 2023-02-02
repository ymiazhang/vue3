<template>
  <div>

    <div>

      <el-carousel :interval="4000" type="card" height="200px" autoplay="true">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
   const imgbox = [{id:0,idView:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F811%2F042615001201%2F150426001201-4.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660187146&t=8f129bd5b50cb420bd9aade1e0defac3'}]

</script>
<style scoped="less">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
 background:url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F811%2F042615001201%2F150426001201-4.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660187146&t=8f129bd5b50cb420bd9aade1e0defac3) no-repeat 100% 100%;
 background-size: 100% 100%;
 

}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

