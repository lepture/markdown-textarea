
var Textarea = require('./textarea');
var Icon = require('./icon');


module.exports = function(el, options) {
  options = options || {};

  var textarea = new Textarea(el, options);
  var toolbar = createToolbar(options.iconPrefix, textarea);

  var container = createDiv('markdown-textarea');
  container.appendChild(toolbar);

  var wrapper = createDiv('markdown-textarea-editor');
  container.appendChild(wrapper);

  el.parentNode.insertBefore(container, el);
  wrapper.appendChild(el);
};


function createToolbar(prefix, textarea) {
  var icon = new Icon(prefix);
  var div = createDiv('markdown-textarea-toolbar');

  var createButton = function(name) {
    var el = icon[name];
    el.addEventListener('click', function(e) {
      e.preventDefault();
      textarea[name]();
    });
    div.appendChild(el);
  };

  ['heading', 'bold', 'italic', 'strikethrough'].forEach(createButton);
  div.appendChild(createSeparator());

  ['ol', 'ul', 'blockquote', 'code'].forEach(createButton);
  div.appendChild(createSeparator());

  createButton('link');
  createButton('image');
  createButton('newline');

  var eye = icon.preview;
  eye.className += ' markdown-textarea-ui-preview';
  div.appendChild(eye);
  return div;
}


function createDiv(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

function createSeparator() {
  var span = document.createElement('span');
  span.className = 'markdown-textarea-toolbar-separator';
  return span;
}
