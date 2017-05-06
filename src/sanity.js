/* eslint-disable no-unused-vars, no-console, react/prop-types, react/display-name */
var fs = require('fs')
var path = require('path')
var util = require('util')
var tidy = require('htmltidy').tidy
var React = require('react')
var ReactDom = require('react-dom/server')
var Markdown = require('./react-markdown')
var log = thing => console.log(util.inspect(thing, {colors: true, depth: 10}))

/*var md = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8')
var ast = unified().use(parse).parse(md)
log(ast)
console.log('==============================================')
log(toHast(ast))
*/

var markup = `
# react-markdown

A little bit of everything in this thing. This being a *paragraph*.
It also supports things like **emphasis**, obviously.
Usually rendered as a \`<hr>\`, that one.

-----------------------------------------

Horizontal rules are cool.

> > I fucking ~~hate~~ dislike blockquotes.
> Blockquotes can be helpful, from time to time.
> It looks pretty. Sort of. But also looks like [email](mailto:me@mail.com).

---

* Lists though <3
* Absolutely love lists.
* They are pretty


2. And can be numeric
3. well, "ordered" I believe they are called.
4. That's pretty neat.

## Code block follows

\`\`\`js
var foo = 'bar';
console.log(foo.toUpperCase());
\`\`\`

How about them
hard breaks?

<div>
  Block of HTML here. Does that make any difference?
</div>

![alpha](http://example.com/favicon.ico "bravo")

And that's all has to say about [alpha][bravo] that.
Images, ![alpha][bravo] yeah. Can't say I like it.
That was introduced in [1.1.4].

Fool, <span class="inline">this *thing* here</span>, it aint cool

| ID  | Value | Norsk | Nynorsk |
| :-- | :---: | ----: | ------- |
| 1   | one   | én    | ein     |
| 2   | two   | to    | två     |
| 3   | three | tre   | tri     |

[alpha]: http://alpha.com
[bravo]: http://bravo.com
[1.1.4]: https://github.com/rexxars/react-markdown/compare/v1.1.3...v1.1.4
`

var renderers = {
  emphasis: props =>
    React.createElement('span', {className: 'emphasis'}, props.children)
}

var notidy = (html, opts, cb) => {
  cb(null, html)
}

var el = React.createElement(Markdown, {sourcePos: false}, markup)
tidy(ReactDom.renderToStaticMarkup(el), {indent: true}, (err, html) => {
  if (err) {
    throw err
  }

  console.log('==============================')
  console.log(html.replace(/[\s\S]*<body>([\s\S]*)<\/body>[\s\S]*/, '$1'))
  console.log('==============================')
})
