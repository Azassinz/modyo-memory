import { shallowMount } from '@vue/test-utils';
import App from './App.vue';
import ImageCard from './components/ImageCard.vue';
import WelcomePage from './components/WelcomePage.vue';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        entries: [
          {
            fields: {
              image: {
                url: 'https://images/uploads/bear.jpg',
                uuid: 'f0753a4f-87b2-484d-aeb1-a22c3278cb50',
                title: 'bear'
              }
            }
          },
          {
            fields: {
              image: {
                url: 'https://images/uploads/cat.jpg',
                uuid: 'f0753a4f-87b2-484d-aeb1-a22c3278cb50',
                title: 'cat'
              }
            }
          },
        ]
      })
  })
);

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('If name is empty it renders WelcomPage component', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.findComponent(WelcomePage).exists()).toBe(true);
    expect(wrapper.findComponent(ImageCard).exists()).toBe(false);
  });

  it('If name is set it hides WelcomPage component', async () => {
    const wrapper = shallowMount(App);

    const welcomePage = wrapper.findComponent(WelcomePage);
    expect(wrapper.findComponent(WelcomePage).exists()).toBe(true);
    await welcomePage.vm.$emit('saveName', 'Test');
    expect(wrapper.findComponent(WelcomePage).exists()).toBe(false);
  });
});
