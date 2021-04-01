const fs = require('fs-extra');
const https = require('https')
const request = require('request')
const unzipper = require('unzipper')
const options = {
    url: 'https://api.github.com/repos/nooneyy/big-floppa/releases/latest',
    headers: {
      'User-Agent': 'request'
    }
  };

var windows = false
var minecraft = false
var forge = false
var floppainstalled = false
var latestfloppa = false
var latest = undefined
var sentFromForge = false

try {
    version = fs.readFileSync(process.env.APPDATA + "/.minecraft/mods/version.txt")
} catch (err) {
    version = undefined
}

function isSuccess(){
    document.getElementById("modbutton").setAttribute('class', "button is-success is-rounded")
    document.getElementById("modbutton").setAttribute('disabled', "")
    document.getElementById("modbutton").innerHTML = "Done"
}

function callback(error, response, body) {
    if (error) {console.log(error)}
    console.log("they call me young dagger dick")
    const responsebody = JSON.parse(body)
    latest = responsebody.tag_name
    document.getElementById("version").innerHTML = "big-floppa (v" + latest + ".0)"
    if(latest == version){
        floppainstalled = true
        latestfloppa = true
        console.log("Up to date!")
        if(forge == true){
            document.getElementById("modbutton").setAttribute('class', "button is-rounded is-success")
            document.getElementById("modbutton").setAttribute('disabled', "")
            document.getElementById("modbutton").innerHTML = "Up to date"
        }
    }
    else if(latest != version && version != undefined){
        document.getElementById("modbutton").setAttribute('class', "button is-rounded is-warning")
        document.getElementById("modbutton").innerHTML = "Update"
        floppainstalled = true
        latestfloppa = false
        console.log("Outdated!")
    }
    else{
        return
    }
}

function moveModpack(){
    if(fs.existsSync(process.env.APPDATA + "/.minecraft/mods/")) {  
        console.log("Deleting mods folder")
        fs.rmdirSync(process.env.APPDATA + "/.minecraft/mods/", {recursive: true})
      }
        fs.move(process.env.TEMP + "/big-floppa-main", process.env.APPDATA + "/.minecraft/mods/")
        document.getElementById("progress").setAttribute('value', "100")
        document.getElementById("progress").setAttribute('class', "progress is-success")
        console.log("Moved!")
        isSuccess()
}

function installModpack(){
    console.log("Unzipping...")
    fs.createReadStream(process.env.TEMP + "/big-floppa.zip")
    .pipe(unzipper.Extract({ path: process.env.TEMP }))
        .on('finish', () =>{
            document.getElementById("progress").setAttribute('value', "85")
            console.log("Done")
            moveModpack()
    })
}

function downloadModpack(){
    const modpackZip = fs.createWriteStream(process.env.TEMP + "/big-floppa.zip")
    console.log("Downloading...")
    const modpackRequest = https.get('https://codeload.github.com/nooneyy/big-floppa/zip/main', function (response){
        response.pipe(modpackZip)
            .on('finish', () =>{
                console.log("Modpack downloaded!")
                document.getElementById("progress").setAttribute('value', "70")
                installModpack()
            })
    })
}

function downloadForge(_callback2){
    var exec = require('child_process').exec, child;
    child = exec('java -jar ' + process.env.TEMP + "\\forge-modinstaller.jar",
    function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
            console.log('exec error: ' + error);
        }
    });
    _callback2()
    if(sentFromForge=true){document.getElementById("progress").setAttribute('value', "100")
    document.getElementById("progress").setAttribute('class', "progress is-success")
    isSuccess()}
    else{document.getElementById("progress").setAttribute('value', "50")}
}

function installForge(){
    const forgeFile = fs.createWriteStream(process.env.TEMP + "/forge-modinstaller.jar")
    const forgeRequest = https.get('https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.16.5-36.1.3/forge-1.16.5-36.1.3-installer.jar', function(response){
        response.pipe(forgeFile)
            .on('finish', () =>{
                document.getElementById("progress").setAttribute('value', "25")
                downloadForge(()=>{
                    console.log("Called back! (Java/Forge)")
            })
        })
    })
}

