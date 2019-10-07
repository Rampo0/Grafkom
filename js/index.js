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

    n = initBuffers(gl, program);

    gl.useProgram(program);

    var thetaLoc = gl.getUniformLocation(program,'theta');
    var theta = 0;

    var scaleLoc = gl.getUniformLocation(program,'scale');
    var scale = 0;
    var isGrow = 1;
    
    function render(){
      // gl.clearColor(0.0, 0.0, 0.0, 1.0);

      theta += Math.PI * 0.001;
      gl.uniform1f(thetaLoc, theta);

      if(isGrow) {scale += 0.01}
      else{
        scale -= 0.01;
      }

      if(scale >= 1.0) {isGrow = 0;}
      else if(scale <= -(1.0)){isGrow =1;}
      gl.uniform1f(scaleLoc, scale);


      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES,0,n);
      requestAnimationFrame(render);
    }
    render();
  }

  function initBuffers(gl, program) {
    var triangleVertices=new Float32Array([
      //x,y   r,g,b
      0.0, 0.5,   1.0, 1.0, 0.0,
      -0.5, -0.5,  0.7, 0.0, 1.0,
      0.5, -0.5,  0.1, 1.0, 0.6,
    ]);

    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    
    gl.vertexAttribPointer(
      vPosition , 2 , gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT , 0
    );

    gl.vertexAttribPointer(
      vColor , 3 , gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT , 2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    return n;
  }
   
})();


