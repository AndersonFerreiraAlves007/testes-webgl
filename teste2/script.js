"use strict";

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function createProgramLocal(gl, idVertexShader, idFragmentShader) {
  const vertexShaderSource = document.querySelector(idVertexShader).text;
  const fragmentShaderSource = document.querySelector(idFragmentShader).text;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  return createProgram(gl, vertexShader, fragmentShader);
}

function resetCanvas(gl) {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(1, 0.5, 0.5, 3);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function main(image) {
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");

  if (!gl) {
    return;
  }

  var program = createProgramLocal(gl, "#vertex-shader-2d", "#fragment-shader-2d");

  /////////////////////

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    0, 0,
    0, 0.5,
    0.5, 0,
    0, 0.5,
    0.5, 0,
    0.5, 0.5
  ];

  var positions2 = [
    0, 0,
    0, 0.3,
    0.3, 0,
    0, 0.3,
    0.3, 0,
    0.3, 0.3
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  //////////////////////

  var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  var colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  var colors = [
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 1, 0, 1,
    0, 1, 0, 1,
  ];

  var colors2 = [
    1, 0, 1, 1,
    1, 0, 1, 1,
    1, 0, 1, 1,
    0, 1, 1, 1,
    0, 1, 1, 1,
    0, 1, 1, 1,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  ///////////////////

  resetCanvas(gl)

  gl.useProgram(program);

  //////////////////////

  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;          
  var type = gl.FLOAT;   
  var normalize = false; 
  var stride = 0;        
  var offset = 0;    

  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

  //////////////////////

  gl.enableVertexAttribArray(colorAttributeLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  var size2 = 4;          
  var type2 = gl.FLOAT;   
  var normalize2 = false; 
  var stride2 = 0;        
  var offset2 = 0;    

  gl.vertexAttribPointer(
    colorAttributeLocation, size2, type2, normalize2, stride2, offset2);

  /////////////////////////

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;

  gl.drawArrays(primitiveType, offset, count);

  ////////////////
  ///////////////////////////
  /////////////////////////////

  var program2 = createProgramLocal(gl, "#vertex-shader-2d-2", "#fragment-shader-2d-2");

  //////////////////////////

  var positionAttributeLocation2 = gl.getAttribLocation(program2, "a_position");

  var positionBuffer2 = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);

  //////////////////////////////////////

  console.log(image)


  //////////////////////////////////////

  var texcoordLocation = gl.getAttribLocation(program2, "a_texCoord");

  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0,
  ]), gl.STATIC_DRAW);

  // Create a texture.
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  //////////////

  gl.useProgram(program2);

  ///////////////////

  gl.enableVertexAttribArray(positionAttributeLocation2);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);   

  gl.vertexAttribPointer(
      positionAttributeLocation2, size, type, normalize, stride, offset);

  /////////

  gl.enableVertexAttribArray(texcoordLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0,
]), gl.STATIC_DRAW);   

  gl.vertexAttribPointer(
    texcoordLocation, 2, type2, normalize2, stride2, offset2);

  ////////////

  gl.drawArrays(primitiveType, 0, 6);

}

var image = new Image();
image.crossOrigin = "anonymous";
image.src = "https://webglfundamentals.org/webgl/resources/leaves.jpg";  // MUST BE SAME DOMAIN!!!
image.onload = function() {
  main(image);
};
