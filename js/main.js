(function() {

    glUtils.SL.init({ callback: function() { main(); } });
    var canvas , gl , vertexShader, fragmentShader , program , program2, vertexShader2, fragmentShader2;
    var currentPressedKeys = {};
    var pos = [0,0,0];
    var letterVertices = [
      -0.2, -0.3,-0.0,   
      0.0, +0.5,0.0,   
      +0.2, -0.3,0.0,  

      -0.2, -0.3,0.0,   
      -0.3, -0.7,0.0, 
      -0.2, -0.7,0.0,  

      -0.2, -0.3,0.0,  
      -0.2, -0.7,0.0,   
      -0.1, -0.3,0.0,   

      +0.2, -0.3,0.0, 
      +0.3, -0.7,0.0,  
      +0.2, -0.7,0.0, 

      +0.2, -0.3,0.0,   
      +0.2, -0.7,0.0,  
      +0.1, -0.3,0.0, 
    ];

    // var cubeBoundaryPoint = [0, 15, 18, 21, 33, 45];
    var cubeBoundaryPoint = [0, 15, 18, 21, 33, 45];
    // var letterEdges = [4, 13 , 9, 27];

    var stats;

    function BuildProgramShaders(){

        // assign shader to program (program literally your shaders)
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
      
        // Init program
        vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    }

    function BuildCubeWireframe(){
      
      gl.useProgram(program);
      //create buffer
      boxBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER , boxBuffer);

      boxVertices = [
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0
      ]

      gl.bufferData(gl.ARRAY_BUFFER , new Float32Array(boxVertices) , gl.STATIC_DRAW);
      var vPosition = gl.getAttribLocation(program, 'vPosition');

      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

    }

    function BuildLetter(){

      gl.useProgram(program2);
      //create buffer
      letterBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER ,letterBuffer);

      gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(letterVertices), gl.STATIC_DRAW);
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      // var vColor = gl.getAttribLocation(program2, 'vColor');

      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        0,
        0                                   // offset dari posisi elemen di array
      );

      // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      
      gl.enableVertexAttribArray(vPosition);
      // gl.enableVertexAttribArray(vColor);

    }

    function OnCollision() {
      // for (var i = 0; i < pos.length; i++) {
      //   for (var k = 0; k < cubeBoundaryPoint.length; k++) {
      //     if (letterVertices[cubeBoundaryPoint[k] + i] >= 1 || letterVertices[cubeBoundaryPoint[k] + i] <= -1) {
      //       pos[i] *= -1;
      //       rotDir *= -1;
      //       break;
      //     }
      //   }
      // }

      for (var i = 0; i < pos.length; i++) {
        for (var k = 0; k < cubeBoundaryPoint.length; k++) {
          if (letterVertices[cubeBoundaryPoint[k] + i] >= 1 || letterVertices[cubeBoundaryPoint[k] + i] <= -1) {
            pos[i] *= -1;
            rotDir *= -1;
            break;
          }
        }
      }
    }

    var center = [0,0,0];
    var rotDir = 1;
    function update(){
      // movement
      letterVertices = matrixTranslating(letterVertices , pos[0] * 0.01, pos[1] * 0.01, pos[2] * 0.01);
      center[0] += (pos[0] * 0.01);
      center[1] += (pos[1] * 0.01);
      center[2] += (pos[2] * 0.01);
      letterVertices = matrixRotating(letterVertices, rotDir * 1.5, center[0], center[2])
      
      OnCollision();
    }

    function render(){

      // render object
      stats.begin();
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      handleKeys();
      update();
      //draw boxwire
      BuildCubeWireframe();
      gl.drawArrays(gl.LINES, 0, 24);

      // draw letter
      BuildLetter();
      gl.drawArrays(gl.TRIANGLES, 0, 15);
      stats.end();
      requestAnimationFrame(render); 
    }

    function BuildCamera(){

      // Init View and projection
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
        glMatrix.vec3.fromValues(-0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      // glMatrix.mat4.lookAt(vm,
      //   glMatrix.vec3.fromValues(2.0, 2.0, 0.0),    // posisi kamera
      //   glMatrix.vec3.fromValues(-0.0, -1.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      //   glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      // );

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
     
      
      gl.useProgram(program);
      // get address uniform
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      
      // send data tu shaders via uniform
      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      gl.useProgram(program2);
      var vmLoc2 = gl.getUniformLocation(program2, 'view');
      var pmLoc2 = gl.getUniformLocation(program2, 'projection');

       // send data tu shaders via uniform
       gl.uniformMatrix4fv(vmLoc2, false, vm);
       gl.uniformMatrix4fv(pmLoc2, false, pm);
    }

    
    function handleKeys() {
        if (currentPressedKeys[37]) {
            // Kiri
            pos[0] -= 0.05;
            console.log("kiri");
        }

        if (currentPressedKeys[39]) {
            // Kanan
            pos[0] += 0.05;
            console.log("kanan");
        }

        if (currentPressedKeys[38]) {
            // Atas
            pos[1] += 0.05;
            console.log("atas");
        }

        if (currentPressedKeys[40]) {
            // Bawah
            pos[1] -= 0.05;
            console.log("bawah");
        }

        if (currentPressedKeys[87]) {
        
          pos[2] += 0.05;
          console.log("w");
        }

        if (currentPressedKeys[83]) {
          pos[2] -= 0.05;
          console.log("s");
        }
    }

    function BuildController(){
      function handleKeyDown(event) {
        currentPressedKeys[event.keyCode] = true
      }
  
      function handleKeyUp(event) {
          currentPressedKeys[event.keyCode] = false
      }
  
      document.onkeydown = handleKeyDown
      document.onkeyup = handleKeyUp

    }

    function main() {

      // Init
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '20%';
      stats.domElement.style.top = '40%';
      document.body.appendChild( stats.domElement );
      BuildProgramShaders();
      BuildCamera();
      BuildController();

      render();
  
    }
  
  })();