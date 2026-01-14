/**
 * 랜덤 정수를 생성하는 함수
 * @param {number} min - 최소값 (포함)
 * @param {number} max - 최대값 (포함)
 * @param {number} count - 생성할 개수 (기본값: 1)
 * @param {Object} options - 옵션 객체
 * @param {boolean} options.overlap - 중복 허용 여부 (기본값: false)
 * @returns {number|number[]} - 개수가 1이면 숫자, 2개 이상이면 배열
 */
function getRandomInt(min, max, count = 1, options = {}) {
  const { overlap = false } = options;
  
  // 범위 검증
  if (min > max) {
    throw new Error('최소값은 최대값보다 클 수 없습니다.');
  }
  
  const range = max - min + 1;
  
  // 중복 불허 시 범위 검증
  if (!overlap && count > range) {
    throw new Error(`중복 없이 ${count}개를 뽑을 수 없습니다. (범위: ${range}개)`);
  }
  
  // 1개만 요청한 경우 (단일 값 반환)
  if (count === 1) {
    return Math.floor(Math.random() * range) + min;
  }
  
  const result = [];
  
  if (overlap) {
    // 중복 허용
    for (let i = 0; i < count; i++) {
      result.push(Math.floor(Math.random() * range) + min);
    }
  } else {
    // 중복 불허
    const available = Array.from({ length: range }, (_, i) => min + i);
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      result.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }
  }
  
  return result;
}