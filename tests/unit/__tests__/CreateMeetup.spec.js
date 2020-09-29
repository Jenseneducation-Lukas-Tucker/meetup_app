//Utilities
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
//Libraries
import Vuex from 'vuex';
import Vue from 'vue'
import Vuetify from 'vuetify'
//store
import store from '@/store/meetup/index.js';
//views
import CreateMeetup from '@/views/Meetup/CreateMeetup.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CreateMeetup.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    wrapper = mount(CreateMeetup, {
      localVue,
      vuetify,
      attachToDocument: true,
    });
  });
  it('should render the view and the form', () => {
    // to make sure we are free from vuetify components in our tests, use data-testid attributes to search for elements
    expect(wrapper.find('[data-testid="createmeetup"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="form"]').exists()).toBe(true);
  });
});