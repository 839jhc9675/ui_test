/**
 * 섹션 레지스트리 — 배열 순서대로 화면에 렌더링됩니다.
 * 새 섹션 추가 방법:
 *   1. src/components/sections/ 에 섹션 컴포넌트 파일 생성 (예: button-section.jsx)
 *   2. 아래에 import 후 sections 배열에 { id, title, description, component } 추가
 *
 * 예시:
 * import ButtonSection from './button-section.jsx';
 * { id: 'button', title: 'Button', description: '버튼 UI', component: ButtonSection },
 */
import AnimationSection from './animation-section.jsx';
import ButtonSection from './button-section.jsx';
import CardSection from './card-section.jsx';
import CheckboxSection from './checkbox-section.jsx';
import DragDropSection from './drag-drop-section.jsx';
import DropdownSection from './dropdown-section.jsx';
import FlexNavigationSection from './flex-navigation-section.jsx';
import HoverSection from './hover-section.jsx';
import InputSection from './input-section.jsx';
import ModalSection from './modal-section.jsx';
import NavigationSection from './navigation-section.jsx';
import RadioSection from './radio-section.jsx';
import ScrollSection from './scroll-section.jsx';
import SidebarSection from './sidebar-section.jsx';
import SliderSection from './slider-section.jsx';
import SwipeSection from './swipe-section.jsx';

const sections = [
  {
    id: 'button',
    title: 'Button',
    description: 'variant(contained · outlined · text) × color(primary · secondary · error) 조합. 클릭하면 알림창이 표시됩니다.',
    component: ButtonSection,
  },
  {
    id: 'input',
    title: 'Input',
    description: 'variant(standard · outlined · filled)별 TextField. label과 placeholder를 설정했고, 입력값이 아래에 실시간으로 표시됩니다.',
    component: InputSection,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'AppBar + Toolbar 네비게이션. 메뉴를 클릭하면 메뉴명이 알림으로 표시되고, 모바일 화면에서는 햄버거 메뉴로 바뀝니다.',
    component: NavigationSection,
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description: 'Select + MenuItem 드롭다운. 6개 옵션 중 하나를 고르면 선택된 값이 아래에 실시간으로 표시됩니다.',
    component: DropdownSection,
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: '다중 선택 Checkbox 4개 + 전체 선택/해제. 일부만 선택하면 전체 선택 박스가 중간 상태(−)로 바뀌고, 선택 개수가 실시간으로 표시됩니다.',
    component: CheckboxSection,
  },
  {
    id: 'radio',
    title: 'Radio',
    description: 'RadioGroup + Radio 단일 선택. FormControlLabel로 레이블을 붙였고, 선택된 옵션이 아래에 표시됩니다.',
    component: RadioSection,
  },
  {
    id: 'slider',
    title: 'Slider',
    description: '0~100 범위 Slider. 0 · 25 · 50 · 75 · 100 지점에 구간 표시(marks)가 있고, 현재 값이 실시간으로 표시됩니다.',
    component: SliderSection,
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Dialog 모달. 버튼으로 열고 확인 · 취소 · 닫기(X) 버튼, 배경 클릭, ESC 키로 닫을 수 있으며 어떻게 닫았는지 표시됩니다.',
    component: ModalSection,
  },
  {
    id: 'card',
    title: 'Card',
    description: 'CardMedia · CardContent · CardActions로 구성한 카드 3개를 Grid로 배치. 마우스를 올리면 그림자(elevation)가 커지며 살짝 떠오릅니다.',
    component: CardSection,
  },
  {
    id: 'drag-drop',
    title: 'Drag & Drop',
    description: 'HTML5 Drag and Drop API. 아이템을 두 영역 사이로 끌어 옮길 수 있고, 드래그 중인 아이템은 흐려지며 놓을 영역은 테두리가 강조됩니다.',
    component: DragDropSection,
  },
  {
    id: 'scroll',
    title: 'Scroll',
    description: '고정 높이(300px) Paper 스크롤 영역에 30개 항목. 100px 이상 내리면 Top 버튼이 나타나고, 스크롤 위치와 진행률이 실시간으로 표시됩니다.',
    component: ScrollSection,
  },
  {
    id: 'animation',
    title: 'Animation',
    description: 'MUI Fade · Grow · Slide 트랜지션, CSS keyframes 애니메이션 4종(Bounce · Spin · Shake · Pulse), 그리고 Grow 등장 후 Bounce가 이어지는 조합 애니메이션.',
    component: AnimationSection,
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    description: 'Drawer 사이드바. 왼쪽/오른쪽 위치를 고른 뒤 버튼으로 열 수 있고, List 메뉴의 링크를 누르면 해당 섹션으로 이동합니다.',
    component: SidebarSection,
  },
  {
    id: 'hover',
    title: 'Hover',
    description: 'ButtonBase 카드 8종에 각기 다른 호버 효과(색상 · 크기 · 그림자 · 테두리 · 회전 · 그라데이션 · 밑줄 · 오버레이). 키보드 포커스에서도 동일하게 동작합니다.',
    component: HoverSection,
  },
  {
    id: 'swipe',
    title: 'Swipe',
    description: 'react-swipeable 무한 반복 이미지 슬라이더. 터치나 마우스로 좌우로 끌어 넘기고, 이전/다음 버튼과 하단 점으로도 이동할 수 있으며 현재 슬라이드 번호가 표시됩니다.',
    component: SwipeSection,
  },
  {
    id: 'flex-navigation',
    title: 'Flex Navigation',
    description: 'flexbox(justify-content: space-between)로 로고와 메뉴 5개를 양 끝 정렬한 화면 가로 전체 네비게이션. 메뉴에 마우스를 올리면 흰색으로 바뀝니다.',
    component: FlexNavigationSection,
  },
];

export default sections;
