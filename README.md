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