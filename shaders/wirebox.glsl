precision mediump float;
attribute vec3 vPosition;
uniform mat4 projection;
uniform mat4 view;

void main() {

    mat4 translate = mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, -3.0, 1.0 
    );

  gl_Position = projection * view * translate * vec4(vPosition, 1.0);
 
}