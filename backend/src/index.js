const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    const read = fs.createReadStream('../../frontend/index.html')
    read.pipe(res) // esto envia los datos al cliente
})

server.listen(3000)

console.log("Server on port 3000")