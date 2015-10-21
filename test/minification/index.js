'use strict';

var fs    = require('fs');
var path  = require('path');
var jsdom = require('jsdom').jsdom;
var glob  = require('glob');

describe('minification build', function() {
  before(function(done) {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    var hljsPath = glob.sync(path.join('build', 'highlight.*.js'));
    var that     = this;

    jsdom.env(
      '<pre><code class="language-javascript">var say = "Hello";' +
      '</code></pre>',
      [hljsPath[0]],
      function(error, window) {
        that.block = window.document.querySelector('pre code');
        that.hljs  = window.hljs;

        done(error);
      }
    );
  });

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    var actual = this.block.innerHTML;

    actual.should.equal('<span class="hljs-keyword">var</span> say = ' +
                        '<span class="hljs-string">"Hello"</span>;');
  });
});
