const tinycolor = require("tinycolor2");

module.exports = {

  //사용자가 컬러 theme을 정한다 -> advanced
  // 랜덤테마를 선택했으면 
  generateRandomColorArr = () => {
    const randomColor = tinycolor.random();
    const analogousColor = tinycolor(randomColor).analogous(10, 30);
    const analogousColorArr = analogousColor.map(t => {
      const colorPairObject = { backgorundColor: t.toHexString() }
      if (t.isLight) {
        colorPairObject.textColor = tinycolor('black').toHexString();
      } else {
        colorPairObject.textColor = tinycolor('black').toHexString();
      }})
    

    
  }


}