const normalize = (pixels) => {
  let normal = [];
  let max = Math.max(...pixels);
  let min = Math.min(...pixels);
  
  for(let i = 0; i < pixels.length; i++) {
    let px = ((pixels[i] - max)/(max - min));
    normal.push(px, px, px, 255);
  }

  return normal;
};