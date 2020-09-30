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
    wrapper = mount(CreateMeetup, {
      localVue,
      vuetify,
      attachToDocument: true,
    });
  });
  test('should render the view and the form', () => {
    // to make sure we are free from vuetify components in our tests, use data-testid attributes to search for elements
    expect(wrapper.find('[data-testid="createmeetup"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="form"]').exists()).toBe(true);
  });

  test('Test so that all input types are properly v-modeled in state', async () => {
    //Arrange
    const state = {
        loadedMeetups: {
        title: 'Testing this',
        description: 'Testing description',
        location: 'Testing Location',
      },
    };
    const store = new Vuex.Store({
      state
    });

    const wrapper = mount(CreateMeetup, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const title = wrapper.find('#title');
    const description = wrapper.find('#description');
    const location = wrapper.find('#location');

    title.setValue('Testing this');
    description.setValue('Testing description');
    location.setValue('Testing Location');
    await wrapper.vm.$nextTick();
    //Assert
    expect(store.state.loadedMeetups.title).toBe(title.element.value);
    expect(store.state.loadedMeetups.description).toBe(description.element.value);
    expect(store.state.loadedMeetups.location).toBe(location.element.value);
  });
  test('Test so that validation is in place and createMeetup does go through if fields are filled in and valid', async () => {
    //Arrange

    const wrapper = mount(CreateMeetup, {
      store,
      localVue,
      vuetify,
      setData: {
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: '',
        id: ''
      },
    });
    //Act
    const title = wrapper.find('#title');
    const description = wrapper.find('#description');
    const location = wrapper.find('#location');
    const time = wrapper.find('#time');
    const date = wrapper.find('#date');
    const button = wrapper.find('#createmeetupbtn');

    title.element.value = 'Testing this';
    description.element.value = 'Testing events in testing, testception';
    location.element.value = 'Testing Lane 123';
    
    date.element.value = '2020-09-03';
    
    button.trigger('click');
    await wrapper.vm.$nextTick();

    //Assert
    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.description).toBe('');
    expect(wrapper.vm.location).toBe('');
    expect(wrapper.vm.date).toBe('');

  });
  it('should emit an event when the action v-btn is clicked',async () => {
    const wrapper = mount(CreateMeetup, {
      localVue,
      vuetify,
    })

    const onCreateMeetup = jest.fn()
    const button = wrapper.find('.v-btn')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('click', onCreateMeetup)

    expect (onCreateMeetup).toHaveBeenCalledTimes(0)
});
});