const fs = require("fs");

let data = "Hiiii bro brooo";

fs.writeFile('myfile.txt', data, {
    encoding: "utf-8",
    flag: 'w'   // 'w' means write (overwrite if file exists)
}, (err) => {
    if (err) throw err;
    console.log("File created");
});

//read file
fs.readFile("myfile.txt",{
    encoding: "binary",
    flag: 'r'   
}, (err, data) => {
    if (err) throw err;
    console.log(data);
});

// update 
fs.appendFile("myfile.txt"," not bro like this", (err) => {
    if (err) throw err;
    console.log("data append");
});


// delete

fs.unlink("myfile.txt", (err)=>{
    if( err){ throw err}
    console.log("file deleted")
})