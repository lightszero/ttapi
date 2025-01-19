#!/usr/bin/env node
import * as child_process from "child_process";
import * as fs from "fs";
import * as glob from "glob";
import * as crypto from "crypto";
console.log("packtool.");
//print argv
for (let i = 2; i < process.argv.length; i++) {
    console.log("arg[" + i + "]=" + process.argv[i]);
}

//run webpack
console.log("webpack begin.");
child_process.exec("npx webpack");
console.log("webpack done.");

//coll files
console.log("collect files by packfile.json");
let json = JSON.parse(fs.readFileSync("./packfile.json", { encoding: "utf-8" })) as string[];
class HashInfo {
    file: string;
    hash: string;
    size: number;
}
let resources: HashInfo[] = [];
let totalsize: number = 0;
for (let i = 0; i < json.length; i++) {
    //console.log("search file=" + json[i]);
    let files = glob.sync(json[i]);

    for (let j = 0; j < files.length; j++) {
        let r = new HashInfo();
        r.file = files[j];
        console.log("--parse:" + r.file);
        r.hash = crypto.hash("SHA256", fs.readFileSync(r.file), "hex");
        r.size = fs.statSync(r.file).size;
        totalsize += r.size;
        resources.push(r);
    }
}
console.log("parse file:" + resources.length + " totalsize=" + totalsize);
console.log("write info to packindex.json");
if (fs.existsSync("./packindex.json")) {
    fs.rmSync("./packindex.json");
}
fs.writeFileSync("./packindex.json", JSON.stringify(resources, null, 4));
console.log("done.");