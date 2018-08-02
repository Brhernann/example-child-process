//es un clase nodejs  y se comunica con otro proceso
process.on("message", msg => console.log(msg));