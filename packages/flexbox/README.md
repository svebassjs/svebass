
# Flexbox

📦 Svelte layout and grid system, heavily inspired by and largely ported from [rebass/reflexbox](https://github.com/rebassjs/rebass/tree/master/packages/reflexbox) for React 🙏.

[![Downloads][downloads-badge]][npm]
[![Version][version-badge]][npm]
[![MIT License][license-badge]](LICENSE.md)
[![system-ui/theme](https://flat.badgen.net/badge/system-ui/theme/black)](https://system-ui.com/theme)

[downloads-badge]: https://flat.badgen.net/npm/dw/@svebass/flexbox
[version-badge]: https://flat.badgen.net/npm/v/@svebass/flexbox
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[npm]: https://npmjs.com/package/@svebass/flexbox

- Primitive components for all your layout needs
- Customize styles inline with the `sx` prop
- Ergonomic responsive array-based values
- Support for component variants
- [Styled System][] props
- Themeable and compatible with the [Theme Specification][]
- Built with [Styled System][]
- Works with [Theme UI][]
- Built with Emotion

## Getting Started

```sh
yarn add @svebass/flexbox
```

```svelte
<script>
  import { Box, Flex } from '@svebass/flexbox';
</script>

<Flex width={[ 1, 1/2]}>
  <Box p={2}>
    Box 1
  </Box>
  <Box p={2}>
    Box 2
  </Box>
</Flex>
```

### `sx` Prop

The `Box` and `Flex` components both accept a `sx` prop that works with no additional setup required.
The `sx` prop is similar to Emotion's `css` prop, but allows you to use values derived from the theme object.

Flexbox follows the [Theme Specification][], which means that any theme created for use with [Theme UI][], [Styled System][], or other similar libraries will work out-of-the-box.
This allows you to share design constraints for typography, color, and layout throughout your application using a theming context.

```svelte
<Box
  sx={{
    p: 4,
    color: 'primary',
  }}
/>
```

Note: to opt-out of theme-based styles, use the `css` prop instead, which will not transform values.

## Theming

Because Flexbox follows the [Theme Specification][], all themes built for use with [Styled System][], [Theme UI][], or other related libraries are compatible with Flexbox.


### Context
Adding a theme to your Svelte app is super simple with Svelte's context API.

```svelte
// Parent.svelte
<script>
  import { setContext } from 'svelte';
  import Child from './Child.svelte';
  
  const theme = {
    breakpoints: [
      '40em', '52em', '64em',
    ],
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#07c',
    },
    space: [
      0, 4, 8, 16, 32, 64, 128, 256,
    ],
  };

  // Set context for children
  setContext('theme', theme);
</script>

<Child />
```

```svelte
// Child.svelte

<script>
  import { Box, Flex } from '@svebass/flexbox';
</script>

<Box
  sx={{
    p: 4,
    bg: 'primary',
  }}>
  Hello
</Box>
```

### Prop
You can also pass a theme directly as a `prop`:
```svelte
<script>
  import { Box, Flex } from '@svebass/flexbox';
  import theme from './theme.js';
</script>

<Box
  theme={theme}
  sx={{
    p: 4,
    bg: 'primary',
  }}
>
  Hello
</Box>
```

## Variants

Flexbox components also accept a `variant` prop, which allows you to define commonly used styles,
such as cards, badges, and CSS grid layouts, in your theme object for reuse.

Add a `variants` object to your theme and include any variants as style objects. These styles can reference other values in your theme such as colors, typographic styles, and more.

```js
// example theme
export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
  },
  radii: {
    default: 4,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  variants: {
    card: {
      p: 3,
      borderRadius: 'default',
      bg: 'white',
      boxShadow: 'card',
    },
    badge: {
      color: 'white',
      bg: 'primary',
      p: 1,
      borderRadius: 'default',
    },
  },
}
```

To apply a variant to your component, pass the name to the `variant` prop.

```jsx
<Box variant='card'>Card</Box>
<Box variant='badge'>Badge</Box>
```

## Responsive Styles

Use array values to quickly and ergonomically add mobile-first responsive styles to specific properties.
This works on all style props and the `sx` prop.
See the [Styled System][] docs for more.

```jsx
// 100% width at the smallest viewport width
// 50% width at the next breakpoint
// 25% width at the next breakpoint
<Box width={[ '100%', '50%', '25%' ]} />
```

You can customize the widths used for each breakpoint by defining a `theme.breakpoints` array in your theme.

## Styled System Props

Flexbox conforms to the [Theme Specification][] and includes many common [Styled System][] props.
The `Box` and `Flex` components accept the following props:

### Space Props

Prop | Theme Key
---|---
`margin`, `m`         | `space`
`marginTop`, `mt`     | `space`
`marginRight`, `mr`   | `space`
`marginBottom`, `mb`  | `space`
`marginLeft`, `ml`  | `space`
`marginX`, `mx`  | `space`
`marginY`, `my`  | `space`
`padding`, `p`         | `space`
`paddingTop`, `pt`     | `space`
`paddingRight`, `pr`   | `space`
`paddingBottom`, `pb`  | `space`
`paddingLeft`, `pl`    | `space`
`paddingX`, `px`  | `space`
`paddingY`, `py`  | `space`

### Layout Props

Prop | Theme Key
---|---
`width` | `sizes`
`height` | `sizes`
`minWidth` | `sizes`
`maxWidth` | `sizes`
`minHeight` | `sizes`
`maxHeight` | `sizes`

### Typography Props

Prop | Theme Key
---|---
`fontFamily` | `fonts`
`fontSize` | `fontSizes`
`fontWeight` | `fontWeights`
`lineHeight` | `lineHeights`
`letterSpacing` | `letterSpacings`
`fontStyle` | N/A
`textAlign` | N/A

### Color Props

Prop | Theme Key
---|---
`color` | `colors`
`backgroundColor`, `bg` | `colors`
`opacity` | N/A

### Flexbox Props

Prop | Theme Key
---|---
`alignItems` | N/A
`alignContent` | N/A
`justifyItems` | N/A
`justifyContent` | N/A
`flexWrap` | N/A
`flexDirection` | N/A
`flex` | N/A
`flexGrow` | N/A
`flexShrink` | N/A
`flexBasis` | N/A
`justifySelf` | N/A
`alignSelf` | N/A
`order` | N/A

## About

This library is the result of consolidating and porting APIs and ergonomics from RebassJS, Flexbox library, Grid Styled, and Rebass Grid.

[MIT License](LICENSE.md)

[theme specification]: https://github.com/system-ui/theme-specification
[styled system]: https://styled-system.com
[theme ui]: https://theme-ui.com
[emotion]: https://emotion.sh
