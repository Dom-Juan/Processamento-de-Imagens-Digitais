let scaleFac = 2.3; // scale 1> zoom in 
let panX = 10;  // scaled image pan
let panY = 10; 
let ang = 1;
let w = context1.canvas.width;  // source image
let h = context1.canvas.height;
let wd = context2.canvas.width;  // destination image
let hd = context2.canvas.height;
// use 32bit ints as we are not interested in the channels
let src = context1.getImageData(0, 0, w, h);
let data = new Uint32Array(src.data.buffer);// source
let dest = context2.createImageData(wd, hd);
let zoomData = new Uint32Array(dest.data.buffer);// destination
let xdx = Math.cos(ang) * scaleFac;  // xAxis vector x
let xdy = Math.sin(ang) * scaleFac;  // xAxis vector y
let ind = 0;
let xx,yy;
for(let y = 0; y < hd; y ++){
    for(let x = 0; x < wd; x ++){
        // transform point
        xx = (x * xdx - y * xdy + panX);
        yy = (x * xdy + y * xdx + panY);
        // is the lookup pixel in bounds
        if(xx >= 0 && xx < w && yy >= 0 && yy < h){                
             // use the nearest pixel to set the new pixel
             zoomData[ind++] = data[(xx | 0) + (yy | 0) * w]; // set the pixel
        }else{
             zoomData[ind++] = 0; // pixels outside bound are transparent
        }
    }
}

context2.putImageData(dest, 0, 0); // put the pixels onto the destination canvas