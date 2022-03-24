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