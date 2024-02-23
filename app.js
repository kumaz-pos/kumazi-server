

const cluster= require("cluster");
const cCPUS= require("os").cpus().length;

const server= require("./server")

const start= require("./server")
console.log(cCPUS);
if (cluster.isMaster) {
    for (let i = 0; i < cCPUS; i++) {
        cluster.fork();
    }
   
    cluster.on("exit",function (worker,code,signal) {
        console.log("worker "+ worker.process.pid+"died.");
    })
}else{

start()
}







