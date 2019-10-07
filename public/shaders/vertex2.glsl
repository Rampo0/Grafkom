precision mediump float;
attribute vec4 aPosition;
uniform float theta;

//attribute vec4 aColor;

//varying vec4 vColor;

void main() {
  //gl_PointSize = 1.5;
  //vColor = aColor;

  mat4 rotasi = mat4(
            cos(theta), -(sin(theta)), 0.0, 0.0,
            sin(theta), cos(theta) , 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
  );

  gl_Position = aPosition * rotasi;
  
}