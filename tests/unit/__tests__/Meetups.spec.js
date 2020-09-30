import {
  createLocalVue,
  shallowMount,
  mount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Meetups from '@/views/Meetup/Meetups.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

describe('User visits meetups page to see all the meetups', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It makes an API call on lifecycle hook created', async () => {
    //Arrange
    const getters = {
      loadedMeetups: jest.fn(),
    };

    const store = new Vuex.Store({
      getters,
    });
    const wrapper = mount(Meetups, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Assert
    expect(getters.loadedMeetups).toHaveBeenCalledTimes(1);
  });
});