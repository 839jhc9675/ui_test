/**
 * 외부 이미지 없이 쓰는 그라데이션 SVG 이미지(data URI)를 만듭니다.
 *
 * @param {string} from - 그라데이션 시작 색상 [Required]
 * @param {string} to - 그라데이션 끝 색상 [Required]
 * @param {string} label - 이미지 가운데에 흰 글자로 표시할 텍스트 [Optional, 기본값: '']
 * @returns {string} data URI 문자열
 *
 * Example usage:
 * gradientImage('#43a047', '#1b5e20', '산');
 */
function gradientImage(from, to, label = '') {
  const text = label
    ? `<text x="200" y="100" fill="#fff" font-family="sans-serif" font-size="32" font-weight="700"
        text-anchor="middle" dominant-baseline="middle">${label}</text>`
    : '';

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="400" height="200" fill="url(#g)"/>
      ${text}
    </svg>`,
  )}`;
}

export default gradientImage;
