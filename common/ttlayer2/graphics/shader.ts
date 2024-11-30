

export enum ShaderType {
  VertexShader,
  FragmentShader
}
export enum UniformType {
  empty,
  unknown,
  mat4,
  sampler2D,
  block,
  float,
  vec4,
  ivec4
}
export class ShaderObj {
  name: string
  type: ShaderType;

  shader: WebGLShader;

  constructor(type: ShaderType, name: string, shader: WebGLShader) {
    this.type = type;
    this.name = name;

    this.shader = shader;

  }
}
export function CompileShader(webgl: WebGL2RenderingContext, type: ShaderType, name: string, source: string): ShaderObj | null {

  var _shader = webgl.createShader(type == ShaderType.VertexShader ? webgl.VERTEX_SHADER : webgl.FRAGMENT_SHADER);
  if (_shader == null) {
    console.error("AddShader error webgl.createShader:" + type + ":" + name);
    return null;
  }

  webgl.shaderSource(_shader, source);
  webgl.compileShader(_shader);

  var r1 = webgl.getShaderParameter(_shader, webgl.COMPILE_STATUS);
  if (r1 == false) {
    console.error("AddShader error webgl.compileShader:" + webgl.getShaderInfoLog(_shader) + ':' + type + ":" + name);
    return null;
  }
  else {
    console.log("AddShader:" + ShaderType[type].toString() + ":" + name);
  }


  var shaderobj = new ShaderObj(type, name, _shader);

  return shaderobj;


}


export function LinkShader(webgl: WebGL2RenderingContext, name: string, vs: ShaderObj, fs: ShaderObj): ShaderProgram | null {
  var prog = webgl.createProgram();
  if (prog != null) {
    webgl.attachShader(prog, vs.shader);
    webgl.attachShader(prog, fs.shader);
    webgl.linkProgram(prog);

    var r3 = webgl.getProgramParameter(prog, webgl.LINK_STATUS);
    if (r3 == false) {
      console.error("LinkShader error webgl.linkProgram:" + name + " E:" + webgl.getProgramInfoLog(prog));
      return null;
    }
    var _prog = new ShaderProgram(webgl, name, prog, vs, fs);
    console.log("LinkShader:" + name);
    return _prog;
  }
  else {
    console.error("LinkShader error webgl.createProgram");
  }
  return null;
}
export function LinkShaderFeedBack(webgl: WebGL2RenderingContext, name: string, vs: ShaderObj, fs: ShaderObj, feedbackvaring: string[]): ShaderProgram | null {
  var prog = webgl.createProgram();
  if (prog != null) {
    webgl.attachShader(prog, vs.shader);
    webgl.attachShader(prog, fs.shader);

    webgl.transformFeedbackVaryings(prog, feedbackvaring, webgl.INTERLEAVED_ATTRIBS);//交错

    webgl.linkProgram(prog);
    var r3 = webgl.getProgramParameter(prog, webgl.LINK_STATUS);
    if (r3 == false) {
      console.error("LinkShader error webgl.linkProgram:" + webgl.getProgramInfoLog(prog));
      return null;
    }
    var _prog = new ShaderProgram(webgl, name, prog, vs, fs);

    console.log("LinkShader:" + name);
    return _prog;
  }
  else {
    console.error("LinkShader error webgl.createProgram");
  }
  return null;
}


export class uniformInfo {
  type: UniformType;
  loc: WebGLUniformLocation;
  locblock: number;
}
export class ShaderProgram {
  name: string;
  program: WebGLProgram;

  //其余自定义uniform
  uniformInfos: { [id: string]: uniformInfo };

  constructor(webgl: WebGL2RenderingContext, name: string, program: WebGLProgram, vs: ShaderObj, fs: ShaderObj) {
    this.name = name;
    this.program = program;


    //Attr 固定,不查
    var attrs = webgl.getProgramParameter(program, webgl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < attrs; i++) {
      var attr = webgl.getActiveAttrib(program, i);
      var loc = webgl.getAttribLocation(program, attr.name);

    }


    this.uniformInfos = {};
    // readonly INT: 0x1404;
    // readonly UNSIGNED_INT: 0x1405;
    // readonly FLOAT: 0x1406;
    // readonly FLOAT_VEC2: 0x8B50;
    // readonly FLOAT_VEC3: 0x8B51;
    // readonly FLOAT_VEC4: 0x8B52;
    // readonly INT_VEC2: 0x8B53;
    // readonly INT_VEC3: 0x8B54;
    // readonly INT_VEC4: 0x8B55;
    // readonly BOOL: 0x8B56;
    // readonly BOOL_VEC2: 0x8B57;
    // readonly BOOL_VEC3: 0x8B58;
    // readonly BOOL_VEC4: 0x8B59;
    // readonly FLOAT_MAT2: 0x8B5A;
    // readonly FLOAT_MAT3: 0x8B5B;
    // readonly FLOAT_MAT4: 0x8B5C;
    // readonly SAMPLER_2D: 0x8B5E;
    var useuni = webgl.getProgramParameter(program, webgl.ACTIVE_UNIFORMS);
    for (let i = 0; i < useuni; i++) {
      var info = webgl.getActiveUniform(program, i);
      let loc = webgl.getUniformLocation(this.program, info.name);
      if (loc == null)
        continue;
      let type: UniformType = UniformType.empty;
      switch (info.type) {
        case 0x8B52:
          type = UniformType.vec4
          break;
        case 0x8B52:
          type = UniformType.ivec4;
          break;
        case 0x8B5C:
          type = UniformType.mat4;
          break;
        case 0x8B5E:
          type = UniformType.sampler2D;
          break;
        default:
          throw "not supported." + info.type.toString(16);
      }
      this.uniformInfos[info.name] = { loc: loc, locblock: -1, type: type }
    }

    var useblock = webgl.getProgramParameter(program, webgl.ACTIVE_UNIFORM_BLOCKS);
    for (let i = 0; i < useblock; i++) {
      var key = webgl.getActiveUniformBlockName(program, i);
      let locindex = webgl.getUniformBlockIndex(this.program, key);
      if (locindex == null || locindex < 0) continue;
      this.uniformInfos[key] = { loc: null, locblock: locindex, type: UniformType.block }

    }



  }
  private AddUniform(webgl: WebGL2RenderingContext, key: string, type: UniformType) {
    if (type == UniformType.block) {
      let locindex = webgl.getUniformBlockIndex(this.program, key);
      if (locindex == null || locindex < 0) return;
      this.uniformInfos[key] = { loc: null, locblock: locindex, type: type }
    }
    else {
      let loc = webgl.getUniformLocation(this.program, key);
      if (loc == null) return;
      this.uniformInfos[key] = { loc: loc, locblock: -1, type: type }
    }
  }
}

