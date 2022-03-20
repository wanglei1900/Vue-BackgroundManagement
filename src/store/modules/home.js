import mockRequest from '@/utils/mockRequest'

const state = {
    saleChartInfo: {}
}
const actions = {
    // 获取销售模块的柱状图
    async getSaleChartInfo({ commit }) {
        let result = await mockRequest.get('/home/list')
        console.log(result);
        if (result.code == 20000) {
            commit('GETSALECHARTINFO', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETSALECHARTINFO (state, saleChartInfo){
      state.saleChartInfo = saleChartInfo
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}