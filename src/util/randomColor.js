const tinycolor = require("tinycolor2");

module.exports = {
  setRandomColor: () => {
    const randomColor = tinycolor.random().toHexString();
    let randomNumber = Math.floor(Math.random() * 10);

    const analogousColor = tinycolor(randomColor).analogous(10, 5); // 랜덤컬러 10개 반환,  5?

    const analogousColorArr = analogousColor.map((t) => {
      let colorPairObject = { backgroundColor: t.toHexString() };
      if (t.isLight()) {
        // 배경색과 글자색 조정
        colorPairObject.textColor = tinycolor("black").toHexString();
        return colorPairObject;
      } else {
        colorPairObject.textColor = tinycolor("white").toHexString();
        return colorPairObject;
      }
    });
    return analogousColorArr[randomNumber];
  },
};
