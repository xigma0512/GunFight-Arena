const fs = require('fs');
const path = require('path');

const source = "./BP"
const destination = "";
const pack_name = "GunFight_Arena_BP"

function copyFolder(src, dest) {

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
        console.log(`Created ${dest} folder.`);
    }

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        
        if (fs.lstatSync(srcPath).isDirectory()) copyFolder(srcPath, destPath);
        else fs.copyFileSync(srcPath, destPath);
    });
}

const dirName = path.join(destination, pack_name);

console.log(`Copying ${source} to ${destination}...`);
copyFolder(source, dirName);
console.log('Done!');
