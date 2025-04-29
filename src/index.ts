import { Server } from './server';

let server = new Server().app;
let port = process.env.PORT;

server.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
