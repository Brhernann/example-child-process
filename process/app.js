var spawn = require("child_process").spawn;
var payload = {"function": "search-users", "data": {"query": "pancha_lara"}};
var exc = {
    path: './../../python-scripts/.env/bin/python',
    scriptMain:'./../../python-scripts/main/main.py',
}

// export default function sendRequest(endpoint, method, body) {

// };

let result = ''
const py = spawn(exc.path, [exc.scriptMain], {detached: true});

py.stdout.on('data', function(buff){
    const data = buff.toString().split('\n')
    if(data.length > 0)
      data.splice(data.length - 1, 1)
      
      data.forEach(value => {
      try{
        value = JSON.parse(value)
        if(value.log)  console.log(value.log);
        if(value.result == true) return resolve({statusCode: '200', message: 'SUCCESS', data: value.result});
        if(value.result) result = value.result
      } catch(ex){
        console.log('FROM CATCH: ',ex);
      }
    })
});

py.stdout.on('end', function(){
   console.log('FROM END: ',result)
});

py.stdin.write(JSON.stringify(payload));
py.stdin.end();



  


