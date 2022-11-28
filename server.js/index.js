
// const http = require('http');
// // const express = require('express');
// // const app = express;
// const server = http.createServer(function (request, response){
//   //выводим в консоль путь, на который отправили запрос
//   const data = [
//     {
//       name: 'Ivan',
//       likes: 22,
//     },
//     {
//       name: 'Alex',
//       likes: 25,
//     }
//   ];
//   //как мы хотим ответить response.end
//
//   if(request.url === '/kekstagram-simple' && request.method === 'POST'){
//     response.end('Kekstagram Simple');
//     const body = request.read();
//     console.log(body);
//     response.end(body);
//   } else if( request.url === '/kekstagram-simple/data' ){
//     response.end(JSON.stringify(data));
//   }
// });
// server.listen(8000);

// let fs = require('fs');
// http.createServer(function(request, response) {
//   fs.readFile('pages/' + request.url, (error, fileContent) => {
//     let contentType = 'text/html';
//     if (request.url.endsWith('.css')) contentType = 'text/css';
//     if (request.url.endsWith('.js')) contentType = 'text/javascript';
//     if (request.url.endsWith('.png')) contentType = 'image/png';
//
//     response.setHeader('Content-Type' : contentType);
//
//     if (!error) { // страница существует
//       response.statusCode = 200;
//       response.write(fileContent);
//       response.end();
//     } else { // страница не найдена
//       fs.readFile('pages/404.html', (error404, fileContent404) => {
//         if(error404) throw error404;
//         response.statusCode = 404;
//         response.write(fileContent404);
//         response.end();
//       });
//     }
//   });
// }).listen(80);

const express = require('express');
const cors = require('cors');
const myServer = express;

myServer.use(cors());

myServer.post('/kekstagram-simple',(request, response) => {
  response.end('kekstagram-simple');
});

myServer.get('/kekstagram-simple/data',(request, response) => {
  const data = [
    {
      name: 'Ivan',
      likes: 22,
    },
    {
      name: 'Alex',
      likes: 25,
    }
  ];
  response.end(JSON.stringify(data));
});

myServer.listen(8000);
