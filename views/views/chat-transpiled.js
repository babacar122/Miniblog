"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* detect url in a message and add a link tag */
function detectURL(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
  });
}

/* ========== */
/* Title component */
var Title = /*#__PURE__*/function (_React$Component) {
  function Title(props, context) {
    _classCallCheck(this, Title);
    return _callSuper(this, Title, [props, context]);
  }
  _inherits(Title, _React$Component);
  return _createClass(Title, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convTitle"
      }, this.props.owner, "'s display");
    }
  }]);
}(_react["default"].Component);
/* end Title component */
/* ========== */
/* ========== */
/* InputMessage component - used to type the message */
var InputMessage = /*#__PURE__*/function (_React$Component2) {
  function InputMessage(props, context) {
    var _this;
    _classCallCheck(this, InputMessage);
    _this = _callSuper(this, InputMessage, [props, context]);
    _this.handleSendMessage = _this.handleSendMessage.bind(_this);
    _this.handleTyping = _this.handleTyping.bind(_this);
    return _this;
  }
  _inherits(InputMessage, _React$Component2);
  return _createClass(InputMessage, [{
    key: "handleSendMessage",
    value: function handleSendMessage(event) {
      event.preventDefault();
      /* Disable sendMessage if the message is empty */
      if (this.messageInput.value.length > 0) {
        this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
        /* Reset input after send*/
        this.messageInput.value = '';
      }
    }
  }, {
    key: "handleTyping",
    value: function handleTyping(event) {
      /* Tell users when another user has at least started to write */
      if (this.messageInput.value.length > 0) {
        this.props.typing(this.ownerInput.value);
      } else {
        /* When there is no more character, the user no longer writes */
        this.props.resetTyping(this.ownerInput.value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      /* If the chatbox state is loading, loading class for display */
      var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
      var sendButtonIcon = /*#__PURE__*/_react["default"].createElement("i", {
        className: "material-icons"
      }, "send");
      return /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this.handleSendMessage
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "hidden",
        ref: function ref(owner) {
          return _this2.ownerInput = owner;
        },
        value: this.props.owner
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "hidden",
        ref: function ref(ownerAvatar) {
          return _this2.ownerAvatarInput = ownerAvatar;
        },
        value: this.props.ownerAvatar
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        ref: function ref(message) {
          return _this2.messageInput = message;
        },
        className: "chatApp__convInput",
        placeholder: "Text message",
        onKeyDown: this.handleTyping,
        onKeyUp: this.handleTyping,
        tabIndex: "0"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: 'chatApp__convButton ' + loadingClass,
        onClick: this.handleSendMessage
      }, sendButtonIcon));
    }
  }]);
}(_react["default"].Component);
/* end InputMessage component */
/* ========== */
/* ========== */
/* TypingIndicator component */
var TypingIndicator = /*#__PURE__*/function (_React$Component3) {
  function TypingIndicator(props, context) {
    _classCallCheck(this, TypingIndicator);
    return _callSuper(this, TypingIndicator, [props, context]);
  }
  _inherits(TypingIndicator, _React$Component3);
  return _createClass(TypingIndicator, [{
    key: "render",
    value: function render() {
      var typersDisplay = '';
      var countTypers = 0;
      /* for each user writing messages in chatroom */
      for (var key in this.props.isTyping) {
        /* retrieve the name if it isn't the owner of the chatbox */
        if (key != this.props.owner && this.props.isTyping[key]) {
          typersDisplay += ', ' + key;
          countTypers++;
        }
      }
      /* formatting text */
      typersDisplay = typersDisplay.substr(1);
      typersDisplay += countTypers > 1 ? ' are ' : ' is ';
      /* if at least one other person writes */
      if (countTypers > 0) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "chatApp__convTyping"
        }, typersDisplay, " writing", /*#__PURE__*/_react["default"].createElement("span", {
          className: "chatApp__convTypingDot"
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convTyping"
      });
    }
  }]);
}(_react["default"].Component);
/* end TypingIndicator component */
/* ========== */
/* ========== */
/* MessageList component - contains all messages */
var MessageList = /*#__PURE__*/function (_React$Component4) {
  function MessageList(props, context) {
    _classCallCheck(this, MessageList);
    return _callSuper(this, MessageList, [props, context]);
  }
  _inherits(MessageList, _React$Component4);
  return _createClass(MessageList, [{
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convTimeline"
      }, this.props.messages.slice(0).reverse().map(function (messageItem) {
        return /*#__PURE__*/_react["default"].createElement(MessageItem, {
          key: messageItem.id,
          owner: _this3.props.owner,
          sender: messageItem.sender,
          senderAvatar: messageItem.senderAvatar,
          message: messageItem.message
        });
      }));
    }
  }]);
}(_react["default"].Component);
/* end MessageList component */
/* ========== */
/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
var MessageItem = /*#__PURE__*/function (_React$Component5) {
  function MessageItem() {
    _classCallCheck(this, MessageItem);
    return _callSuper(this, MessageItem, arguments);
  }
  _inherits(MessageItem, _React$Component5);
  return _createClass(MessageItem, [{
    key: "render",
    value: function render() {
      /* message position formatting - right if I'm the author */
      var messagePosition = this.props.owner == this.props.sender ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convMessageItem " + messagePosition + " clearfix"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.senderAvatar,
        alt: this.props.sender,
        className: "chatApp__convMessageAvatar"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convMessageValue",
        dangerouslySetInnerHTML: {
          __html: this.props.message
        }
      }));
    }
  }]);
}(_react["default"].Component);
/* end MessageItem component */
/* ========== */
/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
var ChatBox = /*#__PURE__*/function (_React$Component6) {
  function ChatBox(props, context) {
    var _this4;
    _classCallCheck(this, ChatBox);
    _this4 = _callSuper(this, ChatBox, [props, context]);
    _this4.state = {
      isLoading: false
    };
    _this4.sendMessageLoading = _this4.sendMessageLoading.bind(_this4);
    var timeout = null;
    return _this4;
  }
  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  _inherits(ChatBox, _React$Component6);
  return _createClass(ChatBox, [{
    key: "sendMessageLoading",
    value: function sendMessageLoading(sender, senderAvatar, message) {
      var _this5 = this;
      this.setState({
        isLoading: true
      });
      this.props.sendMessage(sender, senderAvatar, message);
      setTimeout(function () {
        _this5.setState({
          isLoading: false
        });
      }, 400);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__conv"
      }, /*#__PURE__*/_react["default"].createElement(Title, {
        owner: this.props.owner
      }), /*#__PURE__*/_react["default"].createElement(MessageList, {
        owner: this.props.owner,
        messages: this.props.messages
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__convSendMessage clearfix"
      }, /*#__PURE__*/_react["default"].createElement(TypingIndicator, {
        owner: this.props.owner,
        isTyping: this.props.isTyping
      }), /*#__PURE__*/_react["default"].createElement(InputMessage, {
        isLoading: this.state.isLoading,
        owner: this.props.owner,
        ownerAvatar: this.props.ownerAvatar,
        sendMessage: this.props.sendMessage,
        sendMessageLoading: this.sendMessageLoading,
        typing: this.props.typing,
        resetTyping: this.props.resetTyping
      })));
    }
  }]);
}(_react["default"].Component);
/* end ChatBox component */
/* ========== */
/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
var ChatRoom = /*#__PURE__*/function (_React$Component7) {
  function ChatRoom(props, context) {
    var _this6;
    _classCallCheck(this, ChatRoom);
    _this6 = _callSuper(this, ChatRoom, [props, context]);
    _this6.state = {
      messages: [{
        id: 1,
        sender: 'Shun',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        message: 'Hello 👋'
      }, {
        id: 2,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        message: 'Hey!'
      }, {
        id: 3,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        message: 'How are you?'
      }, {
        id: 4,
        sender: 'Shun',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        message: 'Great! It\'s been a while... 🙃'
      }, {
        id: 5,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        message: 'Indeed.... We\'re gonna have to fix that. 🌮🍻'
      }],
      isTyping: []
    };
    _this6.sendMessage = _this6.sendMessage.bind(_this6);
    _this6.typing = _this6.typing.bind(_this6);
    _this6.resetTyping = _this6.resetTyping.bind(_this6);
    return _this6;
  }
  /* adds a new message to the chatroom */
  _inherits(ChatRoom, _React$Component7);
  return _createClass(ChatRoom, [{
    key: "sendMessage",
    value: function sendMessage(sender, senderAvatar, message) {
      var _this7 = this;
      setTimeout(function () {
        var messageFormat = detectURL(message);
        var newMessageItem = {
          id: _this7.state.messages.length + 1,
          sender: sender,
          senderAvatar: senderAvatar,
          message: messageFormat
        };
        _this7.setState({
          messages: [].concat(_toConsumableArray(_this7.state.messages), [newMessageItem])
        });
        _this7.resetTyping(sender);
      }, 400);
    }
    /* updates the writing indicator if not already displayed */
  }, {
    key: "typing",
    value: function typing(writer) {
      if (!this.state.isTyping[writer]) {
        var stateTyping = this.state.isTyping;
        stateTyping[writer] = true;
        this.setState({
          isTyping: stateTyping
        });
      }
    }
    /* hide the writing indicator */
  }, {
    key: "resetTyping",
    value: function resetTyping(writer) {
      var stateTyping = this.state.isTyping;
      stateTyping[writer] = false;
      this.setState({
        isTyping: stateTyping
      });
    }
  }, {
    key: "render",
    value: function render() {
      var users = {};
      var chatBoxes = [];
      var messages = this.state.messages;
      var isTyping = this.state.isTyping;
      var sendMessage = this.sendMessage;
      var typing = this.typing;
      var resetTyping = this.resetTyping;

      /* user details - can add as many users as desired */
      users[0] = {
        name: 'Shun',
        avatar: 'https://i.pravatar.cc/150?img=32'
      };
      users[1] = {
        name: 'Gabe',
        avatar: 'https://i.pravatar.cc/150?img=56'
      };
      /* test with two other users :)
      users[2] = { name: 'Kate', avatar: 'https://i.pravatar.cc/150?img=47' };
      users[3] = { name: 'Patrick', avatar: 'https://i.pravatar.cc/150?img=14' };
      */

      /* creation of a chatbox for each user present in the chatroom */
      Object.keys(users).map(function (key) {
        var user = users[key];
        chatBoxes.push( /*#__PURE__*/_react["default"].createElement(ChatBox, {
          key: key,
          owner: user.name,
          ownerAvatar: user.avatar,
          sendMessage: sendMessage,
          typing: typing,
          resetTyping: resetTyping,
          messages: messages,
          isTyping: isTyping
        }));
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "chatApp__room"
      }, chatBoxes);
    }
  }]);
}(_react["default"].Component);
/* end ChatRoom component */
/* ========== */
/* render the chatroom */
setTimeout(function () {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(ChatRoom, null), document.getElementById("chatApp"));
}, 400);
