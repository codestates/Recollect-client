const tinycolor = require('tinycolor2');

module.exports = {
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
  },
};
