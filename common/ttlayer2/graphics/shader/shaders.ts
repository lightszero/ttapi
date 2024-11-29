

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
  source: string;
  shader: WebGLShader;
  uniformInfo: { [id: string]: UniformType };
  constructor(type: ShaderType, name: string, source: string, shader: WebGLShader, uniformInfo: { [id: string]: UniformType }) {
    this.type = type;
    this.name = name;
    this.source = source;
    this.shader = shader;
    this.uniformInfo = uniformInfo;
  }
}

var vsp: { [id: string]: ShaderObj } = {};
var fsp: { [id: string]: ShaderObj } = {};

export function AddShader(webgl: WebGL2RenderingContext, type: ShaderType, name: string, source: string, keepsource: boolean): ShaderObj | null {
  if (type == ShaderType.VertexShader) {
    if (vsp[name] != undefined)
      return null;
  }
  else {
    if (fsp[name] != undefined)
      return null;
  }
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
  var uinfo: { [id: string]: UniformType } = {};

  findUniform(source, uinfo);

  var shaderobj = new ShaderObj(type, name, keepsource ? source : "", _shader, uinfo);
  if (type == ShaderType.VertexShader) {
    vsp[name] = shaderobj;
  }
  else {
    fsp[name] = shaderobj;
  }
  return shaderobj;


}
function findUniform(source: string, target: { [id: string]: UniformType }): void {
  var lines = source.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].replace(new RegExp('\r', "g"), "");
    line = line.replace(new RegExp('\n', "g"), "");
    line = line.replace(new RegExp('\t', "g"), " ");
    line = line.replace(new RegExp(';', "g"), " ");
    
    //拆注释
    line = line.replace(new RegExp('//.+\n?', "g"), " ");
    line = line.replace(new RegExp('\*.*\*', "g"), " ");
    var words = line.split(" ");
    var type = UniformType.empty;
    var name = "";
    var state = 0;//0 寻找uniform //1寻找type //2 寻找name //3 寻找end 或者block 标志
    for (var j = 0; j < words.length; j++) {
      var word = words[j];
      var code = word.charCodeAt(0);
      if (word == "") continue;
      if (word == " ") continue;
      else if (state == 0) {
        if (word == "uniform") {
          state++;
        }
        else {
          break;
        }
      }
      else if (state == 1) {
        switch (word) {
          case "mat4":
            type = UniformType.mat4;
            break;
          case "sampler2D":
            type = UniformType.sampler2D;
            break;
          case "float":
            type = UniformType.float;
            break;
          case "vec4":
            type = UniformType.vec4;
            break;
          case "ivec4":
            type = UniformType.ivec4;
            break;

          default:
            type = UniformType.unknown;
        }

        state++;
      }
      else if (state == 2) {
        name = word;
        state++;
        //break;
      }
      else if (state == 3) {
        if (word == ";")//end tag
          break;
        else if (word == "{")//block
        {
          type = UniformType.block;
          break;
        }
        else
        {
          break;//未知结构
        }
      }
    }
    if (type != UniformType.empty) {
      target[name] = type;
    }
  }
}

export function LinkShader(webgl: WebGL2RenderingContext, name: string, vs: ShaderObj, fs: ShaderObj): ShaderProgram | null {
  var prog = webgl.createProgram();
  if (prog != null) {
    webgl.attachShader(prog, vs.shader);
    webgl.attachShader(prog, fs.shader);
    webgl.linkProgram(prog);
    var r3 = webgl.getProgramParameter(prog, webgl.LINK_STATUS);
    if (r3 == false) {
      console.error("LinkShader error webgl.linkProgram:" + webgl.getProgramInfoLog(prog));
      return null;
    }
    var _prog = new ShaderProgram(webgl, name, prog, vs, fs);
    programs[name] = _prog;
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
    programs[name] = _prog;
    console.log("LinkShader:" + name);
    return _prog;
  }
  else {
    console.error("LinkShader error webgl.createProgram");
  }
  return null;
}

var programs: { [id: string]: ShaderProgram } = {};
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



    this.uniformInfos = {};

    for (var key in vs.uniformInfo) {
      let type = vs.uniformInfo[key];
      this.AddUniform(webgl, key, type);

    }
    for (var key in fs.uniformInfo) {
      let type = fs.uniformInfo[key];
      this.AddUniform(webgl, key, type);
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

export function GetShaderProgram(name: string): ShaderProgram | undefined {
  //if (programs[name] == undefined) return null;
  return programs[name];
}
