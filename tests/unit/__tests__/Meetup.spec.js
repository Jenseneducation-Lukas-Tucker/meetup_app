import {
  createLocalVue,
  shallowMount,
  mount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Meetup from '@/views/Meetup/Meetup.vue';
import VueRouter from 'vue-router';
import store from '@/store/meetup/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

describe('User visits meetup page to see the meetup clicked on', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('If review button exists', async () => {
    //Arrange
    const wrapper = mount (Meetup, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Assert
    const review = wrapper.find('app-write-review');
    //Assign
    expect(review.exists()).toBe(true);

  });
  test('If register button exists if unauthenticated', async () => {
    //Arrange
    const wrapper = mount (Meetup, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Assert
    const register = wrapper.find('app-register');
    //Assign
    expect(register.exists()).toBe(false);

  });
});