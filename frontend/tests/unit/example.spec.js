import { shallowMount } from '@vue/test-utils';
import TopBar from '../../src/components/top-bar.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(TopBar, {
      propsData: {
        msg
      }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
