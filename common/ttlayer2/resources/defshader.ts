
import { ShaderType } from "../graphics/shader.js";
import { Resources } from "./resources.js";



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
    flat out int vExt;
    flat out int vLayer;
    void main(void) 
    {
        mat4 matrix = matProj*matView*matModel;
        gl_Position = matrix * vec4(position,1);// uViewProjMatrix * uModelMatrix * position;
        vColor = color;
        vUv = uv;
        vExt = int(ext.w);
        vLayer =int(ext.x);
    }
    `;
var vs_inst_tbo: string = `#version 300 es
    //form vbo1 as mesh
    layout(location = 0) in vec2 elemuv; 
    //from vbo2 as inst
    layout(location = 1) in vec4 posrotate;
    layout(location = 2) in vec2 scale;
    layout(location = 3) in vec4 color; //rgba32
    layout(location = 4) in vec2 ext;

    // layout(std140, column_major) uniform;
    struct Sprite //结构体的基线是4n的倍数
    {
        vec2 posLT;
        vec2 posRB;
        vec2 uvCenter;
        vec2 uvHalfSize;
        float uvlayer;
        float empty1;//占位，凑4N
        float empty2;
        float eff;
       
    };
    uniform mat4 matModel;
    uniform mat4 matView;
    uniform mat4 matProj;
    uniform sampler2D texelem;
    out vec4 vColor;
    out vec2 vUv;
    flat out int vExt;
    flat out int vLayer;
    void main(void)
    { 
        //get sprite
        int ext = int(ext.x);
        int iuvx = ext%128 *4;
        int iuvy = ext/128;

        
        vec4 v0 = texelFetch(texelem,ivec2(iuvx+0,iuvy),0);
        vec4 v1 = texelFetch(texelem,ivec2(iuvx+1,iuvy),0);
        vec4 v2 = texelFetch(texelem,ivec2(iuvx+2,iuvy),0);
        //vec4 v3 =texelFetch(texelem,ivec2(iuvx+3,iuvy),0);
        
        Sprite s;
        s.posLT = v0.xy;
        s.posRB =vec2(8.0,8.0);//v0.zw;
        s.uvCenter =vec2(0.5,0.5);//v1.xy;
        s.uvHalfSize =vec2(0.5,0.5);//v1.zw;
        s.uvlayer =0.0;//v2.x;
        s.eff =4.0;//v2.w;
       
      
      
        //----begin calc final pos
        vec2 poslocal;
        poslocal.x=elemuv.x<0.0?s.posLT.x:s.posRB.x;
        poslocal.y=elemuv.y<0.0?s.posLT.y:s.posRB.y;
        poslocal*=scale;

        //poslocal is work


        //--begin rotate
        float cosv = cos(posrotate.w);
        float sinv = sin(posrotate.w);
        
        float poslocallen = sqrt(dot(poslocal,poslocal));
        if(poslocallen<0.001)   
        {
            gl_Position =vec4(0,0,0,0);
        }
        else
        {
            vec2 poslocalnor = poslocal / poslocallen;
            poslocal.x = cosv*poslocalnor.x + -sinv*poslocalnor.y;
            poslocal.y = sinv*poslocalnor.x + cosv*poslocalnor.y;
            poslocal *= poslocallen;
            //--end rorate

            vec4 pos = vec4(posrotate.xyz,1);

            //apply tran
            pos.xy+=poslocal;
            //----end finalpos
            mat4 matrix = matProj*matView*matModel;
            gl_Position = matrix * pos;
        }
        //pass uv
        vec2 uv =  s.uvCenter + elemuv*s.uvHalfSize;
       
        vUv = uv;
        //pass color
        vColor = color;
        //pass ext
        vExt=int(s.eff);
        vLayer=int(s.uvlayer);
    }
