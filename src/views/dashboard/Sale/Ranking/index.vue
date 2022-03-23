<template>
  <div>
    <span>门店{{ eventName }}排名</span>
    <ul>
      <li v-for="(user,index) in getUserRank" :key="getUserRank.no">
        <span :class="{rindex: index== 0 || index==1 || index ==2}">{{user.no}}</span>
        <span>{{user.name}}</span>
        <span class="amount">{{user.money}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Ranking",
  data() {
    return {
      // 默认显示销售量
      eventName: "销售量",
    };
  },
  mounted() {
    // 接收sale组件的通知，更改排行榜的标题名称
    this.$bus.$on("clickEvent", (name) => {
      // 若传过来的值sale则显示为销售量，否则为访问量
      name==='sale'?this.eventName='销售量':this.eventName='访问量'
    });
  },

  computed: {
    ...mapGetters('homeStore', ['getUserRank']),

  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
ul li span {
  padding: 0 8px;
}
.rindex {
  width: 15px;
  height: 15px;
  background: black;
  border-radius: 50%;
  color: #fff;
  text-align: center;
}
.amount {
  float: right;
}
</style>