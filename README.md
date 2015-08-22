# handlebars-ex
Simple handlebars-like parser.

Actually this is just a [PEGjs](pegjs.org) grammar that auto-generates a parser to recognize [Handlebars.js](handlebarsjs.com)-like

## Overview
This project born as a necessity of the project [blueHTML](https://github.com/Mictian/blueHTML) to be more modular and allow re-use the recognition of handlebarsjs templates.


## API & Example

```javascript

var handlebarsX = require('handlebars-ex');

var ast = handlebarsX.parse('<div>{{#if cond}}<hr/> {{/if}}</div>');

```

## Limitation
It is important to notice that NOT ALL handlebars templates are valid handlebars-ex templates.

The grammar used here is not the same used by Handlebars. With Handlebars you are able to generate ANY template; C#, JavaScript, HTML or simple Plain Text.
This is not the case of handlebars-ex. Here we only accept/recognize a subset of HTML-Handlebars templates.

This means based on the current grammar, there are templates that WONT be recognized.
Grammar limitations:

  - Variable tag name are not supported. Sample:

```HTML
<{{tagName}}> some content here </{{tagName}}>
```

  - XML Structure is mandatory for non void tags. This means that you CANNOT conditionally (inside a IF condition) close a tag. Besides, as a consequence of the previous all open tag must have a closing tag. None child tag is allowed to close or add context outside the closing parent tag. Samples:

```HTML
<!-- Invalid Tags structure -->
<div> {{#if condition}}   </div> {{else}} <p>...</p> </div> {{/if}}
<!-- Here the IF has an invalid child a closing div that does not open inside the IF body. The first div never close -->

<!-- Invalid Tags structure -->
<a href="{{#if condition}}" {{else}} extra-values" {{/if}} />

<!-- Valid Tags structure -->
<input type="text" />
<input type="..." ></input>
```


## License
The MIT License (MIT)

Copyright (c) 2015 Mictian

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.