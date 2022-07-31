const iDCTTransform = (imgData) => {
  console.log("\t >Entrou");
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let pixels = imgData.data;

  let clampedArray = [];

  let m = imgHeight; // altura
  let n = imgWidth; // largura
  console.log(m, n);
/*
  let m = imgData.height;
  let n = imgData.width;
*/
  let r = [];
  const PI = 3.142857
  let ci = 0, cj = 0, sum = 0, idct = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(i==0) ci = 1 / Math.sqrt(m);
      else ci = Math.sqrt(2) / Math.sqrt(m);
      
      if(j == 0) cj = 1 / Math.sqrt(n);
      else cj = Math.sqrt(2) / Math.sqrt(n);

      sum = 0;
      //console.log("=========Inicio for com k e l==============");
      for (let k = 0; k < m; k++) {
        for (let l = 0; l < n; l++) {
          //let p = context1.getImageData(k, l, 1, 1).data[0];
          //let p = pixels[k * m + l];
          let p = pixelAt(k, l)/255;
          idct =
            p * ci * cj *
            Math.cos((2 * k + 1) * i * PI / ( 2 * m)) * 
            Math.cos((2 * l + 1) * j * PI / (2 * n));
          sum = sum + idct;
        }
      }
      //console.log("==========Fim do for com k e l==============");
      //r.push(sum*255);
      r.push(sum*255, sum*255, sum*255, 255);
      //console.log("==========Fim do for com i e j==============");
    }
  }
  clampedArray = r;
  /*
  r = normalize(r);
  console.log(r);
  // Montar o pseudo img data.
  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      clampedArray.push(r[x], r[x], r[x], 255);
    }
  }
  */

  let imgDataIDCT = context1.createImageData(imgWidth, imgHeight);
  imgDataIDCT.data.set(new Uint8ClampedArray(clampedArray));
  
  return imgDataIDCT;
};

$("#btn-transform-cos-i").on("click", () => {
  console.log("** IDCT **");
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  imgData = iDCTTransform(imgData);

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
  console.log("Sucesso!");
});