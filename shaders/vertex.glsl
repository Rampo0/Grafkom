precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scale;

void main(){
    // gl_Position = vec4(vPosition , 0.0 , 1.0);
    fColor = vColor;
    // float rad = 0.0174533;
    // float theta = 45.0 * rad;

    mat4 translasi = mat4(
            1.0, 0.0, 0.0, 0.5,
            0.0, 1.0 , 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
    );

    mat4 rotasi = mat4(
            cos(theta), -(sin(theta)), 0.0, 0.0,
            sin(theta), cos(theta) , 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
    );

    mat4 skalasi = mat4(
            scale, 0.0, 0.0, 0.1,
            0.0, 1.0 , 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
    );



    gl_Position = vec4(vPosition,0.0,1.0) * skalasi;

    gl_Position = gl_Position *  translasi;

    gl_Position = gl_Position *  rotasi;
}