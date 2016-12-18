const PORT = 8888
const VIEWS_DIR = './views'
const connect = require('connect')
const serveStatic = require('serve-static')

connect().use(serveStatic(VIEWS_DIR)).listen(PORT, function(){
    console.log('Server running on ' + PORT + '...');
});