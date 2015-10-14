var editor = require('./lib/')
var el = document.querySelector('textarea');
var marked = require('marked');

editor.bind(el, {
  preview: function(text, cb) {
    cb(marked(text));
  },
  upload: function(files, cb) {
    cb({link: 'this-is-a-fake-link'});
  }
});
