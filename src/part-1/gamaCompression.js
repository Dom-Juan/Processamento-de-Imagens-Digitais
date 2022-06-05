const gamma = (imgData, gamma) => {
  console.log("\t Função gamma();");
  let S;
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let c = 1.0;
  let clampedArray = [];
  let gammaData = [];
  /*
  for(let x = 0; x < imgData.width; x++) {
    for(let y = 0; y < imgData.height; y++) {
      S = c*(Math.pow(pixelAt(x, y), gamma));
      if(S > 255)
        gammaData.push(255, 255, 255);
      else
        gammaData.push(Math.trunc(S), Math.trunc(S), Math.trunc(S));
    }
  }
  clampedArray = gammaData;

  console.log(clampedArray);

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(gammaData);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;gammagama
*/
  let pixels = imgData.data;
  for(let i = 0; i < pixels.length; i+=4) {
    pixels[i] = 255 * Math.pow((pixels[i]/255), gamma);
    pixels[i + 1] = 255 * Math.pow((pixels[i + 1]/255), gamma);
    pixels[i + 2] = 255 * Math.pow((pixels[i + 2]/255), gamma);
  }
  
  return pixels;
};

$("#btn-gamma").on("click", () => {
  console.log("** Compressão Gama **");
  $("#gamma-result").empty();
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  let g = parseFloat($("#gamma-value").val());

  if(g === undefined || g === null || isNaN(g))
    $("#gamma-result").append("Digite um valor valido para o threshold!!!");
  else {
    let result = gamma(imgData, g);

    //let imgDataResult = result.toImgData();
  
    imgData.data.set(result);
    $("#gamma-result").append("Operação feita com sucesso!!");
  
    context2.putImageData(imgData, 0, 0);
    context3.putImageData(imgData, 0, 0);
    context4.putImageData(imgData, 0, 0);
    console.log("Sucesso");
  }
});