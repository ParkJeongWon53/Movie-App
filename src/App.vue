<template>
  <Header />

  <!-- 전체영역에서 사용가능한  Router-View 
  연결시켜둔 Home, About 페이지들을 출력된다. -->
  <RouterView />
  <Footer />
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>