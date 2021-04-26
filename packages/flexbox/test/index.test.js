import { render as svelteRender } from '@testing-library/svelte';
import { matchers } from '@emotion/jest';
import Box from '../src/Box.svelte';
import Flex from '../src/Flex.svelte';

expect.extend(matchers);

const render = (component, args) => {
  const res = svelteRender(component, args);
  const { container } = res;
  return container.children[0].children[0];
};

describe('Box', () => {
  test('renders', () => {
    const el = render(Box);

    expect(el.nodeName).toBe('DIV');
  });

  // TODO: Render with "as" prop

  test('renders with styles props', () => {
    const el = render(Box, { props: { width: 1 } });

    expect(el).toHaveStyleRule('width', '100%');
  });

  test('renders with layout props', () => {
    const el = render(Box, {
      props: {
        display: 'inline-block',
        height: 256,
        maxWidth: 768,
      },
    });

    expect(el).toHaveStyleRule('display', 'inline-block');
    expect(el).toHaveStyleRule('height', '256px');
    expect(el).toHaveStyleRule('max-width', '768px');
  });

  test('renders with color props', () => {
    const el = render(
      Box, { props: { color: 'tomato', bg: 'black' } },
    );

    expect(el).toHaveStyleRule('color', 'tomato');
    expect(el).toHaveStyleRule('background-color', 'black');
  });

  test('renders with typography props', () => {
    const el = render(
      Box, {
        props: {
          fontSize: 3, lineHeight: 1.5, fontWeight: 'bold', letterSpacing: '0.2em',
        },
      },
    );

    expect(el).toHaveStyleRule('font-size', '20px');
    expect(el).toHaveStyleRule('line-height', '1.5');
    expect(el).toHaveStyleRule('font-weight', 'bold');
    expect(el).toHaveStyleRule('letter-spacing', '0.2em');
  });

  test('renders with flexbox props', () => {
    const el = render(
      Box, {
        props: {
          flex: '1 1 auto', alignSelf: 'flex-start',
        },
      },
    );

    expect(el).toHaveStyleRule('flex', '1 1 auto');
    expect(el).toHaveStyleRule('align-self', 'flex-start');
  });

  test('renders with box-sizing', () => {
    const el = render(
      Box,
    );

    expect(el).toHaveStyleRule('box-sizing', 'border-box');
  });

  test('renders with sx prop', () => {
    const el = render(
      Box, { props: { sx: { borderRadius: 2, border: '1px solid cyan' } } },
    );

    expect(el).toHaveStyleRule('border-radius', '2px');
    expect(el).toHaveStyleRule('border', '1px solid cyan');
  });

  test('renders with variants', () => {
    const el = render(Box, {
      props: {
        variant: 'card',
        theme: {
          variants: {
            card: {
              p: 4,
              border: '1px solid tomato',
              borderRadius: 2,
            },
          },
        },
      },
    });

    expect(el).toHaveStyleRule('padding', '32px');
    expect(el).toHaveStyleRule('border', '1px solid tomato');
    expect(el).toHaveStyleRule('border-radius', '2px');
  });

  test('renders with keyed variants', () => {
    const el = render(Box, {
      props: {
        variant: 'primary',
        tx: 'buttons',
        theme: {
          buttons: {
            primary: {
              color: 'white',
              bg: 'tomato',
            },
          },
        },
      },
    });

    expect(el).toHaveStyleRule('color', 'white');
    expect(el).toHaveStyleRule('background-color', 'tomato');
  });
});

describe('Flex', () => {
  test('renders with display flex', () => {
    const el = render(
      Flex,
    );
    expect(el).toHaveStyleRule('display', 'flex');
  });

  test('renders with Box props', () => {
    const el = render(Flex, { props: { color: 'tomato' } });
    expect(el).toHaveStyleRule('color', 'tomato');
  });
});
