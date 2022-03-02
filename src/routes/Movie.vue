<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton ect"></div>
        </div>
      </div>
      <Loader 
        :size="3"
        :z-index="9"
        fixed />
    </template>


    <div
      v-else
      class="movie-details">
      <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>

        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span> {{ score }} </span>
            </div>
          </div>
        </div>

        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
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
    true
  },
  computed: {
    ...mapState('movie', [
      'theMovie',
      'loading'
    ])
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt12334
      id: this.$route.params.id
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === 'N/A') { // 영화 포스터가 없거나 'N/A'(해당사항 없음) 이면, 
        this.imageLoading = false // 로딩 에니메이션을 종료하고, 
        return '' // 빈 문자열을 반환하여 백그라운드 이미지 출력없이 종료.
      }

      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
      .then(() => {
        this.imageLoading = false
      })
      return src
    }
  }
}
</script>

<style lang="scss" scoped>
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


.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px *3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .frating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}

</style>