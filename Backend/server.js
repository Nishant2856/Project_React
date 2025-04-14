import http from 'http'
const port = 3000

const server = http.createServer()

server.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
})