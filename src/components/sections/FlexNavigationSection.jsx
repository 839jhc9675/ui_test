import '../../styles/flex-navigation.css'

const MENUS = ['홈', '소개', '상품', '연락처', '설정']

// flexbox로 직접 만든 네비게이션: 로고(왼쪽) ↔ 메뉴들(오른쪽) 양 끝 정렬
// 스타일은 src/styles/flex-navigation.css 에 있습니다.
export default function FlexNavigationSection() {
  return (
    <nav className="flex-nav" aria-label="Flex 네비게이션">
      {/* 1. 로고 박스 */}
      <div className="flex-nav__logo">MyWebsite</div>

      {/* 2. 메뉴들 박스 */}
      <ul className="flex-nav__menu">
        {MENUS.map((menu) => (
          <li key={menu}>
            {/* 데모용 링크라 클릭해도 페이지 맨 위로 이동하지 않게 막습니다. */}
            <a className="flex-nav__link" href="#" onClick={(event) => event.preventDefault()}>
              {menu}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
