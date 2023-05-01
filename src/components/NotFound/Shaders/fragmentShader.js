const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
varying vec2 vUv;
varying float vDisplacement;
void main() {
    float distort = 8.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = vec3(abs(vUv - 0.99) * 1.0  * (0.1 - distort), 0.0001);
    gl_FragColor = vec4(color, 0.99);
}
`;

export default fragmentShader;