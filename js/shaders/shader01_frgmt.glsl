#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
    return smoothstep(pct-0.01, pct, st.y) - 
    smoothstep(pct, pct+0.01, st.y);
}
void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    float y = st.x;
    vec3 color = vec3(y);
     float pct = plot(st*2.-1., sin(2.*(y+u_time*0.25)));
    color = (1.0-pct)*color+pct * vec3(0.0,1.0,0.0);
    gl_FragColor = vec4(color, 1.0);
}