<template>
  <div>
    <span>门店销售额排名</span>
    <ul>
      <li>
        <span class="rindex">1</span>
        <span>肯德基</span>
        <span class="amount">323,234</span>
      </li>
      <li>
        <span class="rindex">2</span>
        <span>麦当劳</span>
        <span class="amount">323,234</span>
      </li>
      <li>
        <span class="rindex">3</span>
        <span>华莱士</span>
        <span class="amount">323,234</span>
      </li>
      <li>
        <span>4</span>
        <span>海底捞</span>
        <span class="amount">323,234</span>
      </li>
      <li>
        <span>5</span>
        <span>西贝筱面村</span>
        <span class="amount">323,234</span>  
      </li>
      <li>
        <span>6</span>
        <span>汉堡王</span>
        <span class="amount">323,234</span> 
      </li>
      <li>
        <span>7</span>
        <span>真功夫</span>
        <span class="amount">323,234</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'Ranking',
}
</script>

<style scoped>
ul{
  list-style-type: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li{
  height: 8%;
  margin: 10px 0;
}
ul li span{
  padding: 0 8px;
}
.rindex{
  width: 15px;
  height: 15px;
  background: black;
  border-radius: 50%;
  color: #fff;
  text-align: center;
}
.amount{
  float: right;
}
</style>