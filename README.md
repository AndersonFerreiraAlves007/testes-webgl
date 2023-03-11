WebGL náo é uma API 3D, é um mecanismo de rasterização. Serve para desenhar pontos, linhas e triangulos, e não necessariamente desenha coisas 3d para vcs, para conseguir fazer isso, é necessário algum conhecimento matemático

WebGL é executado na GPU do comptador. Portanto é necessário fornecer o
código que é executado na GPU. Esse código é formado por 2 funções que são o sombreador de vértice e sombreador de fragmento e são escritos em uma linguagem parecida com o c/c++ chamada GLSL. Juntas essas duas funções são chamadas de programa.

O sombreador de vértice calcla as posições dos vértices. Com base nas posições que a função gera o WebGL pode gerar pontos, linhas ou triangulos

O sombreador de fragmento é calcular uma cor para cada pixel da primitiva que esta sendo desenhada.

Pra cada coisa que desenha desenhar configuramos nossos dados e encontramos uma forma de envia los para a GPU, em seguida chamados nassas funções de shaders que com base nesses dados desenha nossas primitivas.

Buffers são matrizes de dados binários que carregamos na GPU.

Atributos são usados para especificar como extrair os dados do buffer e fornecer para os shaders.

Buffers não são de acesso aleatorio, o shader é executador algumas vezes, e em cada vez retira dados do buffer e atribuem ao atributo.

Uniformes são variaveis globais definidas antes de executar o programa de shader

Texturas são matrizes de dados de acesso aleatorio em programas de shader, a coisa mais comum de guardar em texturas são os dados de uma imagem.

Variações, é uma forma de um shader de vertice passar dados para o shader de fragmento que faz interpolações.

# Passo a Passo

Bolerplate para criação dos shaders:

```javascript
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

```

Boilerplate para a criação do programa de sombreamento:

```javascript
function createShader(gl, type, source) {
  function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

```

