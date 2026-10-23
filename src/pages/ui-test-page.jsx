import Typography from '@mui/material/Typography';
import PageLayout from '../components/common/page-layout.jsx';
import SectionContainer from '../components/common/section-container.jsx';
import sections from '../components/sections/index.js';

/**
 * UiTestPage 컴포넌트
 *
 * 섹션 레지스트리(components/sections/index.js)에 등록된 UI 섹션을 순서대로 보여주는 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <UiTestPage />
 */
function UiTestPage() {
  return (
    <PageLayout title="UI Test" subtitle="16개 UI 요소를 섹션 단위로 확인하는 페이지">
      { sections.length === 0 ? (
        <Typography color="text.secondary">
          아직 추가된 섹션이 없습니다. src/components/sections/index.js 에 섹션을 등록하세요.
        </Typography>
      ) : (
        sections.map(({ id, title, description, component: Section }, i) => (
          <SectionContainer key={ id } id={ id } index={ i + 1 } title={ title } description={ description }>
            <Section />
          </SectionContainer>
        ))
      ) }
    </PageLayout>
  );
}

export default UiTestPage;
