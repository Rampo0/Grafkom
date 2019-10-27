(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
  
    // Definisi verteks dan buffer
    /**
     *  A ( -0.5, -0.5,  0.5 )
     *  B ( -0.5,  0.5,  0.5 )
     *  C (  0.5,  0.5,  0.5 )
     *  D (  0.5, -0.5,  0.5 )
     *  E ( -0.5, -0.5, -0.5 )
     *  F ( -0.5,  0.5, -0.5 )
     *  G (  0.5,  0.5, -0.5 )
     *  H (  0.5, -0.5, -0.5 )
     */
    var cubeVertices = [
      // x, y, z            r, g, b
      -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  // depan, merah, BAD BDC
      -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
       0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
       0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0, 0.0,  // kanan, hijau, CDH CHG
       0.5, -0.5,  0.5,     0.0, 1.0, 0.0,
       0.5, -0.5, -0.5,     0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0, 0.0,
       0.5, -0.5, -0.5,     0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     0.0, 1.0, 0.0,
       0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  // bawah, biru, DAE DEH
      -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
       0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
       0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  // belakang, kuning, EFG EGH
      -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
      -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
       0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
      -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,  // kiri, cyan, FEA FAB
      -0.5, -0.5, -0.5,     0.0, 1.0, 1.0,
      -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,
      -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,
      -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,
      -0.5,  0.5,  0.5,     0.0, 1.0, 1.0,
       0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  // atas, magenta, GFB GBC
      -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
       0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
       0.5,  0.5,  0.5,     1.0, 0.0, 1.0
    ];

    var cubeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

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

    // Definisi view dan projection
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

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

})();