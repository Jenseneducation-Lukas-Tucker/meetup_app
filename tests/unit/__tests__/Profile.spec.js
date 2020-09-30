import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
//Libraries
import Vuex from 'vuex';
import Vue from 'vue'
import Vuetify from 'vuetify'
//store
import store from '@/store/user/index.js';
//views
import Profile from '@/views/User/Profile.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex, VueRouter);

describe('CreateMeetup.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    wrapper = mount(Profile, {
      localVue,
      vuetify,
    });
  });
test('It renders correctly and matches snapshot', async () => {
  const wrapper = mount(Profile, {
    store,
    localVue,
    vuetify,
  });
  expect(wrapper.html()).toMatchSnapshot();
});
});