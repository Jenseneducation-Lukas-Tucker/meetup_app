import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup/index.js'
import user from './user/index.js'
import shared from './shared/index.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
modules: {
  meetup: meetup,
  user: user,
  shared: shared
}
})