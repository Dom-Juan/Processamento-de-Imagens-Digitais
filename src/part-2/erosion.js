const erosion = (imgData, canvasType) => {
  let canvas, context;
  if(canvasType === "canvas2") {
    canvas = document.getElementById("canvas-pdi2");
    context = canvas.getContext("2d");
  } else {
    canvas = document.getElementById("canvas-pdi4");
    context = canvas.getContext("2d");
  }
  const pixels = new Uint32Array(imgData.data.buffer);

  let mask = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  let remove;
  let pixelsArray = []

  for (let i = 0; i < pixels.length; i++) {
    pixelsArray[i] = 0;
  }

  for (let i = 0; i < pixels.length; i++) {
    r = pixels[i] & 0xFF;
    g = (pixels[i] >> 8) & 0xFF;
    b = (pixels[i] >> 16) & 0xFF;

    let c = parseInt(0.299 * r + 0.587 * g + 0.114 * b);

    if (c > 0) {
      remove = false
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          let d = 0;

          d += k == -1 ? -imgWidth : 0;
          d += k == 1 ? imgWidth : 0;

          r = pixels[i + j] & 0xFF;
          g = (pixels[i + j + d] >> 8) & 0xFF;
          b = (pixels[i + j + d] >> 16) & 0xFF;

          let c2 = parseInt(0.299 * r + 0.587 * g + 0.114 * b);

          if (mask[j + 1][k + 1] == 1 && c2 == 0) {
            remove = true;
          }

          if (remove) {
            pixelsArray[i] = 0;
          }
          else {
            pixelsArray[i] = 255;
          }
        }
      }
    }
  }

  for (let i = 0; i < pixels.length; i++) {
    context.fillStyle = rgbToHex(pixelsArray[i], pixelsArray[i], pixelsArray[i])
    context.fillRect(i % imgWidth, parseInt(i / imgWidth), 1, 1)
  }
}

$("#btn-erosion").on("click", () => {
  console.log("** Erosão **");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  erosion(imgData, "canvas2");

  console.log("Sucesso!");
});