import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import EditTime from '@/components/EditTime.vue';
import EditDate from '@/components/EditDate.vue';
import EditMeetup from '@/components/EditMeetup.vue';
describe('Dialog', () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    // to render vuetify dialog, vuetify requres the v-app component
    // so we pack our component into a "bridge" component
    const App = localVue.component('App', {
      components: { EditTime },
      data() {
        return { editDialog: false };
      },
      template: `
      <v-app>
        <v-Dialog
          ref="editDialog"
          v-model="editDialog"
        />
      </v-app>
    `,
    });
    wrapper = mount(App, {
      localVue,
      vuetify,
      attachToDocument: true,
    });
  });
  it('should open dialog', async () => {
    wrapper.setData({editDialog: false});
    await wrapper.vm.$nextTick(); // we have to wait until vue rerender the components content
    expect(wrapper.find('[data-testid="dialog-close-button"]').exists()).toBe(true);
  });
});
