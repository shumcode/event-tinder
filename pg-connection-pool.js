//This file, in general, is what is used to allow our server to connect to other servers.  In this case, it is allowing us to connect to the Heroku server, which contains the database we are going to be working with//

const pg = require('pg');
const url =require('url');
try{
  require('dotenv').config();
}catch (e){

}

console.info("DATABASE_URL:", process.env.DATABASE_URL);
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');


//const congif = ...This is how to configure the connection to the Heroku server//
//the .env file is the credentials (i.e. username and password) we need to connect to the Heroku server.  This is referenced with the information below//

const config = {
  user: auth[0],
  password:auth[1],
  host:params.hostname,
  port:params.port,
  database: params.pathname.split('/')[1],
  ssl:params.hostname !== 'localhost'
};

module.exports = new pg.Pool(config);
