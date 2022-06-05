// Kernel X;
let X = [
  [-1.0, 0.0, 1.0],
  [-2.0, 0.0, 2.0],
  [-1.0, 0.0, 1.0],
];

// Kernel Y;
let Y = [
  [-1.0, -2.0, -1.0],
  [0.0, 0.0, 0.0],
  [1.0, 2.0, 1.0],
];

let sobelData;

// Gambiarra.
const FakeImgData = (data, width, height) => {
  // Gambiarra.
  return {
    width: width,
    height: height,
    data: data
  }
}

const sobelAlgorithm = (imgData) => {
  //let pixels = imgData.data;
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let clampedArray = [];
  sobelData = [];
  //let a = [];
  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      let pX = (
        (X[0][0] * pixelAt(x - 1, y - 1)) +
        (X[0][1] * pixelAt(x, y - 1)) +
        (X[0][2] * pixelAt(x + 1, y - 1)) +
        (X[1][0] * pixelAt(x - 1, y)) +
        (X[1][1] * pixelAt(x, y)) +
        (X[1][2] * pixelAt(x + 1, y)) +
        (X[2][0] * pixelAt(x - 1, y + 1)) +
        (X[2][1] * pixelAt(x, y + 1)) +
        (X[2][2] * pixelAt(x + 1, y + 1))
      );

      let pY = (
        (Y[0][0] * pixelAt(x - 1, y - 1)) +
        (Y[0][1] * pixelAt(x, y - 1)) +
        (Y[0][2] * pixelAt(x + 1, y - 1)) +
        (Y[1][0] * pixelAt(x - 1, y)) +
        (Y[1][1] * pixelAt(x, y)) +
        (Y[1][2] * pixelAt(x + 1, y)) +
        (Y[2][0] * pixelAt(x - 1, y + 1)) +
        (Y[2][1] * pixelAt(x, y + 1)) +
        (Y[2][2] * pixelAt(x + 1, y + 1))
      );

      let magnitude = Math.sqrt((pX * pX) + (pY * pY));
      sobelData.push(magnitude, magnitude, magnitude, 255);
      //console.log(magnitude);
      //a.push(magnitude);
    }
  }

  /*
  let min = Math.min(...a);
  let max = Math.max(...a);
  console.log(sobelData, min, max);
  let normal = [];
  for (let i = 0; i < a.length; i++) {
    normal[i] = ((a[i] - min)/(max - min));
    console.log(normal[i]);
  }
  */


  clampedArray = sobelData;

  /*
  let imgDataSobel = context1.createImageData(canvas1.width, canvas1.height);
  imgDataSobel.data.set(new Uint8ClampedArray(sobelData));
  */
  

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(sobelData);
  }

  clampedArray.toImgData = function () {
    return toImgData(clampedArray, imgData.width, imgData.height);
  }

  return clampedArray;
};

sobelButton.addEventListener("click", (e) => {
  // pegando referencia do canvas.
  let canvas2 = document.getElementById("canvas-pdi2");
  let canvas3 = document.getElementById("canvas-pdi3");
  let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  let context3 = canvas3.getContext("2d");
  let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  let result = sobelAlgorithm(imgData);
  let imgDataResult = result.toImgData();

  imgData = imgDataResult;

  context2.putImageData(imgData, 0, 0);
  context3.putImageData(imgData, 0, 0);
  context4.putImageData(imgData, 0, 0);
}, true);
