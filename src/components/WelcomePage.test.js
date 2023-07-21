import { shallowMount } from '@vue/test-utils';
import WelcomePage from './WelcomePage.vue';

describe('WelcomePage', () => {
  it('Emits saveName event when hitting enter on input', () => {
    const wrapper = shallowMount(WelcomePage);

    wrapper.find('input').trigger('keyup.enter');
    expect(wrapper.emitted()).toHaveProperty('saveName')
  });
});
