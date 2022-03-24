# 독학과정 인터넷강의 
# Vue3 영화검색 사이트 
https://modest-wozniak-58eb16.netlify.app

## Installation

```bash
# Vue Router (페이지 관리)
$ npx i vue-router@4



# Start!
$ cd DIRECTORY_NAME
$ npm i
$ npm run dev
```



## Packages

__페키지__:  패키지<br>

## 주의사항!

- `주의사항` 작성




```json

```
```json

```

-----------------------
# 폰트설정, 로고설정, nav설정,Headline 설정
## 구글폰트
```bash
# Roboto
Regular 400
Bold 700

# Oswald
Medium 500
```
## Logo
```json
<template>
  <RouterLink
    to="/"
    class="logo">
    OMDbAPI.COM
  </RouterLink>
</template>
```
# Headline 설정
컨텐츠를 중앙에 간격을 두고 사용하기 위해 inner를 주로 사용하였지만 지금 프로젝트는 getbootstrap 을 사용하기때문에 getbootstrap 에서 지원하는 container 를 활용해보자!!<br>
https://getbootstrap.com/docs/5.1/layout/containers/
```json
<template>
  <div class="container">
    <h1>
      <span>OMDb API</span><br />
      THE OPEN<br />
      MOVIE DATABASE
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>
```



-----------------------
# Search 필터,
## Search 필터
### 최신년도 설정

```json
name: 'year',
items: (() => {
  const years = []
  const thisYear = new Date().getFullYear // 최신년도

  for (let i = thisYear; i >= 1980; i -=1){
    years.push(i)
  }
  return years
```
### Search 버튼
```json
// http 요청
npm i axios
```
### Vuex
중앙집중식 상태관리 패턴
Store 개념!<br>
prop이나 ref 등으로 컴포넌트 간 데이터(상태)를 공유할 수 있는데 굳이 Vuex가 필요한 이유

+ 공통의 상태를 공유하는 여러 컴포넌트가 있는 경우, 지나치게 중첩된 컴포넌트를 통과하는 prop이 생기게 된다. 이는 나중에 유지보수하기 힘든 난해한 코드가 될 수 있다.
+ 공통의 상태를 공유하기 때문에, 이 상태가 여러 컴포넌트에서 동일한 상태로 관리되어야 한다. Vue는 단방향으로 데이터가 흐르기때문에, 여러 컴포넌트가 한 상태를 공유하는 경우, 형제 컴포넌트간의 상태공유/관리가 복잡해질 수 있다.
### Vuex 구성방법


### 영화검색
movie.js<br>
변이 메소드 mutations<br>
1. updatedState 라는 변에 메소드를 만들어줌.
2. actions 의 context.commit 을 통해 객체데이터를 담아서
3. payload 라는 메게변수에 전달된다.
4. payload 는 겍체데이터인데 Object.keys 를 통해 배열데이터로 변환후
5. 배열데이터의 수 만큼 forEach 를 통해 반복
6. 한번 반복될 때 마다 omdbapi에서 가지고온 데이터를 할당하여 순서대로 key 값에 적용하여 
7. state[movies] = payload[Search]
8. state[message] = payload[Hello world!]
9. state[loading] = payload[true]
10. 

