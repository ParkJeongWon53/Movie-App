<template>
  <div class="container">
    <div class="inner">
      <div class="message">
        {{ message }}
      </div>
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie" />
    </div>
  </div>
</template>



<script>
import MovieItem from '~/components/MovieItem'

export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    }
  }
}
</script>