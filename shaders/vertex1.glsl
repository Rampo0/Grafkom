precision mediump float;
attribute vec2 aPosition;
attribute vec3 vColor;
varying vec3 fColor; 
uniform float scale;
uniform float theta2;

void main() {
  //gl_Position = vec4(aPosition,0.0,1.0);
  fColor = vColor;

  mat4 skalasi = mat4(
          scale, 0.0, 0.0, 0.0,
          0.0, 1.0 , 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
  );

   mat4 rotasi = mat4(
            cos(theta2), 0.0, sin(theta2), 0.0,
            0.0, 1.0 , 0.0, 0.0,
            -(sin(theta2)), 0.0, cos(theta2), 0.0,
            0.0, 0.0, 0.0, 1.0
  );


  //gl_Position = vec4(aPosition,0.0,1.0) * rotasi;
  gl_Position = vec4(aPosition,0.0,1.0) * skalasi;
  //gl_Position = gl_Position * skalasi;
 // gl_Position = gl_Position * rotasi;
}