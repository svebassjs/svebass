
<script lang="ts">
  import { getContext } from 'svelte';
  import { css as emotionCss } from '@emotion/css'
  import { get, css as styledSystemCss } from '@styled-system/css';
  import { space } from '@styled-system/space';
  import { layout } from '@styled-system/layout';
  import { typography } from '@styled-system/typography';
  import { color } from '@styled-system/color';
  import { flexbox } from '@styled-system/flexbox';

  const tags = ['a', 'button', 'img', 'div'] as const;
  type TagsProps = typeof tags;
  type TagProps = TagsProps[number];

  const parseBase = (__css, theme) => styledSystemCss(__css)(theme)

  const parseSx = (sxProps, theme) => styledSystemCss(sxProps)(theme);
  
  const parseVariant = ({
    theme,
    variant,
    tx = 'variants',
  }) => styledSystemCss(
      get(theme, `${tx}${variant ? `.${variant}` : ''}`,
        get(theme, variant)
      )
    )(theme)

  export let theme: { [index: string]: any } = getContext('theme');
  export let variant: string = undefined;
  export let tx: string = undefined;
  export let sx: { [index: string]: any} = {};
  export let css: { [index: string]: any} = {};
  export let __css: { [index: string]: any} = {}; // Base css
  export let as: TagProps = 'div';

  const className = emotionCss(
    {
      ...parseSx({
        boxSizing: 'border-box',
        ...parseBase(__css, theme),
        ...parseVariant({ theme, variant, tx }),
        ...(sx),
        ...space($$props),
        ...layout($$props),
        ...typography($$props),
        ...color($$props),
        ...flexbox($$props),
      }, theme),
      ...(css || {})
    }
  );
</script>

<!-- Currently no way to dynamically create elements, waiting on this Svelte PR - https://github.com/sveltejs/svelte/pull/5481 -->

{#if as === 'div'}
  <div {...$$props} class={className}>
    <slot></slot>
  </div>
{/if}

{#if as === 'button'}
  <button {...$$props} class={className}>
    <slot></slot>
  </button>
{/if}

{#if as === 'a'}
  <a {...$$props} class={className}>
    <slot></slot>
  </a>
{/if}

{#if as === 'img'}
  <img {...$$props} class={className} />
{/if}