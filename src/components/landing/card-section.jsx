import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import gradientImage from '../../utils/gradient-image.js';

const CARDS = [
  {
    id: 'mountain',
    title: '산',
    description: '맑은 공기와 탁 트인 전망을 즐길 수 있는 등산 코스를 소개합니다.',
    image: gradientImage('#43a047', '#1b5e20'),
  },
  {
    id: 'ocean',
    title: '바다',
    description: '푸른 바다와 해변 산책로가 어우러진 여행지를 만나 보세요.',
    image: gradientImage('#29b6f6', '#1565c0'),
  },
  {
    id: 'city',
    title: '도시',
    description: '야경이 아름다운 도시의 맛집과 명소를 한눈에 정리했습니다.',
    image: gradientImage('#ab47bc', '#4a148c'),
  },
];

/**
 * CardSection 컴포넌트
 *
 * CardMedia + CardContent + CardActions 카드를 Grid로 배치, 호버 시 elevation 상승
 *
 * Props: 없음
 *
 * Example usage:
 * <CardSection />
 */
function CardSection() {
  const handleClick = (title, action) => {
    alert(`${title} 카드의 ${action} 버튼을 클릭했습니다.`);
  };

  return (
    <Grid container spacing={ 2 }>
      { CARDS.map((card) => (
        <Grid key={ card.id } size={{ xs: 12, sm: 4 }}>
          <Card
            elevation={ 1 }
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s, transform 0.2s',
              '&:hover': { boxShadow: 8, transform: 'translateY(-4px)' },
            }}
          >
            <CardMedia component="img" height="140" image={ card.image } alt={ `${card.title} 이미지` } />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                { card.title }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { card.description }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={ () => handleClick(card.title, '공유') }>
                공유
              </Button>
              <Button size="small" onClick={ () => handleClick(card.title, '자세히 보기') }>
                자세히 보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )) }
    </Grid>
  );
}

export default CardSection;
