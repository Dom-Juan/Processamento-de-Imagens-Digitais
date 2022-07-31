const dilatation = (imgData, canvasType) => {
  const pixels = new Uint32Array(imgData.data.buffer);
  let canvas, context;
  if(canvasType === "canvas2") {
    canvas = document.getElementById("canvas-pdi2");
    context = canvas.getContext("2d");
  } else {
    canvas = document.getElementById("canvas-pdi3");
    context = canvas.getContext("2d");
  }
  let mask = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  let pixelsArray = [];

  for (let i = 0; i < pixels.length; i++) {
    pixelsArray[i] = 0;
  }

  for (let i = 0; i < pixels.length; i++) {
    r = pixels[i] & 0xFF;
    g = (pixels[i] >> 8) & 0xFF;
    b = (pixels[i] >> 16) & 0xFF;

    let cor = parseInt(0.299 * r + 0.587 * g + 0.114 * b);

    if (cor > 0)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++) {
          let d = 0;

          d += k == -1 ? -imgWidth : 0;
          d += k == 1 ? imgWidth : 0;

          if (mask[j + 1][k + 1] == 1) pixelsArray[i + j + d] = 255;
        }
  }

  for (let i = 0; i < pixels.length; i++) {
    context.fillStyle = rgbToHex(pixelsArray[i], pixelsArray[i], pixelsArray[i]);
    context.fillRect(i % imgWidth, parseInt(i / imgWidth), 1, 1);
  }
}

$("#btn-dilatation").on("click", () => {
  console.log("** Dilatação **");

  let imgData = context1.getImageData(0, 0, imgWidth, imgHeight);

  dilatation(imgData, "canvas2");

  console.log("Sucesso!");
});