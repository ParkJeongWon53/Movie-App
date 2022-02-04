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