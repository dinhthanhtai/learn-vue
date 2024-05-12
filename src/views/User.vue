<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <h1>This is vue {{ username }}</h1>
  </div>
</template>

<script>
export default {
  props: ["username"],
};
</script>
