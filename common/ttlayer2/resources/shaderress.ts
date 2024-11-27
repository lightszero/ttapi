import * as s from "../graphics/shader/shaders.js"



var vs_default: string = `#version 300 es
    layout(location = 0) in vec3 position;//顶点提供的数据
    layout(location = 1) in vec2 uv; 
    layout(location = 2) in vec4 color; 
    layout(location = 3) in vec4 ext; 

    uniform mat4 matModel;
    uniform mat4 matView;
    uniform mat4 matProj;

    out vec4 vColor;//输出给fs的参数
    out vec2 vUv;//输出给fs的参数2
    flat out vec4 vExt;

    void main(void) 
    {
        mat4 matrix = matProj*matView*matModel;
        gl_Position = matrix * vec4(position,1);// uViewProjMatrix * uModelMatrix * position;
        vColor = color;
        vUv = uv;
        vExt = ext;
    }
    `;

var fs_default: string = `#version 300 es
    precision mediump float;//指定浮点型精确度
    
    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    flat in vec4 vExt;

        
    layout(location = 0) out vec4 fragColor;

    //uniform sampler2D tex2;
    uniform sampler2D tex;  //从外部设置的参数
    void main(void) 
    {
        vec4 texc = texture(tex,vUv);
        vec4 outc = vColor;
        int effect = int(vExt.w);
        if(effect==0)//rgba model 
        {
            outc = vColor*texc;
        }
        else if(effect==1)//gray model
        {
            vec4 c = vec4(texc.r,texc.r,texc.r,1);
            outc = vColor * c;
        }
        else if(effect==4)//gray as alpha model
        {
            //outc.a *= texc.r;
            outc = vColor;
            outc.a =texc.r; 
            //outc = vColor * 0.5;
        }
        fragColor =  outc;
    }
    `;

var vs_simple: string = `#version 300 es
    layout(location = 0) in vec3 position;//顶点提供的数据
    layout(location = 1) in vec2 uv; 
    layout(location = 2) in vec4 color; 
 

    uniform mat4 matModel;
    uniform mat4 matView;
    uniform mat4 matProj;

    out vec4 vColor;//输出给fs的参数
    out vec2 vUv;//输出给fs的参数2
    //flat out vec4 vExt;

    void main(void) 
    {
        mat4 matrix = matProj*matView*matModel;
        gl_Position = matrix * vec4(position,1);// uViewProjMatrix * uModelMatrix * position;
        vColor = color;
        vUv = uv;
        //vExt = ext;
    }
    `;

var vs_simple_inst: string = `#version 300 es
layout(location = 0) in vec3 position;//顶点提供的数据
layout(location = 1) in vec2 uv; 
layout(location = 2) in vec4 color; 
layout(location = 3) in vec3 pos_inst; 

uniform mat4 matModel;
uniform mat4 matView;
uniform mat4 matProj;

out vec4 vColor;//输出给fs的参数
out vec2 vUv;//输出给fs的参数2
//flat out vec4 vExt;

void main(void) 
{
    mat4 matrix = matProj*matView*matModel;
    gl_Position = matrix * vec4(position+pos_inst,1);// uViewProjMatrix * uModelMatrix * position;
    vColor = color;
    vUv = uv;
    //vExt = ext;
}
`;
var fs_simple: string = `#version 300 es
    precision mediump float;//指定浮点型精确度
    
    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    //flat in vec4 vExt;

        
    layout(location = 0) out vec4 fragColor;

    //uniform sampler2D tex2;
    uniform sampler2D tex;  //从外部设置的参数
    void main(void) 
    {
        vec4 texc = texture(tex,vUv);
        vec4 outc = vColor;
       
        outc = vColor * texc;
       
        fragColor =  outc;
    }
    `;

var vs_feedback: string = `#version 300 es
layout(location = 0) in vec3 position;//顶点提供的数据
layout(location = 1) in vec3 normal;//顶点提供的数据
out vec3 outPos;
out vec3 outNormal;
void main(void) 
{
    outPos = position + normal;
    outNormal = normal;
}
`;
var fs_empty: string = `#version 300 es
    precision mediump float;//指定浮点型精确度
   
    layout(location = 0) out vec4 fragColor;

    void main(void) 
    {
        fragColor =  vec4(0,0,0,1);
    }
    `;
var fs_tiledmap: string = `#version 300 es
    precision mediump float;//指定浮点型精确度
   
    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数

    uniform sampler2D tex; 
    uniform sampler2D tex2; 
    uniform vec4     texsize;//xy map size, z=tilesize, w =tile texturesize
    layout(location = 0) out vec4 fragColor;

    void main(void) 
    {
        //抽取TiledIndex
        vec4 texc = texture(tex,vUv);
        float su =float(int(texc.r*255.0+0.9)); //tileindex x
        float sv =float(int(texc.g*255.0+0.9)); //tileindex y

        //计算tileduv
        float subu = mod(vUv.x * texsize.x, 1.0);
        float subv = mod(vUv.y * texsize.y, 1.0);
        float tilescale =texsize.z/texsize.w;
        vec2 tuv = vec2((su+subu)*tilescale,(sv+subv)*tilescale);

        //合成颜色
        vec4 ttc = texture(tex2,tuv);
        vec4 outc = ttc * vColor;

        
        fragColor =  outc;
    }
    `;
export function InitInnerShader(webgl: WebGL2RenderingContext): void {
    var vsdef = s.AddShader(webgl, s.ShaderType.VertexShader, "default", vs_default, true);
    var fsdef = s.AddShader(webgl, s.ShaderType.FragmentShader, "default", fs_default, true);

    if (vsdef != null && fsdef != null)
        s.LinkShader(webgl, "default", vsdef, fsdef);

    var vssim = s.AddShader(webgl, s.ShaderType.VertexShader, "simple", vs_simple, true);
    var fssim = s.AddShader(webgl, s.ShaderType.FragmentShader, "simple", fs_simple, true);

    if (vssim != null && fssim != null)
        s.LinkShader(webgl, "simple", vssim, fssim);

    var vssim_inst = s.AddShader(webgl, s.ShaderType.VertexShader, "simple_inst", vs_simple_inst, true);
    if (vssim_inst != null && fssim != null)
        s.LinkShader(webgl, "simple_inst", vssim_inst, fssim);

    var vsfeedback = s.AddShader(webgl, s.ShaderType.VertexShader, "feedback", vs_feedback, true);
    var fsempty = s.AddShader(webgl, s.ShaderType.FragmentShader, "empty", fs_empty, true);
    if (vsfeedback != null && fsempty != null)
        s.LinkShaderFeedBack(webgl, "feedback", vsfeedback, fsempty, ["outPos", "outNormal"]);


    var fstiledmap = s.AddShader(webgl, s.ShaderType.FragmentShader, "tiledmap", fs_tiledmap, true);
    if (vsdef != null && fstiledmap != null)
        s.LinkShader(webgl, "tiledmap", vsdef, fstiledmap);

}
