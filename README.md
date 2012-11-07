# Highlight.js

Highlight.js highlights syntax in code examples on blogs, forums and,
in fact, on any web page. It's very easy to use because it works
automatically: finds blocks of code, detects a language, highlights it.

Autodetection can be fine tuned when it fails by itself (see "Heuristics").


## Basic usage

Link the library and a stylesheet from your page and hook highlighting to
the page load event:

```html
<link rel="stylesheet" href="styles/default.css">
<script src="highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

This will highlight all code on the page marked up as `<pre><code> .. </code></pre>`.
If you use different markup or need to apply highlighting dynamically, read
"Custom initialization" below.

- You can download your own customized version of "highlight.pack.js" or
  use the hosted one as described on the download page:
  <http://softwaremaniacs.org/soft/highlight/en/download/>

- Style themes are available in the download package or as hosted files.
  To create a custom style for your site see the class reference in the file
  [classref.txt][cr] from the downloaded package.

[cr]: http://github.com/isagalaev/highlight.js/blob/master/classref.txt


## node.js

Highlight.js can be used under node.js. The package with all supported languages is
installable from NPM:

    npm install highlight.js

Alternatively, you can build it from the source with only languages you need:

    python tools/build.py -tnode lang1 lang2 ..

Using the library:

```javascript
var hljs = require('highlight.js');

// If you know the language
hljs.highlight(lang, code).value;

// Automatic language detection
hljs.highlightAuto(code).value;
```

## AMD

Highlight.js can be used with an AMD loader.  You will need to build it from 
source in order to do so:

```bash
$ python tools/build.py -tamd lang1 lang2 ..
```

Which will generate a ``build/highlight.pack.js`` which will load as an AMD 
module with support for the built languages and can be used like so:

```javascript
require(["highlight.js/build/highlight.pack"], function(hljs){
  // If you know the language
  hljs.hlighlight(lang, code).value;

  // Automatic language detection
  hljs.highlightAuto(code).value;
});
```

## Tab replacement

You can replace TAB ('\x09') characters used for indentation in your code
with some fixed number of spaces or with a `<span>` to give them special
styling:

```html
<script type="text/javascript">
  hljs.tabReplace = '    '; // 4 spaces
  // ... or
  hljs.tabReplace = '<span class="indent">\t</span>';

  hljs.initHighlightingOnLoad();
</script>
```

## Custom initialization

If you use different markup for code blocks you can initialize them manually
with `highlightBlock(code, tabReplace, useBR)` function. It takes a DOM element
containing the code to highlight and optionally a string with which to replace
TAB characters.

Initialization using, for example, jQuery might look like this:

```javascript
$(document).ready(function() {
  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
});
```

You can use `highlightBlock` to highlight blocks dynamically inserted into
the page. Just make sure you don't do it twice for already highlighted
blocks.

If your code container relies on `<br>` tags instead of line breaks (i.e. if
it's not `<pre>`) pass `true` into the third parameter of `highlightBlock`
to make highlight.js use `<br>` in the output:

```javascript
$('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});
```


## Heuristics

Autodetection of a code's language is done using a simple heuristic:
the program tries to highlight a fragment with all available languages and
counts all syntactic structures that it finds along the way. The language
with greatest count wins.

This means that in short fragments the probability of an error is high
(and it really happens sometimes). In this cases you can set the fragment's
language explicitly by assigning a class to the `<code>` element:

```html
<pre><code class="html">...</code></pre>
```

You can use class names recommended in HTML5: "language-html",
"language-php". Classes also can be assigned to the `<pre>` element.

To disable highlighting of a fragment altogether use "no-highlight" class:

```html
<pre><code class="no-highlight">...</code></pre>
```


## Export

File export.html contains a little program that allows you to paste in a code
snippet and then copy and paste the resulting HTML code generated by the
highlighter. This is useful in situations when you can't use the script itself
on a site.


## Meta

- Version: 7.3
- URL:     http://softwaremaniacs.org/soft/highlight/en/
- Author:  Ivan Sagalaev (<maniac@softwaremaniacs.org>)

For the license terms see LICENSE files.
For the list of contributors see AUTHORS.en.txt file.
