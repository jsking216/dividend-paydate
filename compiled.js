"use strict";

var _getPaydates = require("./lib/getPaydates");

var _getTrades = require("./lib/getTrades");

var _fs = require("fs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var datafile = 'persistentPaydates.json';

function readPaydates() {
  var paydates = [];
  var existing = JSON.parse((0, _fs.readFileSync)(datafile, 'utf8'));
  existing.map(function (elem) {
    paydates.push(elem);
  });
  return paydates;
}

function writePaydates(paydates) {
  var asJson = JSON.stringify(paydates);
  (0, _fs.writeFileSync)(datafile, asJson, 'utf8');
}

function processPaydates() {
  return _processPaydates.apply(this, arguments);
} // TESTING


function _processPaydates() {
  _processPaydates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var allPaydates, newPaydates, filteredPaydates;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            allPaydates = readPaydates();
            _context2.next = 3;
            return (0, _getPaydates.getPaydates)();

          case 3:
            newPaydates = _context2.sent;
            // get rid of old ticker data
            filteredPaydates = allPaydates.filter(function (elem) {
              var shouldFilter = newPaydates.some(function (paydate) {
                return paydate.ticker === elem.ticker;
              });
              return !shouldFilter;
            });
            filteredPaydates.push.apply(filteredPaydates, _toConsumableArray(newPaydates));
            console.log("Writing ".concat(filteredPaydates.length, " paydate records to file"));
            writePaydates(filteredPaydates);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _processPaydates.apply(this, arguments);
}

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return processPaydates();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
