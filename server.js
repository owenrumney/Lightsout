var express = require('express'),
stylus =  require('stylus'),
nib = require('nib');

var port = process.env.port || 1337;
var app = express();

function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(stylus.middleware(
{
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index',
        {
            size: 5,
            difficulty: 1
        });
});

app.get('/about', function(req, res) {
    res.render('about',
        {
            title: 'About Oi!'
        });
});

app.post('/', function (req, res) {
    res.render('index',
        {
            size: req.body.cellSize,
            difficulty: req.body.difficulty
        });
});

app.get('/:id', function(req, res) {
	res.send(req.params.id);

});

app.get('/:format/:id', function(req, res) {
	res.send(req.params.format);

});

console.log('Starting on port ' + port);
app.listen(port);
