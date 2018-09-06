'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = opts.type,
      file = opts.file;

  (0, _assert2.default)(type, 'opts.type should be supplied');
  (0, _assert2.default)(typeof type === 'string', 'opts.file should be string');
  (0, _assert2.default)(file, 'opts.file should be supplied');
  (0, _assert2.default)(typeof file === 'string', 'opts.file should be string');
  (0, _assert2.default)(generators[type], 'generator of type (' + type + ') not found');

  delete opts.type;
  generators[type](opts);
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _rnpage = require('./generators/rnpage');

var _rnpage2 = _interopRequireDefault(_rnpage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generators = {
  rnpage: _rnpage2.default
};

module.exports = exports['default'];