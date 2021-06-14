const tinycolor = require('tinycolor2');

module.exports = {
  //사용자가 컬러 theme을 정한다 -> advanced
  // 랜덤테마를 선택했으면
  generateRandomColorPairArr: () => {
    const randomColor = tinycolor.random().toHexString();

    const analogousColor = tinycolor(randomColor).analogous(10, 5);

    const analogousColorArr = analogousColor.map((t) => {
      let colorPairObject = { backgroundColor: t.toHexString() };
      if (t.isLight()) {
        colorPairObject.textColor = tinycolor('black').toHexString();
        return colorPairObject;
      } else {
        colorPairObject.textColor = tinycolor('white').toHexString();
        return colorPairObject;
      }
    });

    return analogousColorArr;

    //[{backgroundColor: <hexstring>, textColor: <hexstring> // black or white }, {...}, {...}]
  },
};
