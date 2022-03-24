module.exports = {
  // 파일 확장자를 지정하지 않은 경우, Jest가 검색할 확장자 목록입니다.
  // 일반적으로 많이 사용되는 모듈의 확장자를 지정합니다.
  // import 를 활용하여 어떤 파일을 가져올때 해당하는 파일의 경로에서 '~/components/가져올 파일 ;' 확장자 생략가능!
  moduleFileExtensions: [
    // 가지고오는 파일의 확장자 후보들을 미리 작성.
    'js',
    'vue'
  ],

  // `~` 같은 경로 별칭을 매핑합니다.
  // E.g. `import HelloWorld from '~/components/HelloWorld.vue';`
  // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  moduleNameMapper: {
    // 정규표현식 작성
    // ^: 문자의 시작.  ~/: 경로시작의 의미.   . : 임의의 문자.  *: 최대한 많이 일치
    // /src/$1' : src라는 디렉토리 안에있는 모든 경로를 매핑한다는 의미.
    // 즉 루트 경로에있는 src폴도에 있는 모든 경로둘을 정규식과 매핑해서 사용하는 의미.
    '^~/(.*)$': '<rootDir>/src/$1'
  },

  // // 일치하는 경로에서는 모듈을 가져오지 않습니다.
  // // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있습니다.
  modulePathIgnorePatterns: [ // 테스트가 필요없는부분 예외처리 가능!!
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/cypress'
  ],

  // jsdom 환경에 대한 URL을 설정합니다.
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/',

  // 정규식과 일치하는 파일의 변환 모듈을 지정합니다.
  transform: {
    // jest는 vue.js만을 테스트하기위해 만들어진것이 아니다.
    // 그러기에 .vue, .js 확장자들을 발견하여 jest로 변환시켜준다.
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  }
}