function installCheck(){
    if(windows == true && minecraft == true && forge == true && floppainstalled == true && latestfloppa == false){
        document.getElementById("modbutton").onclick = function(){
            document.getElementById("modbutton").setAttribute('class', "button is-dark is-rounded is-loading")
            document.getElementById("progress").setAttribute('value', "50")
            console.log("Updating placeholder (only installing mods)")
            downloadModpack()
        }
    }
    else if(windows == true && minecraft == true && forge == false && floppainstalled == false){
        document.getElementById("modbutton").onclick = function(){
            document.getElementById("modbutton").setAttribute('class', "button is-dark is-rounded is-loading")
            console.log("Fresh install placeholder (installing forge and mods)")
            installForge()
            downloadModpack()
        }
    }
    else if(windows == true && minecraft == true && forge == true && floppainstalled == false){
        document.getElementById("modbutton").onclick = function(){
            document.getElementById("modbutton").setAttribute('class', "button is-dark is-rounded is-loading")
            document.getElementById("progress").setAttribute('value', "50")
            console.log("Fresh install placeholder (only installing mods)")
            downloadModpack()
        }
    }
    else if(windows == true && minecraft == true && forge == false && floppainstalled == true && latestfloppa == true){
        document.getElementById("modbutton").setAttribute('class', "button is-rounded is-warning")
        document.getElementById("modbutton").innerHTML = "Update Forge"
        document.getElementById("modbutton").onclick = function(){
            sentFromForge = true
            document.getElementById("modbutton").setAttribute('class', "button is-dark is-rounded is-loading")
            console.log("Update placeholder (installing forge)")
            installForge()
        }
    }
    else if(windows == false || minecraft == false){
        document.getElementById("modbutton").setAttribute('class', "button is-rounded is-danger")
        document.getElementById("modbutton").setAttribute('disabled', "")
        document.getElementById("modbutton").innerHTML = "Can't install"
        console.log("Can't install")
    }
}

function systemCheck(){
    if(process.platform == "win32"){
        console.log("System: Windows")
        document.getElementById("system").setAttribute('class', "button is-success")
        document.getElementById("systemstatus").setAttribute('class', "fas fa-check")
        windows = true
    }
    else{
        console.log("System: other")
        document.getElementById("system").setAttribute('class', "button is-danger")
        document.getElementById("systemstatus").setAttribute('class', "fas fa-times")
    }
}

function minecraftCheck(){
    if(fs.existsSync(process.env.APPDATA + "/.minecraft") && fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.16.5/1.16.5.jar")){
        console.log("Minecraft: exists + 1.16")
        document.getElementById("minecraft").setAttribute('class', "button is-success")
        document.getElementById("minecraftstatus").setAttribute('class', "fas fa-check")
        minecraft = true
    }
    else if(fs.existsSync(process.env.APPDATA + "/.minecraft") && !fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.16.5/1.16.5.jar")){
        console.log("Minecraft: exists - 1.16")
        document.getElementById("minecraft").setAttribute('class', "button is-warning")
        document.getElementById("minecraftstatus").setAttribute('class', "fas fa-exclamation-triangle")
    }
    else{
        console.log("Minecraft: doesn't exist")
        document.getElementById("minecraft").setAttribute('class', "button is-danger")
        document.getElementById("minecraftstatus").setAttribute('class', "fas fa-times")
    }
}

function forgeCheck(){
    if(fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.16.5-forge-36.1.3/1.16.5-forge-36.1.3.json")){
        console.log("Forge: exists")
        document.getElementById("forge").setAttribute('class', "button is-success")
        document.getElementById("forgestatus").setAttribute('class', "fas fa-check")
        forge = true
    }
    else{
        console.log("Forge: doesn't exist")
        document.getElementById("forge").setAttribute('class', "button is-warning")
        document.getElementById("forgestatus").setAttribute('class', "fas fa-exclamation-triangle")
    }
}

function doRequest(_callback){
    installCheck()
    _callback()
}

function doRequest2(){
    request(options, callback)
    doRequest(()=>{
        console.log("I am a callback")
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    systemCheck()
    minecraftCheck()
    forgeCheck()
    doRequest2()
    setTimeout(function() {installCheck()}, 500)
    document.getElementById("system").onclick = function() {
        document.getElementById("system").setAttribute('class', "button is-dark is-loading")
        setTimeout(function() {systemCheck()}, 500)
        installCheck()
    }
    document.getElementById("minecraft").onclick = function() {
        document.getElementById("minecraft").setAttribute('class', "button is-dark is-loading")
        setTimeout(function() {minecraftCheck()}, 500)
        installCheck()
    }
    document.getElementById("forge").onclick = function() {
        document.getElementById("forge").setAttribute('class', "button is-dark is-loading")
        setTimeout(function() {forgeCheck()}, 500)
        installCheck()
    }
})