import {
  createLocalVue,
  shallowMount,
  mount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Signup from '@/views/user/Signup.vue';
import VueRouter from 'vue-router';
import store from '@/store/user/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

describe('User navigates to the page to log in', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });

  test('It should render the View', async () => {
    const wrapper = mount(Signup, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that all inputs exists', async () => {
    //Arrange
    const wrapper = mount(Signup, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const email = wrapper.find('#email');
    const password = wrapper.find('#password')
    const confirmpassword = wrapper.find('#confirmpassword')
    //Assert
    expect(email.exists()).toBe(true);
    expect(password.exists()).toBe(true);
    expect(confirmpassword.exists()).toBe(true);
  });

  test('Test so that Alert component exists when there is no error', async () => {
    //Arrange
    const wrapper = mount(Signup, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const alert = wrapper.find('[data-testid="alert"]');
    //Assert
    expect(alert.exists()).toBe(false)
  });

  test('Test so that email and password is found', async () => {
    //Arrange
    const wrapper = mount(Signup, {
      store,
      localVue,
      vuetify,
      setData: {
        email: 'Test',
        password: 'Testing'
      }
    });
    //Act
    const email = wrapper.vm.email;
    const password = wrapper.vm.password;

    await wrapper.vm.$nextTick()
    //Assert
    expect(wrapper.vm.email).toBe(email)
    expect(wrapper.vm.password).toBe(password)
  });
});