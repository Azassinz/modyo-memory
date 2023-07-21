import { shallowMount } from '@vue/test-utils';
import ImageCard from './ImageCard.vue';

const defaultProps = { flipped: false, image: 'http://image.jpg', number: 1, selected: false };

const buildWrapper = (props = {}) => {
  return shallowMount(ImageCard, {
    propsData: { ...defaultProps, ...props }
  });
};

describe('ImageCard', () => {
  it('Receives props and renders default state', () => {
    const wrapper = buildWrapper();

    expect(wrapper.props().flipped).toBe(defaultProps.flipped);
    expect(wrapper.props().image).toBe(defaultProps.image);
    expect(wrapper.props().number).toBe(defaultProps.number);
    expect(wrapper.props().selected).toBe(defaultProps.selected);

    expect(wrapper.get('[data-test="number"]').text()).toBe('1');
    expect(wrapper.find('[data-test="image"]').exists()).toBe(false);
  });

  it('If flipped is true renders img tag', () => {
    const wrapper = buildWrapper({ flipped: true });

    expect(wrapper.get('[data-test="image"]').attributes('src')).toBe(defaultProps.image);
  });

  it('If selected prop changes to true, hides p tag renders img tag', async () => {
    const wrapper = buildWrapper();

    expect(wrapper.props().flipped).toBe(defaultProps.flipped);
    expect(wrapper.props().image).toBe(defaultProps.image);
    expect(wrapper.props().number).toBe(defaultProps.number);
    expect(wrapper.props().selected).toBe(defaultProps.selected);

    expect(wrapper.get('[data-test="number"]').text()).toBe('1');
    expect(wrapper.find('[data-test="image"]').exists()).toBe(false);

    await wrapper.setProps({ selected: true });

    expect(wrapper.find('[data-test="number"]').exists()).toBe(false);
    expect(wrapper.get('[data-test="image"]').attributes('src')).toBe(defaultProps.image);
  });
});
