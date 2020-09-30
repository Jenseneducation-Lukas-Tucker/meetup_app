import {
  createLocalVue,
  shallowMount,
  mount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '@/views/Home.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

describe('home page to see all the meetups in circus', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It makes an API call on lifecycle hook created', async () => {
    //Arrange
    const getters = {
      featuredMeetups: jest.fn(),
    };

    const store = new Vuex.Store({
      getters,
    });
    const wrapper = mount(Home, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Assert
    expect(getters.featuredMeetups).toHaveBeenCalledTimes(1);
  });
});