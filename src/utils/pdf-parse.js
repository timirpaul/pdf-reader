const fs =require("fs")
const pdf =require("pdf-parse")

const pdfText =(pdfPath)=>{
    let dataBuffer = fs.readFileSync(pdfPath);
 
    const data = pdf(dataBuffer)
    return data ; 
    
}
module.exports = pdfText