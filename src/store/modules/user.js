// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块当中重置路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 服务器返回的菜单信息【根据不同的角色，返回的标记信息，数组里面的元素是字符串】
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限的信息
    buttons: [],
    // 对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes: [],
    // 用户最终需要展示全部路由
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

// 修改state的地方
const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 存储用户名
    state.name = userInfo.name
    // 存储用户头像
    state.avatar = userInfo.avatar
    // 菜单权限的标记
    state.routes = userInfo.routes
    // 按钮权限标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    // vuex保存当前用户的异步路由：注意，一个用于需要展示完成路由：长刘昂、异步、任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户需要展示所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 给路由器添加心的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数：两个数组进行对比，对比当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  console.log(asyncRoutes, 111);
  console.log(routes, 222);
  // 过滤出当前用户 【超级管理|普通员工】 需要展示的异步路由
  return asyncRoutes.filter((element) => {
    // routes路由包含有异步路由
    if (routes.indexOf(element.name !== -1)) {
      // 递归:别忘记还有子路由
      if (element.children && element.children.length){
        element.children = computedAsyncRoutes(element.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo
    // ES6写法
    let result = await login({ username: username.trim(), password: password })
    // 注意：当前登录请求现在使用mock数据，mock数据code是20000
    if (result.code === 20000) {
      // vuex存储token
      commit('SET_TOKEN', result.data.token)
      // 本地持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
    // 古老写法
    /* return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }) */
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：返回的数据包含：用户名name 、用户图像avatar、routes返回的标志：不同用户应该展示那些菜单的标记
        const { data } = response
        // vuex存储用户全部的信息
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

