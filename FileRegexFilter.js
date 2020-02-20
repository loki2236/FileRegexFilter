// @ts-check

const config = require('./config/config.js');
const fs = require('fs');
const RegEx = new RegExp(config.regex, 'gi');

console.log("Abriendo directorio: "+config.directory);
fs.readdir(config.directory, (err, files) => {
    // Filter Files
    files = files.filter(str => str.search(config.fileFilter) != -1);
    files.forEach(file => {
        console.log(file);
        // Read File and load contents
        try{
            
        let data = fs.readFileSync(file, 'utf8');
            //File is Loaded Exec the RegExp
            if (data){
                //Open a Stream to the output File
                let outputStream = fs.createWriteStream('FilteredOutput.a', {flags: 'a'}).on('error', function(err){
                    console.log(err);
                });
                
                
                let match = RegEx.exec(data);
                while (match != null){
                    //Write the Match to a file
                    outputStream.write(`${match[0]}\n`);
                    match = RegEx.exec(data);
                }                
                outputStream.close();
            }
        }catch(err){
            console.error(err);
        }
        
    });
});