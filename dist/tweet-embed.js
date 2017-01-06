'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var callbacks = [];

function addScript(src, cb) {
  if (callbacks.length === 0) {
    callbacks.push(cb);
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = function () {
      return callbacks.forEach(function (cb) {
        return cb();
      });
    };
    document.body.appendChild(s);
  } else {
    callbacks.push(cb);
  }
}

var TweetEmbed = function (_React$Component) {
  _inherits(TweetEmbed, _React$Component);

  function TweetEmbed(props) {
    _classCallCheck(this, TweetEmbed);

    var _this = _possibleConstructorReturn(this, (TweetEmbed.__proto__ || Object.getPrototypeOf(TweetEmbed)).call(this, props));

    if (_this.props.preview) {
      _this.state = {
        showPreview: true
      };
    }
    return _this;
  }

  _createClass(TweetEmbed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = this.props.options || {};

      var renderTweet = function renderTweet() {
        window.twttr.widgets.createTweetEmbed(_this2.props.id, _this2._div, options);
      };
      if (!window.twttr) {
        addScript('//platform.twitter.com/widgets.js', renderTweet);

        if (this.state.hasOwnProperty('showPreview')) {
          callbacks.push(function () {
            return _this2.setState({ showPreview: false });
          });
        }
      } else {
        renderTweet();
        this.setState({ showPreview: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            _this3._div = c;
          } },
        this.state.showPreview && this.props.preview
      );
    }
  }]);

  return TweetEmbed;
}(_react2.default.Component);

TweetEmbed.propTypes = {
  id: _react.PropTypes.string.isRequired,
  options: _react.PropTypes.object,
  preview: _react.PropTypes.element
};

exports.default = TweetEmbed;