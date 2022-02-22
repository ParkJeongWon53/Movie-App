<template>
  <h1 class="container">
    <div class="skeletons">
      <div class="skeleton poster"></div>
      <div class="specs">
        <div class="skeleton title"></div>
        <div class="skeleton spec"></div>
        <div class="skeleton plot"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
      </div>
    </div>
  </h1>
</template>

<script>
export default {
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt12334
      id: this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

  .container {
    padding-top: 40px;
  }
  .skeletons {
    display: flex;
    .poster{
      flex-shrink: 0; // 감소너비 사용안함
      width: 500px;
      height: 500px * 3/2;
      margin-right: 70px;
    }
    .specs{
      flex-grow: 1; // 중가너비 최대 사용.
    }
    .skeleton {
      border-radius: 10px;
      background-color: $gray-200;
      &.title{
        width: 80%;
        height: 70px;
      }
      &.spec{
        width: 60%;
        height: 30px;
        margin-top: 20px;
      }
      &.plot{
        width: 100%;
        height: 250px;
        margin-top: 20px;
      }
      &.etc{
        width: 50%;
        height: 50px;
        margin-top: 20px;
      }
    }
  }
</style>