describe('첫 번째 테스트', () => {
  it('프로젝트 페이지 이동합니다', () => {
    cy.visit('/')
    cy.get('header .logo')
    cy.get('#heropy')
  })
})