<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  created() {
    this.$toast({
      type: "success",
      size: "default",
      message: "成功提示",
      duration: 3000,
    });
  },
};
</script>
