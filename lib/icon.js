
module.exports = Icon;

function Icon(prefix) {
  prefix = prefix || 'fa fa-';
  this.prefix = prefix;
}

Icon.prototype = {
  create: function(name, cmd) {
    var title = name.charAt(0).toUpperCase() + name.slice(1);
    if (cmd) {
      title += ' (' + cmd + ')';
    }
    return createElement(this.prefix + name, title);
  },

  get bold() {
    return this.create('bold', 'super + b');
  },

  get italic() {
    return this.create('italic');
  },

  get strikethrough() {
    return this.create('strikethrough');
  },

  get heading() {
    return createElement(this.prefix + 'header', 'Heading');
  },

  get blockquote() {
    return createElement(this.prefix + 'quote-right', 'Blockquote');
  },

  get ul() {
    return createElement(this.prefix + 'list-ul', 'Unordered List');
  },

  get ol() {
    return createElement(this.prefix + 'list-ol', 'Ordered List');
  },

  get link() {
    return this.create('link');
  },

  get image() {
    return createElement(this.prefix + 'picture-o', 'Image');
  },

  get code() {
    return this.create('code');
  },

  get newline() {
    return createElement(this.prefix + 'minus', 'Newline');
  },

  get preview() {
    return createElement(this.prefix + 'eye', 'Preview');
  }
}


function createElement(iconClass, title) {
  var el = document.createElement('button');
  el.className = 'markdown-textarea-ui ' + iconClass;
  el.setAttribute('aria-label', title);
  return el;
}
