var canvas1 = document.getElementById("glcanvas1");
var canvas2 = document.getElementById("glcanvas2");
var canvas3 = document.getElementById("glcanvas3");
var canvas4 = document.getElementById("glcanvas4");

var gl1 = glUtils.checkWebGL(canvas1);
var gl2 = glUtils.checkWebGL(canvas2);
var gl3 = glUtils.checkWebGL(canvas3);
var gl4 = glUtils.checkWebGL(canvas4);

gl1.clearColor(0.0, 0.0, 0.0, 1.0);
gl1.clear(gl1.COLOR_BUFFER_BIT);

gl2.clearColor(1.0, 0.0, 0.0, 1.0);
gl2.clear(gl2.COLOR_BUFFER_BIT);

gl3.clearColor(0.0, 1.0, 0.0, 1.0);
gl3.clear(gl3.COLOR_BUFFER_BIT);

gl4.clearColor(0.0, 0.0, 1.0, 1.0);
gl4.clear(gl4.COLOR_BUFFER_BIT);
