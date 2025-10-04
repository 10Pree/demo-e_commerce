const crypto = require('crypto')

const genProductCode = (prefix = 'PRD', randomLen = 6) => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // ตัด 0,O,1,I
  let rand = '';
  for (let i = 0; i < randomLen; i++) {
    const idx = crypto.randomInt(0, alphabet.length);
    rand += alphabet[idx];
  }
  const ym = new Date().toISOString().slice(0,7).replace('-', ''); // YYYYMM
  return `${prefix}-${ym}-${rand}`;
}

module.exports = genProductCode