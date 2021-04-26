
<script>
  import { getContext } from 'svelte';
  import { css as emotionCss } from '@emotion/css'
  import { get, css } from '@styled-system/css';
  import { space } from '@styled-system/space';
  import { layout } from '@styled-system/layout';
  import { typography } from '@styled-system/typography';
  import { color } from '@styled-system/color';
  import { flexbox } from '@styled-system/flexbox';

  const sx = (sxProps, theme) => css(sxProps)(theme);
  
  const variant = ({
    theme,
    variant,
    tx = 'variants',
  }) => css(
      get(theme, tx + '.' + variant,
        get(theme, variant)
      )
    )(theme)

  const theme = $$props.theme || getContext('theme');

  const className = emotionCss(
    sx({
      boxSizing: 'border-box',
      ...variant({ theme, variant: $$props.variant, tx: $$props.tx }),
      ...space($$props),
      ...layout($$props),
      ...typography($$props),
      ...color($$props),
      ...flexbox($$props),
      ...($$props.sx),
    }, theme)
  );

</script>

<div class={`${className}`}>
  <slot></slot>
</div>
