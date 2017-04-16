var Textarea = require('./');
var el = document.querySelector('textarea');

window.editor = new Textarea(el, {
  upload: function(files, cb) {
    cb({src: 'this-is-a-fake-link'});
  }
});
