
import { ShaderType } from "../graphics/shader.js";
import { Resources } from "./resources.js";

//vscode 插件 webgl glsl editor 使用下面的/*glsl*/ 标记
//来为嵌入shader提供高亮显示

var vs_default: string = /*glsl*/`#version 300 es
    precision highp float;
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
var vs_inst_tbo: string = /*glsl*/`#version 300 es
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
        s.posRB = v0.zw;
        s.uvCenter = v1.xy;
        s.uvHalfSize = v1.zw;
        s.uvlayer = v2.x;
        s.eff = v2.w;
       
      
      
        //----begin calc final pos
        vec2 poslocal;
        poslocal.x=elemuv.x<0.0?s.posLT.x:s.posRB.x;
        poslocal.y=elemuv.y<0.0?s.posLT.y:s.posRB.y;
        poslocal*=scale;

        //poslocal is work


    
        float poslocallen = sqrt(dot(poslocal,poslocal));
        if(poslocallen<0.001)   
        {
            //too near to zeropoint no rotate
            //gl_Position =vec4(0,0,0,0);
        }
        else
        {
            //--begin rotate
            float cosv = cos(posrotate.w);
            float sinv = sin(posrotate.w);
            
            vec2 poslocalnor = poslocal / poslocallen;
            poslocal.x = cosv*poslocalnor.x + -sinv*poslocalnor.y;
            poslocal.y = sinv*poslocalnor.x + cosv*poslocalnor.y;
            poslocal *= poslocallen;
            //--end rorate
        }
        vec4 pos = vec4(posrotate.xyz,1);

        //apply tran
        pos.xy+=poslocal;
        //----end finalpos
        mat4 matrix = matProj*matView*matModel;
        gl_Position = matrix * pos;
       
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
var vs_inst_ubo: string = /*glsl*/`#version 300 es
    //form vbo1 as mesh
    layout(location = 0) in vec2 elemuv; 
    //from vbo2 as inst
    layout(location = 1) in vec4 posrotate;
    layout(location = 2) in vec2 scale;
    layout(location = 3) in vec4 color; //rgba32
    layout(location = 4) in vec2 ext;

    layout(std140, column_major) uniform;
    struct Sprite //
    {
        vec2 posLT;
        vec2 posRB;
        vec2 uvCenter;
        vec2 uvHalfSize;
        vec4 ext;
    };

    uniform SpritesBlock {//
        //
        Sprite data[1023];    
        int endtag; //
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
       
        float poslocallen = sqrt(dot(poslocal,poslocal));
        if(poslocallen<0.001)   
        {
            //too near to zeropoint no rotate
            //gl_Position =vec4(0,0,0,0);
        }
        else
        {
            float cosv = cos(posrotate.w);
            float sinv = sin(posrotate.w);
            
            vec2 poslocalnor = poslocal / poslocallen;
            poslocal.x = cosv*poslocalnor.x + -sinv*poslocalnor.y;
            poslocal.y = sinv*poslocalnor.x + cosv*poslocalnor.y;
            poslocal *= poslocallen;
        }
        //--end rorate

        vec4 pos = vec4(posrotate.xyz,1);

        //apply tran
        pos.xy+=poslocal;
        //----end finalpos
        mat4 matrix = matProj*matView*matModel;
        gl_Position = matrix * pos;
        
        //pass uv
        vec2 uv =  s.uvCenter + elemuv*s.uvHalfSize;
       
        vUv = uv;
        //pass color
        vColor = color;
        //pass ext
        vExt=int(s.ext.w);
        vLayer=int(s.ext.x);
    }
`;
var fs_default: string = /*glsl*/`#version 300 es
    precision highp float;//指定浮点型精确度
    precision highp sampler2DArray;
    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    flat in int vExt;
    flat in int vLayer;
        
    layout(location = 0) out vec4 fragColor;

    
    uniform sampler2DArray texRGBA;  //从外部设置的参数
    uniform sampler2DArray texGray;
    void main(void) 
    {
        vec4 texc = vExt==0? texture(texRGBA,vec3(vUv,vLayer))
        : texture(texGray,vec3(vUv,vLayer));
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
            outc.a *=texc.r; 
            //outc = vColor * 0.5;
        }
        fragColor =  outc;
        
    }
    `;

var vs_simple: string = /*glsl*/`#version 300 es
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


var fs_simple: string = /*glsl*/`#version 300 es
    precision highp float;//指定浮点型精确度
    precision highp sampler2DArray;

    in vec2 vUv;//从vs接收的参数
    in vec4 vColor;//从vs接收的参数
    //flat in vec4 vExt;

        
    layout(location = 0) out vec4 fragColor;

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
var fs_tiledmap: string = /*glsl*/`#version 300 es
    precision mediump float;//指定浮点型精确度
    precision highp sampler2DArray;

    in vec2 vUv;//从vs接收的参数
 
    uniform sampler2D texIndex; 
    uniform sampler2D texTile; 
    uniform float   tilesize;
    uniform vec4     mapinfo;//xy map size, zw=tile texturesize
    layout(location = 0) out vec4 fragColor;

    void main(void) 
    {
        //抽取TiledIndex
        vec4 texc = texture(texIndex,vUv);
        float su =float(int(texc.r*255.0+0.9)); //tileindex x
        float sv =float(int(texc.g*255.0+0.9)); //tileindex y

        float su2 =float(int(texc.b*255.0+0.9)); //tileindex z
        float sv2 =float(int(texc.a*255.0+0.9)); //tileindex w

        //计算tileduv
        float subu = mod(vUv.x * mapinfo.x, 1.0);
        float subv = mod(vUv.y * mapinfo.y, 1.0);
        vec2 tilescale =vec2(tilesize,tilesize)/mapinfo.zw;
        //float tilescaleY =tiledsize/mapinfo.w;
        vec2 tuv = vec2((su+subu)*tilescale.x,(sv+subv)*tilescale.y);
        vec2 tuv2 = vec2((su2+subu)*tilescale.x,(sv2+subv)*tilescale.y);

        //合成颜色
        vec4 ttc = texture(texTile,tuv);
        vec4 ttc2 = texture(texTile,tuv2);
 

        vec4 outcolor = ttc2.a*ttc2 + (1.0-ttc2.a)*ttc;
        
        fragColor = outcolor;
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



    var vsfeedback = Resources.CompileShader(webgl, ShaderType.VertexShader, "feedback", vs_feedback);
    var fsempty = Resources.CompileShader(webgl, ShaderType.FragmentShader, "empty", fs_empty);
    if (vsfeedback != null && fsempty != null)
        Resources.AddProgramFeedback(webgl, "feedback", vsfeedback, fsempty, ["outPos", "outNormal"]);


    var fstiledmap = Resources.CompileShader(webgl, ShaderType.FragmentShader, "tiledmap", fs_tiledmap);
    if (vsdef != null && fstiledmap != null)
        Resources.AddProgram(webgl, "tiledmap", vssim, fstiledmap);



    if (vsinst_ubo != null && fsdef != null)
        Resources.AddProgram(webgl, "inst_ubo", vsinst_ubo, fsdef);
    if (vsinst_tbo != null && fsdef != null)
        Resources.AddProgram(webgl, "inst_tbo", vsinst_tbo, fsdef);
}
