<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ github }}</div>
    <div>{{ email }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    // import { mapState } from 'veux' 필수~!
    // Vuex Helper로 간소화 할 수 있다.
    ...mapState('about', [
      'image',
      'name',
      'github',
      'email',
      'phone'
    ])
    // Vuex Helper로 위 코드로 간소화.
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // github() {
    //   return this.$store.state.about.github
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    position: relative;
    width: 240px;
    height: 240px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: white;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
  
</style>