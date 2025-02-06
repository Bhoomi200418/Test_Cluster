import { Server } from './server';

let server = new Server().app;
let port = 3000;

server.listen(port, () => {
    console.log(`server is running at port ${port}`);
});

// console.log(getEnvironmentVariable().db_uri)
// mongoose.connect(getEnvironmentVariable().db_uri)
// .then(() => {
//     console.log('connected to mongodb. ');
// });

// // app.use((req, res, next) =>{
// //     console.log('middleware1');
// //     next();
// // })
// app.get('/api/user/login', (req, res) => {
//     // console.log(req.query.email);
//     const data = [{name: 'bhoomipatel19'}];
//     res.status(200).send('data');

// });

// app.get('/api/user/test', (req, res, next) => {
//     console.log('test');
//     res.send('test');
// }); 
