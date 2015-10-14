
var Textarea = require('./textarea');
var Icon = require('./icon');


exports.bind = function(el, options) {
  options = options || {};

  var textarea = new Textarea(el, options);

  var container = createDiv('markdown-textarea');
  var toolbar = createToolbar(options.iconPrefix, textarea);
  container.appendChild(toolbar);

  var wrapper = createDiv('markdown-textarea-editor');
  container.appendChild(wrapper);

  el.parentNode.insertBefore(container, el);
  wrapper.appendChild(el);

  // handle image upload
  if (options.upload) {
    var input = createFileInput();
    listen(input, function(e) {
      options.upload(input.files, function(resp) {
        textarea.image(resp.link, resp.text);
      });
    }, 'change');
    container.appendChild(input);
    listen(toolbar.image, function(e) {
      e.preventDefault();
      input.click();
    });
  } else {
    listen(toolbar.image, function(e) {
      textarea.image();
    });
  }

  // handle preview
  var eye = toolbar.preview;
  if (options.preview) {
    var previewArea = createDiv('markdown-textarea-preview-area');
    wrapper.appendChild(previewArea);
    var statClass = 'markdown-textarea-preview-on';
    listen(eye, function(e) {
      if (container.classList.contains(statClass)) {
        container.classList.remove(statClass);
        cleanEvents(bindPreview.events);
      } else {
        container.classList.add(statClass);
        bindPreview(el, previewArea, options.preview);
      }
    });
  } else {
    eye.style.display = 'none';
  }
};

exports.unbind = function() {
  cleanEvents(listen.events);
  cleanEvents(bindPreview.events);
};


function createToolbar(prefix, textarea) {
  var icon = new Icon(prefix);
  var div = createDiv('markdown-textarea-toolbar');

  var createButton = function(name) {
    var el = icon[name];
    listen(el, function(e) {
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

  var image = icon.image;
  div.appendChild(image);
  div.image = image;

  createButton('newline');

  var eye = icon.preview;
  eye.className += ' markdown-textarea-ui-preview';
  div.appendChild(eye);
  div.preview = eye;

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

function createFileInput() {
  var input = document.createElement('input');
  input.type = 'file';
  input.style.opacity = 0;
  input.style.position = 'fixed';
  input.style.left = '-999999px';
  return input;
}

function listen(el, fn, type) {
  type = type || 'click';
  listen.events.push([el, fn, type]);
  el.addEventListener(type, fn);
}
listen.events = [];

function cleanEvents(events) {
  while (events.length) {
    var item = events.pop();
    item[0].removeEventListener(item[2], item[1]);
  }
}

function bindPreview(input, output, transform) {
  var timer;
  var fn = function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      output.innerHTML = transform(input.value);
    }, 500);
  };
  bindPreview.events.push(input, fn, 'keyup');
  input.addEventListener('keyup', fn);
  output.innerHTML = transform(input.value);
}
bindPreview.events = [];
