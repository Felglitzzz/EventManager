'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from '../webpack.config.dev';

// Set up the express app
// eslint-disable-line
var app = (0, _express2.default)();
// const webpackConfig = webpack(config);

// app.use(webpackMiddleware(webpackConfig, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// Log requests to the console.
// eslint-disable-line
// eslint-disable-line
app.use((0, _morgan2.default)('dev'));

// use body parser to parse requests
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _expressValidator2.default)());

// Versioning and Routes
app.use('/api/v1/', _index2.default);

// send index.html
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist-client/index.html')));

app.use('/', _express2.default.static('dist-client'));
app.use('*', _express2.default.static('dist-client'));

// listen for requests
var port = parseInt(process.env.PORT, 10) || 1991;
app.listen(port, function () {
  console.log('Hi there, magic happens on http://localhost:' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map