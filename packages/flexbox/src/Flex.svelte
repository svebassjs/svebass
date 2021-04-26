
<script>
  import Box from './Box.svelte';
</script>

<Box {...$$props} display="flex">
  <slot></slot>
</Box>
