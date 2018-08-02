const http = require('http');
var cron = require('cron');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

//CRON START
// */5 * * * * * / cada 5 segundos
// 00 39 13 * * 1-5 / 13:39 de lunes a viernes todo los meses y todo el año
var job = new cron.CronJob('*/5 * * * * *', () => {
  console.log('Ok, Here a action!');
}, null, true, 'America/Santiago');

job.start()
console.log('job status: ', job.running && ('ON'));

//CRON FINISH

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});