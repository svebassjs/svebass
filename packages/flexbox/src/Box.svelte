
<script lang="ts">
  import { getContext } from 'svelte';
  import { css as emotionCss } from '@emotion/css'
  import { get, css as styledSystemCss } from '@styled-system/css';
  import { space } from '@styled-system/space';
  import { layout } from '@styled-system/layout';
  import { typography } from '@styled-system/typography';
  import { color } from '@styled-system/color';
  import { flexbox } from '@styled-system/flexbox';

  const parseSx = (sxProps, theme) => styledSystemCss(sxProps)(theme);
  
  const parseVariant = ({
    theme,
    variant,
    tx = 'variants',
  }) => styledSystemCss(
      get(theme, tx + '.' + variant,
        get(theme, variant)
      )
    )(theme)

  export let theme: { [index: string]: any } = getContext('theme');
  export let variant: string = undefined;
  export let tx: string = undefined;
  export let sx: { [index: string]: any} = {};
  export let css: { [index: string]: any} = {};

  const className = emotionCss(
    {
      ...parseSx({
        boxSizing: 'border-box',
        ...parseVariant({ theme, variant, tx }),
        ...space($$props),
        ...layout($$props),
        ...typography($$props),
        ...color($$props),
        ...flexbox($$props),
        ...(sx),
      }, theme),
      ...(css || {})
    }
  );
</script>

<div class={className}>
  <slot></slot>
</div>