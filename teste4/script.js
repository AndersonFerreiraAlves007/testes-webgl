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

function main() {
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");

  if (!gl) {
    return;
  }

  resetCanvas(gl)

  var translation = [0, 0];

  webglLessonsUI.setupSlider("#x", {slide: updatePosition(0), max: gl.canvas.width });
  webglLessonsUI.setupSlider("#y", {slide: updatePosition(1), max: gl.canvas.height});

  function updatePosition(index) {
    return function(event, ui) {
      translation[index] = ui.value;
      render();
    };
  }

  var program = createProgramLocal(gl, "#vertex-shader-2d", "#fragment-shader-2d");

  var translationLocation = gl.getUniformLocation(program, "u_translation");

  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

  /////////////////////

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    0, 0,
    0, 200,
    200, 0,
    0, 200,
    200, 0,
    200, 200
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

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  ///////////////////

  

  /////////////////////////////////

  render()

  function render() {

    console.log(translation)

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

    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    gl.uniform2fv(translationLocation, translation);

    ///////////////////////////////
  
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
  
    gl.drawArrays(primitiveType, offset, count);
  
  }
}



main();