```json
mutations:{
    updatedState(state, payload){
      // ['movies', 'message', 'loading'] payload 전달된 겍체데이터는 Object.keys 를 통해 배열데이터로 forEach를 통해 반복
      Object.keys( payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기
  actions: {
    async searchMovies(context, payload) {
      const { title, type, number ,year } = payload
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalReults } = res.data
      context.commit('updatedState', {
        movies: Search,
        message: 'Hello world!',
        loading: true
      })
    }
  }
```
--------------------------
## 영화 목록에서 ID 중복 제거
### 
[lodash_uniqBy](https://lodash.com/docs/4.17.15#uniqBy)<br>
```
 npm i lodash 
```
-----------
# 영화 아이템 
## 아이템 기본출력
## 텍스트 말줄임 표시와 배경 흐림 처리
[white-space md](https://developer.mozilla.org/ko/docs/Web/CSS/white-space)<br/>
[text-overflow mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
```css
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
```

[backdrop-filter](https://developer.mozilla.org/ko/docs/Web/CSS/backdrop-filter)
CSS backdrop-filter는 요소 뒤 영역에 흐림이나 색상 시프트 등 그래픽 효과를 적용할 수 있는 속성입니다. 요소 "뒤"에 적용하기 때문에, 효과를 확인하려면 요소나 요소의 배경을 적어도 반투명하게는 설정해야 합니다.
```css
backdrop-filter: blur(2px) grayscale();
```

----
# Container 너비 사용자 지정
[Bootstrap_Containers](https://getbootstrap.com/docs/5.1/layout/containers/)<br>
scss 수정
```scss
$container-max-widths: (
  sm: 540px,
  md: 704px,
  lg: 924px,
  xl: 1140px,
  xxl: 1364px
);
```
----
# 에러메시지 출력과 로딩 에니메이션
[Bootstrap_Spinners](https://getbootstrap.com/docs/5.1/components/spinners/)
```html
<!-- MovieList.vue 파일에붙여넣기 -->
<div class="spinner-border text-primary"></div>
```
로딩 에니메이션은 검색중일 때만 실행되어야한다.<br>
movie.js 영역에서 loading 값은 false이다.
```js
  state: () => {
    return {
      movies: [],
      message: 'Search for the movie title!',
      loading: false
    }
  },
  ```
  검색을 시작하념 true값으로 변해야한다!<br>
  _fatchMovie 함수를 통해서 영화가 잘 검색 되거나, 문제가 있어서 catch문이 동작을 하던 로딩은 false로 만들어 주어야 한다.<br>
 actions: 영역에서 try, catch 를 사용하고 있기 때문에 catch 아래 finally을 사용해보자!!
 ```js
 } catch( message){
        commit('updateState', {
          movies: [],
          message: message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
```
--------

# Footer
------

# 단일 영화 상세 정보 가져오기
## 스켈레톤 UI
유튜브처럼 웹페이지가 완전히 로딩되기 전에 사용자에게 미리 뼈대를 보여줌으로 사용자가 미리 예측할 수 있게 도와주는 UI이다.
## Loader
## Ratings
1. 개발자 페이지에서 Ratings: 를 열어보면 3개의 배열데이터가 있다.<br>
Ratings: Array(3)<br>
0: {Source: 'Internet Movie Database', Value: '6.8/10'}<br>
1: {Source: 'Rotten Tomatoes', Value: '78%'}<br>
2: {Source: 'Metacritic', Value: '64/100'}<br>
2. 각각의 영화 평점 사이트의 이름과 점수데이터가 들어있다.
3. https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/Internet%20Movie%20Database.png 이미지 주소를 활용해 사용!!
4. https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png 문자 보간`` 을 활용해준다.
5. theMovie 안에 들어있는 .Ratings 안에있는 배열데이터를 v-for 를 사용해 반복 출력해준다.
6. Ratings 안에 3개의 객체데이터를 가지고 있다. (Source, Value)
7. Source: name, Value: score 직관적인 이름설정!
```html
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
```
----
## 고해상도 포스터 불러오기
이미지를 새로운 텝에서 열어주고,<br>
https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg <br>
마지막 V1_SX300.jpg 을 V1_SX700.jpg 으로 변경시켜주면 이미지 사이즈가 커지게 된다.<br>
[실시간 이미지 리사이징](https://heropy.blog/2019/07/21/resizing-images-cloudfrount-lambda/)

## vue 플러그인(이미지 로드 이벤트)
영화 검색창에서 작은 포스터들이 각각 로딩처리, 무비페이지에서 이미지 로딩 처리.

## 영화 포스터 없는 경우 예외 처리
포스터가 없는경우 해당 포스터는 무한 로딩으로 보여지게 된다.<br>

```js
// MovieItem.vue
methods: {
    async init() {
      const poster = this.movie.Poster
      if (!poster || poster === 'N/A') {
        this.imageLoding = false
      }
      await this.$loadImage(this.movie.Poster)
      this.imageLoding = false
    }
  }
```
movie페이지에서도 포스터가 없기 때문에 Movie.vue 수정!
```js
// Movie.vue
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
```

## Nav 경로 일치 및 활성화
Movie 페이지에서 기본 정보로 겨울왕국2를 보여지게 설정되었지만 Search페이지에서 검색으로 포스터 클릭시 Movie페이지 활성화와 정보 일치.

## About
인적사항

## 404 page Not Found
[vue router](https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route)<br>
1. routes 폴더에 NotFound.vue 파일 생성
2.  routes 폴더안에 index.js 파일에서 추가
```js
// import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from './Home.vue'
// import Movie from './Movie.vue'
// import About from './About.vue'
import NotFound from './NotFound.vue'


export default createRouter({ 
  // // Hash모드
  // // https://google.com/#/search
  // history: createWebHashHistory(),
  
  // // pages
  // // https://google.com/
  // routes: [
  //   {
  //     path:'/',
  //     component: Home
  //   },
  //   {
  //     path:'/movie/:id',
  //     component: Movie
  //   },
  //   {
  //     path:'/about',
  //     component: About
  //   },
    {
      path: '/:NotFound(.*)', //이름 변경 가능!
      component: NotFound
    }
//   ]
// })
```

----
## 부트스트랩 Breakpoint(반응형)
[Breakpoints](https://getbootstrap.com/docs/5.1/layout/breakpoints/)<br>
```css
@include media-breakpoint-down(sm) { ... }
@include media-breakpoint-down(md) { ... }
@include media-breakpoint-down(lg) { ... }
@include media-breakpoint-down(xl) { ... }
@include media-breakpoint-down(xxl) { ... }
```

## 모든 컴포넌트에서 전역 스타일 가져오기
매번 @import "~/scss/main" 를 vue.js 에서 불러오는 작업은 불편하다.
[sass-loader github](https://github.com/webpack-contrib/sass-loader#additionaldata)<br>
### additionalData
1. webpack.config.js 파일 오픈
```js
{
        // test: /\.s?css$/,
        // use: [
        //   // 순서 중요!
        //   'vue-style-loader',
        //   'style-loader',
        //   'css-loader',
        //   'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "~/scss/main";'
            }
          }
      //   ]
      // },
```
2. 모든 파일에서 '@import "~/scss/main" 삭제.(단 webpack.config.j 과 main.scss 파일은 제외)
3. 개발서버 종료후 다시 실행!
-----

## Vuex Helpers
About.vue 파일에서 반복적인 코드를 발견 할 수 있다.
```js
computed: {
    // Vuex Helper로 간소화 할 수 있다.
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    },
    github() {
      return this.$store.state.about.github
    },
    email() {
      return this.$store.state.about.email
    },
    phone() {
      return this.$store.state.about.phone
    }
  },
```
[Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper)<br>

```js
// 간소화된 코드
computed: {
    ...mapState('about', [ // 전개연산자 사용 권장!
      'image',
      'name',
      'github',
      'email',
      'phone'
    ])
  },
------------------ 
// 공식 문서처럼 전개연산자 없이 사용 가능하다.
// 하지만 store 에서 가지고 오는 데이터만 사용하는 것이 아닐 수 있다.
  computed: mapState('about', [ 
      'image',
      'name',
      'github',
      'email',
      'phone'
    ]),

-----------------
computed: { 
  jeong() {
    // 추가적인 함수를 적용 할 수 있기 때문에 computed: 에 위 코드처럼 mapState 를 직접 할당 하지말자!!
  }
    ...mapState('about', [ // 전개연산자 사용 권장!
      'image',
      'name',
      'github',
      'email',
      'phone'
    ])
  },

```
---------
## 검색 정보 초기화 및 페이지 잔환 스크롤 위치 복구
영화 검색후 포스터들중에 아래있는 포스터 클릭시 mpvie 페이지에서 도 아래로 내려와있는 현상과,
다시 search페이지로 돌아와도 그대로 검색정보를 가지고 있는 현상을 변경해보자!!<br>
[scroll-behavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html)<br>
store 폴더의 movie.js 파일에서 resetMovies 메소드에 빈 배열로 초기화 해주는 코드로 작성 되어있다.<br>
message, loading 을 초기화 해주자!!
```js
// _defaultMessage 는 장문의 글자를 수정 했을 때 오타가 날 수 있고, 수정에 용이하도록 변수 설정!!
// const _defaultMessage = 'Search for the movie title!'
resetMovies(state) {
  state.movies = []
  state.message = _defaultMessage
  state.loading = false
}
```
초기화 코드는 Home.vue 파일에서 실행 되어야 한다.
```js
// <template>
//   <Headline />
//   <Search />
//   <MovieList />
// </template>

// <script>
// import Headline from '~/components/Headline'
// import Search from '~/components/Search'
// import MovieList from '~/components/MovieList'

// export default {
//   components: {
//     Headline,
//     Search,
//     MovieList
//   },
  created() {
    this.$store.commit('movie/resetMovies')
  }
// }
// </script>
```
------
## Netlify Serverless Functions
배포된 서버에 보안이슈가 될 수 있는 내용들을 쉽게 볼 수 있다.<br>
[netlify-functions](https://docs.netlify.com/functions/overview/)<br>
1. 루트 경로에 netlify.toml 파일생성
```
[build]
  functions = "functions"
```
2. 루트 경로에 functions 폴더 생성후 테스트용 hello.js 파일 생성
```js
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ //body 에는 문자데이터만 할당 가능하기에 JSON.stringify 를 사용해 객체데이터를 문자데이터로 변환하여 사용가능!
      name: 'JEONG',
      email: 'qkrwjd53@gmail.com'
    })
  }
}
```
https://modest-wozniak-58eb16.netlify.app/.netlify/functions/hello <br>
netlify-cli[netlify-dev](https://cli.netlify.com/netlify-dev)<br>
----------------
## 영화정보 반환 API 만들기
----
-----------
# 단위 테스트
+ **Unit Test**<br>
단위(Unit) 테스트란 데이터(상태), 함수(메소드), 컴포넌트 등의 정의된 프로그램 최소 단위들이 독입적으로 동작하는지 확인하는 방법.
  * 코드위주의 테스트
  * **Jest** 프레임워크를 사용하여 테스트한다, **Vue Test Utils** 를 사용하여Vue환경에서  Jest 를 연결할 수 있다.
+ **E2E Test**<br>
E2E(End to End) 테스트란 애플리케이션의 처음부터 끝까지의 실제 사용자의 관점에서 사용 흐름을 테스트하는 방법.
  * 프로젝트 화면에서 테스트.
  * Cypress 를 사용하여 테스트 할 수 있다.
----
## Unit Test
### 테스트 환경 구성
Jest 페키지 설치!!
```
npm i -D @vue/test-utils@next vue-jest@next babel-jest
```
1. jest.config.js 루트경로에 생성!
2. tests 루트경로에 폴더 생성!
3. example.test.js 파일과 example.js 파일 생성!!
4. example.test.js 파일에서 작성 할때 에러가 나오기 때문에
5. .eslintrc.js 파일 추가!!
```js
  env: {
    // browser: true,
    // node: true,
    jest: true
  },
```
6. example.js 작성!
```js
// example.test.js 에서 파일 읽을 수 있게 export 로 내보내준다.
export function double(num) {
  if (!num) {
    return 0
  }
  return num *2
}
```
7. example.test.js 테스트 코드 작성.
```js
import { double  } from './example'

test ('첫 테스트',  () => {
  expect(123).toBe(123)
})


test('인수가 숫자 데이터입니다', () => {
  expect(double(3)).toBe(6)
  expect(double(10)).toBe(20)
})


test('인수가 없습니다', () => {
  expect(double()).toBe(0)
  
})
```
8. 터미널에서 테스트 코드 사용하기.
```json
  "scripts": {
    // "dev:webpack": "webpack-dev-server --mode development",
    // "dev": "netlify dev",
    // "build": "webpack --mode production",
    // "lint": "eslint --fix --ext .js,.vue",
    "test:unit": "jest --watchAll" 
    // --watchAll : 모든 변경사항 감시.
    //E2E 테스트도 진행하기 위해 특정이름 만들어주기.
  },
```
9. 테스트 시작.
```
npm run test:unit
```
```
 PASS  tests/example.test.js
  √ 첫 테스트 (2 ms)
  √ 인수가 숫자 데이터입니다 (6 ms)
  √ 인수가 없습니다 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.691 s
Ran all test suites.
```
-----
[jest testing](https://jestjs.io/docs/api)<br>
## Methods
* afterAll(fn, timeout)
* afterEach(fn, timeout)
* beforeAll(fn, timeout)
* beforeEach(fn, timeout)
* describe(name, fn)
* test(name, fn, timeout)
```js
import { double  } from './example'

describe('그룹1' , () => {
  beforeAll(() => { // 모든 테스트가 시작되기전 단1번만 작동.
    console.log('beforeAll')
  })
  afterAll(() => { // 모든 테스트가 시작된 후 단1번만 작동.
    console.log('afterAll')
  })

  beforeEach(() => { // 각각의 테스트들이 시작되기전 작동.
    console.log('beforeEach')
  })
  afterEach(() => { // 각각의 테스트들이 시작된 후 작동.
    console.log('afterEach')
  })


  test ('첫 테스트',  () => {
    console.log('첫 테스트')
    expect(123).toBe(123)
  })
  
  test('인수가 숫자 데이터입니다', () => {
    console.log('인수가 숫자 데이터입니다')
    expect(double(3)).toBe(6)
    expect(double(10)).toBe(20)
  })
  
  test('인수가 없습니다', () => {
    console.log('인수가 없습니다')
    expect(double()).toBe(0)
    
  })
})
```
<br>

+ .toBe(value)
```js
// 실제 데이터와 기대 데이터 비교.
const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});
```
<br>
객체데이터와 배열 데이터(참조형 데이터) 테스트
+ .toEqual(value)

```js
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});
```
## 비동기 테스트
```js
// example.test.js
import { asyncFn } from './example'

describe('비동기 테스트', () => {
  test('done', () => {
    asyncFn().then(res => {
      expect(res).toBe('Done?')
    })
  })
})

// example.js
export function asyncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Done!')
    },2000)
  })
}
// 결과
// 테스트 통과로 나온다.(테스트 실패값을 적용해도 통과한다. )
// 비동기 테스트는 정상작동하지 않음.
```


```js
// example.test.js
import { asyncFn } from './example'

describe('비동기 테스트', () => {
  test('done', (done) => {
    asyncFn().then(res => {
      expect(res).toBe('Done!')
      done()
    })
  })
})

// 결과
// 테스트 통과로 나온다.( 테스트값 정상적용 )
// 테스터입장에서 얼마나 기다려야 하는지 모르기때문에 done 를 작성하여 비동기 코드가 동작하고 done() 실행후 종료 하게되어 정상작동하게된다.
```
비동기 테스트 방법
```js
import { asyncFn } from './example'

describe('비동기 테스트', () => {
  // 비동기 테스트 1
  test('done', (done) => {
    asyncFn().then(res => {
      expect(res).toBe('Done!')
      done()
    })
  })

  // 비동기 테스트 2
  test('then', () => {
    return asyncFn().then(res => {
      expect(res).toBe('Done!')
    })
  })

  // 비동기 테스트 3
  test('resolves', () => {
    return expect(asyncFn()).resolves.toBe('Done!')
  })

  // 비동기 테스트 4
  test('async/await', async () => {
    const res = await asyncFn()
    expect(res).toBe('Done!')
  })
})

```
<br>

```js
// example.test.js
import { asyncFn } from './example'

describe('비동기 테스트', () => {
  test('async/await', async () => {
    const res = await asyncFn()
    expect(res).toBe('Done!')
  })
})

// example.js
export function asyncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Done!')
    },6000) // 딜레이 6초
  })
}
// 결과 
// 테스트 실패
// test함수가 최대 5초까지 기다리도록 설정되어 있기 때문.


// 수정
// example.test.js
import { asyncFn } from './example'

describe('비동기 테스트', () => {
  test('async/await', async () => {
    const res = await asyncFn()
    expect(res).toBe('Done!')
  }, 7000) // 기본값 5000(5초) 에서 설정값으로 6초 이상인 7초 설정하여 테스트 문제없이 통과.
})
```


----
## 모의(Mock) 함수
최소한의 시간으로 테스트
```js
// example.js
import axios from 'axios'
import _upperFirst from 'lodash/upperFirst' // 첫글자 대문자화
import _toLower from 'lodash/toLower' // 모두 소문자화


export async function fetchMovieTitle() {
  const res = await axios.get('https://omdbapi.com?apikey=7035c60c&i=tt4520988')
  return _upperFirst(_toLower(res.data.Title)) // Frozen II => Frozen ii (첫글자를 제외하고 소문자변환.)
}

// example.test.js
import { fetchMovieTitle } from './example'

describe('비동기 테스트', () => {
  test('영화 재목 변환', async () => {
    const title = await fetchMovieTitle()
    expect(title).toBe('Frozen ii')
  })
})
```
omdbapi 에서 특정한 영화 정보를 요청하였고, 재대로 값을 읽어오지 못하는 상황이라면, 테스트진행하지 못한다.<br>
데이터를 가지고 오는 행위까지 테스트에 포함시크는 것은 낭비이다.<br>
이때 사용 할 수 있는 것이 모의 테스트이다.
```js
// example.test.js
import axios from 'axios'
import { fetchMovieTitle } from './example'

describe('비동기 테스트', () => {
  test('영화 재목 변환', async () => {

    axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          data: {
            Title: 'Frozen II'
          }
        })
      })
    }) // 모의 함수
    
    const title = await fetchMovieTitle()
    expect(title).toBe('Frozen ii')
  })
})
```
테스트환경에서 네트워크를 끊고 실행하여도 테스트는 모의 함수를 통해 동작하게된다.
----
## VTU 첫 테스트
[vue-test-utils](https://test-utils.vuejs.org/guide/#what-is-vue-test-utils)
```vue
<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue test utils!'
    }
  },
  mounted() {
    console.log(this.msg)
  }
}
</script>
```
```js
// example.test.js
import { mount } from '@vue/test-utils' // 공식문서 확인!
import Example from './Example.vue'

test('메세지를 변경합니다.', async() => {
  const wrapper = mount(Example)
  // wrapper.vm === this 기능과 동일하다.
  expect(wrapper.vm.msg).toBe('Hello Vue test utils!')
  
  // wrapper.vm.msg = 'Hello Jeong'
  await wrapper.setData({ 
    // setData를 사용하면 데이터를 테스트환경에서 할당 할 수 있다.
    // setData 는 비동기로 동작한다.
    msg: 'Hello Jeong'
  })
  expect(wrapper.vm.msg).toBe('Hello Jeong')
  expect(wrapper.find('div').text()).toBe('Hello Jeong')
})
```
## Header 컴포넌트
Header.vue 파일을 테스트해보자.
```js
// Header.test.js
import { shallowMount } from '@vue/test-utils'
import router from '~/routes'
import store from '~/store'
import Header from '~/components/Header'


describe('components/Header.vue', () => {
  // 각 테스트에서 다음테스트로 넘어갈때 Header 라는 컴포넌트를 새롭게 등록시켜줘야 간섭이 안생긴다.
  // beforeEach : 각각의 테스트가 동작하기전에 컴포넌트를 등록해주면 매번 Header 를 등록시켜 줄 필요없어진다.
  
  let wrapper // 제할당이 가능하도록 let 사용. // wrapper가 함수 내부에서만 사용가능한 문제.
  beforeEach(async() => {
    window.scrollTo = jest.fn()
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Header ,{ 
      global: {
        plugins: [  // main.js 처럼 플러그인 등록과 유사하다.
          router,
          store
        ]
      }
    })
  })

  test('경로 정규표헌식이 없는 경우 일치하지 않습니다.', () => {
    const regExp = undefined
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

  test('경로 정규표헌식과 일치해야 합니다', () => {
    const regExp = /^\/movie/
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })

  test('경로 정규표헌식과 일치하지 않아야 합니다', () => {
    const regExp = /^\/jeong/
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

})
```