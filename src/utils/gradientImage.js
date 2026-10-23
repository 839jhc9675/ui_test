// 외부 이미지 없이 쓰는 그라데이션 SVG 이미지 (data URI)
// label을 넘기면 이미지 가운데에 흰 글자로 표시합니다.
export default function gradientImage(from, to, label = '') {
  const text = label
    ? `<text x="200" y="100" fill="#fff" font-family="sans-serif" font-size="32" font-weight="700"
        text-anchor="middle" dominant-baseline="middle">${label}</text>`
    : ''

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="400" height="200" fill="url(#g)"/>
      ${text}
    </svg>`,
  )}`
}
