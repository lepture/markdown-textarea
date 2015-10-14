
module.exports = Textarea;

var Selection = require('selection.js');

function Textarea(el, options) {
  Selection.call(this, el);
  this.options = options || {};
  this.langs = this.options.langs || {};
}

Textarea.prototype = Object.create(Selection.prototype);
Textarea.prototype.constructor = Textarea;


Textarea.prototype.focus = function() {
  this.element.focus();
};

Textarea.prototype.wrap = function(startText, placeholder, endText) {
  var cursor = this.cursor();
  if (cursor[0] === cursor[1]) {
    this.text(placeholder);
    cursor = this.cursor();
  }
  var cursorMove = startText.length;
  this.insertText(startText, cursor[0]);
  if (endText) {
    this.insertText(endText, cursor[1] + cursorMove);
  }
  return this.cursor(cursor[0] + cursorMove, cursor[1] + cursorMove);
};

Textarea.prototype.bold = function() {
  var sur = this.surround(2);
  if (sur[0] === sur[1] && sur[0] === '**') {
    this.focus();
    return this;
  };

  var text = this.langs.bold || 'Bold Text';
  sur = this.surround(1);
  if (sur[0] === sur[1] && sur[0] === '*') {
    return this.wrap('*', text, '*');
  }

  return this.wrap('**', text, '**');
};

Textarea.prototype.italic = function() {
  var sur = this.surround(1);
  if (sur[0] === sur[1] && (sur[0] === '*' || sur[0] === '_')) {
    this.focus();
    return this;
  }

  var text = this.langs.italic || 'Italic Text';
  return this.wrap('*', text, '*');
};

Textarea.prototype.strikethrough = function() {
  var sur = this.surround(2);
  if (sur[0] === sur[1] && sur[0] === '~~') {
    this.focus();
    return this;
  };
  var text = this.langs.strikethrough || 'Deleted Text';
  return this.wrap('~~', text, '~~');
};

Textarea.prototype.heading = function(level) {
  var text = this.langs.heading || 'Heading Text';
  var prefix = new Array(level + 1).join('#') + ' ';
  return this.wrap('\n' + prefix, 'Heading', '\n');
};

Textarea.prototype.blockquote = function() {
  var text = this.langs.blockquote || 'Blockquote Text';
  return this.wrap('\n> ', text, '\n');
};

Textarea.prototype.ul = function() {
  var text = this.langs.ul || 'Unordered List';
  return this.wrap('\n- ', text, '\n');
};

Textarea.prototype.ol = function() {
  var text = this.langs.ol || 'Ordered List';
  return this.wrap('\n1. ', text, '\n');
};

Textarea.prototype.link = function(link, text) {
  text = text || this.langs.link || 'Link Text';
  link = link || this.options.defaultLink || 'http://lepture.com/';
  return this.wrap('[', text, '](' + link + ')');
};

Textarea.prototype.image = function(link, text) {
  text = text || this.langs.image || 'Image Text';
  link = link || this.options.defaultImage || 'http://lepture.com/logo.svg';
  return this.wrap('![', text, '](' + link + ')');
};

Textarea.prototype.newline = function() {
  var cursor = this.cursor();
  this.insertText('\n\n---\n\n', cursor[1]);
  return this.cursor(cursor[1] + 7);
};

Textarea.prototype.code = function() {
  return this.wrap('\n```lang\n', 'Code Here', '\n```\n\n');
}
