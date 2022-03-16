<template>
  <div>
    <el-row :gutter="10">
        <!-- 第一个card -->
        <el-col :span="6">
            <el-card>
                <Detail title="总销售额" header="￥126560">
                    <template v-slot:body>
                        <span>
                            周同比&nbsp;&nbsp;56.67%
                            <svg t="1647271279497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4867" width="16" height="16"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM690 624h-46.9c-10.2 0-19.9-4.9-25.9-13.2L512 465.4 406.8 610.8c-6 8.3-15.6 13.2-25.9 13.2H334c-6.5 0-10.3-7.4-6.5-12.7l178-246c3.2-4.4 9.7-4.4 12.9 0l178 246c3.9 5.3 0.1 12.7-6.4 12.7z" p-id="4868" fill="#1afa29"></path></svg>
                        </span>&nbsp;&nbsp;
                        <span>
                            日同比&nbsp;&nbsp;19.16%
                            <svg t="1647271426878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5139" width="16" height="16"><path d="M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6 406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z" p-id="5140" fill="#d81e06"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="5141" fill="#d81e06"></path></svg>
                        </span>
                    </template>
                    <template v-slot:footer>
                        <span>日销售额 ￥122433</span>
                    </template>
                </Detail> 
            </el-card>
        </el-col>

        <!-- 第二个card -->
        <el-col :span="6">
            <el-card>
                <Detail title="访问量" header="88460">
                    <template v-slot:body>
                        <lineChart></lineChart>
                    </template>
                    <template v-slot:footer>
                        <span>日访问量 1234</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>

        <!-- 第三个card -->
        <el-col :span="6">
            <!-- 第二个card -->
            <el-card>
                <Detail title="支付笔数" header="88460">
                    <template v-slot:body>
                        柱形图
                    </template>
                    <template v-slot:footer>
                        <span>转化率  65%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>

        <!-- 第四个card -->
        <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" header="78%">
                    <template v-slot:body>

                    </template>
                    <template v-slot:footer>
                        <span>
                            周同比&nbsp;&nbsp;12%
                            <svg t="1647271279497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4867" width="16" height="16"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM690 624h-46.9c-10.2 0-19.9-4.9-25.9-13.2L512 465.4 406.8 610.8c-6 8.3-15.6 13.2-25.9 13.2H334c-6.5 0-10.3-7.4-6.5-12.7l178-246c3.2-4.4 9.7-4.4 12.9 0l178 246c3.9 5.3 0.1 12.7-6.4 12.7z" p-id="4868" fill="#1afa29"></path></svg>
                        </span>&nbsp;&nbsp;
                        <span>
                            日同比&nbsp;&nbsp;11%
                            <svg t="1647271426878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5139" width="16" height="16"><path d="M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6 406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z" p-id="5140" fill="#d81e06"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="5141" fill="#d81e06"></path></svg>
                        </span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>

  </div>
</template>

<script>
import Detail from "@/views/dashboard/Card/Detail";
import lineChart from '@/views/dashboard/Card/lineChart'

export default {
  name: "Card",
  components: { Detail,lineChart },
};
</script>

<style scoped>
</style>
