(function() {

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {

    // glUtils.SL.sourceFromHtml();
    var VSHADER_SOURCE = glUtils.SL.Shaders.v1.vertex;
    var FSHADER_SOURCE = glUtils.SL.Shaders.v1.fragment;

      
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);


    var vertexShader = glUtils.getShader(gl ,gl.VERTEX_SHADER, VSHADER_SOURCE);
    var fragmentShader = glUtils.getShader(gl , gl.FRAGMENT_SHADER , FSHADER_SOURCE);
    var program = glUtils.createProgram(gl, vertexShader , fragmentShader);
    gl.useProgram(program);

    n = initBuffers(gl, program);


    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    function render() {
      
      theta[axis] += 0.5;  // dalam derajat
      gl.uniform3fv(thetaLoc, theta);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      gl.drawArrays(gl.TRIANGLES, 0, 36);
      requestAnimationFrame(render); 
    }

    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    render();
  }

  function initBuffers(gl, program) {
    // var triangleVertices=new Float32Array([
    //   //x,y   r,g,b
    //   0.0, 0.5,   1.0, 1.0, 0.0,
    //   -0.5, -0.5,  0.7, 0.0, 1.0,
    //   0.5, -0.5,  0.1, 1.0, 0.6,
    // ]);

    var cubeVertice = new Float32Array( [
      -0.5, 0.5, 0.5,  1.0, 0.0, 0.0,
      -0.5, -0.5, 0.5,  1.0, 0.0, 0.0,
      0.5, -0.5, 0.5,  1.0, 0.0, 0.0,

      -0.5, 0.5, 0.5,  1.0, 0.0, 0.0,
      0.5, -0.5, 0.5,  1.0, 0.0, 0.0,
      0.5, 0.5, 0.5,   1.0, 0.0, 0.0,


      0.5, 0.5, 0.5,   0.0, 1.0, 0.0,
      0.5, -0.5, 0.5,  0.0, 1.0, 0.0,
      0.5, -0.5, -0.5,  0.0, 1.0, 0.0,

      0.5, 0.5, 0.5,   0.0, 1.0, 0.0,
      0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
      0.5, 0.5, -0.5,  0.0, 1.0, 0.0,


      0.5, -0.5, 0.5,  0.0, 0.0, 1.0,
      -0.5, -0.5, 0.5,  0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,  0.0, 0.0, 1.0,

      0.5, -0.5, 0.5,  0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,  0.0, 0.0, 1.0,
      0.5, -0.5, -0.5,  0.0, 0.0, 1.0,


      -0.5, -0.5, -0.5,  1.0, 1.0, 0.0,
      -0.5, 0.5, -0.5,  1.0, 1.0, 0.0,
      0.5, 0.5, -0.5,  1.0, 1.0, 0.0,

      -0.5, -0.5, -0.5,  1.0, 1.0, 0.0,
      0.5, 0.5, -0.5,  1.0, 1.0, 0.0,
      0.5, -0.5, -0.5,  1.0, 1.0, 0.0,


      -0.5, 0.5, -0.5,  0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,  0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,  0.0, 1.0, 1.0,

      -0.5, 0.5, -0.5,  0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,  0.0, 1.0, 1.0,
      -0.5, 0.5, 0.5,  0.0, 1.0, 1.0,


      0.5, 0.5, -0.5,  1.0, 0.0, 1.0,
      -0.5, 0.5, -0.5,  1.0, 0.0, 1.0,
      -0.5, 0.5, 0.5,  1.0, 0.0, 1.0,

      0.5, 0.5, -0.5,  1.0, 0.0, 1.0,
      -0.5, 0.5, 0.5,  1.0, 0.0, 1.0,
      0.5, 0.5, 0.5,   1.0, 0.0, 1.0,
      
    ]);

    var n = 36;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertice), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    
    gl.vertexAttribPointer(
      vPosition , 3 , gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT , 0
    );

    gl.vertexAttribPointer(
      vColor , 3 , gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT , 3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    return n;
  }
   
})();