`;
var vs_inst_ubo: string = `#version 300 es
    //form vbo1 as mesh
    layout(location = 0) in vec2 elemuv; 
    //from vbo2 as inst
    layout(location = 1) in vec4 posrotate;
    layout(location = 2) in vec2 scale;
    layout(location = 3) in vec4 color; //rgba32
    layout(location = 4) in vec2 ext;

    layout(std140, column_major) uniform;
    struct Sprite //结构体的基线是4n的倍数
    {
        vec2 posLT;
        vec2 posRB;
        vec2 uvCenter;
        vec2 uvHalfSize;
        float uvlayer;
        float empty1;//占位，凑4N
        float empty2;
        float eff;
       
    };

    uniform SpritesBlock {//手机一个UniformBlock中允许的元素数量有限，我测试的手机是1024
        //所以这里设置为1023+1
        Sprite data[1023];    
        int endtag; //不加一点,在firefox会报错,在chrome 画不出来，手机却是正常的
    } sprites;
    
    uniform mat4 matModel;
    uniform mat4 matView;
    uniform mat4 matProj;

    out vec4 vColor;
    out vec2 vUv;
    flat out int vExt;
    flat out int vLayer;
    void main(void)
    { 
        //get sprite
        Sprite s = sprites.data[int(ext.x)];
       
      
      
        //----begin calc final pos
        vec2 poslocal;
        poslocal.x=elemuv.x<0.0?s.posLT.x:s.posRB.x;
        poslocal.y=elemuv.y<0.0?s.posLT.y:s.posRB.y;
        poslocal*=scale;

        //poslocal is work


        //--begin rotate
        float cosv = cos(posrotate.w);
        float sinv = sin(posrotate.w);
        
        float poslocallen = sqrt(dot(poslocal,poslocal));
        if(poslocallen<0.001)   
        {
            gl_Position =vec4(0,0,0,0);
        }
        else
        {
            vec2 poslocalnor = poslocal / poslocallen;
            poslocal.x = cosv*poslocalnor.x + -sinv*poslocalnor.y;
            poslocal.y = sinv*poslocalnor.x + cosv*poslocalnor.y;
            poslocal *= poslocallen;
            //--end rorate

            vec4 pos = vec4(posrotate.xyz,1);

            //apply tran
            pos.xy+=poslocal;
            //----end finalpos
            mat4 matrix = matProj*matView*matModel;
            gl_Position = matrix * pos;
        }
        //pass uv
        vec2 uv =  s.uvCenter + elemuv*s.uvHalfSize;
       
        vUv = uv;
        //pass color
        vColor = color;
        //pass ext
        vExt=int(s.eff);
        vLayer=int(s.uvlayer);
    }
`;
var fs_default: string = `#version 300 es
    precision mediump float;//指定浮点型精确度
    precision highp sampler2DArray;
    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    flat in int vExt;
    flat in int vLayer;
        
    layout(location = 0) out vec4 fragColor;

    uniform sampler2DArray tex2;
    uniform sampler2DArray tex;  //从外部设置的参数
    void main(void) 
    {
        vec4 texc = vExt==0? texture(tex,vec3(vUv,vLayer))
        : texture(tex2,vec3(vUv,vLayer));
        vec4 outc = vColor;
        int effect = vExt;//int(vExt.w);
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
    uniform sampler2D tex2;
    void main(void) 
    {
        vec4 t1 = texelFetch(tex2,ivec2(0, 0), 0);
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
    precision highp sampler2DArray;

    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    //flat in vec4 vExt;

        
    layout(location = 0) out vec4 fragColor;

    uniform sampler2D tex2;
    uniform sampler2DArray tex;  //从外部设置的参数
    void main(void) 
    {
        vec4 t1 = texelFetch(tex2,ivec2(0, 0), 0);
        vec4 texc = texture(tex,vec3(vUv,0));
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
    precision highp sampler2DArray;

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
    var vsinst_tbo = Resources.CompileShader(webgl, ShaderType.VertexShader, "inst_tbo", vs_inst_tbo);

    var vsinst_ubo = Resources.CompileShader(webgl, ShaderType.VertexShader, "inst_ubo", vs_inst_ubo);

    var vsdef = Resources.CompileShader(webgl, ShaderType.VertexShader, "default", vs_default);
    var fsdef = Resources.CompileShader(webgl, ShaderType.FragmentShader, "default", fs_default);

    if (vsdef != null && fsdef != null)
        Resources.AddProgram(webgl, "default", vsdef, fsdef);

    var vssim = Resources.CompileShader(webgl, ShaderType.VertexShader, "simple", vs_simple);
    var fssim = Resources.CompileShader(webgl, ShaderType.FragmentShader, "simple", fs_simple);

    if (vssim != null && fssim != null)
        Resources.AddProgram(webgl, "simple", vssim, fssim);

    var vssim_inst = Resources.CompileShader(webgl, ShaderType.VertexShader, "simple_inst", vs_simple_inst);
    if (vssim_inst != null && fssim != null)
        Resources.AddProgram(webgl, "simple_inst", vssim_inst, fssim);


    var vsfeedback = Resources.CompileShader(webgl, ShaderType.VertexShader, "feedback", vs_feedback);
    var fsempty = Resources.CompileShader(webgl, ShaderType.FragmentShader, "empty", fs_empty);
    if (vsfeedback != null && fsempty != null)
        Resources.AddProgramFeedback(webgl, "feedback", vsfeedback, fsempty, ["outPos", "outNormal"]);


    var fstiledmap = Resources.CompileShader(webgl, ShaderType.FragmentShader, "tiledmap", fs_tiledmap);
    if (vsdef != null && fstiledmap != null)
        Resources.AddProgram(webgl, "tiledmap", vsdef, fstiledmap);



    if (vsinst_ubo != null && fsdef != null)
        Resources.AddProgram(webgl, "inst_ubo", vsinst_ubo, fsdef);
    if (vsinst_tbo != null && fsdef != null)
        Resources.AddProgram(webgl, "inst_tbo", vsinst_tbo, fsdef);
}
