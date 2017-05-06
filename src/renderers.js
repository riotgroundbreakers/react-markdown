/* eslint-disable react/prop-types, react/no-multi-comp */
const React = require('react')
const createElement = React.createElement

module.exports = {
  root: 'div',
  break: 'br',
  paragraph: 'p',
  emphasis: 'em',
  strong: 'strong',
  thematicBreak: 'hr',
  blockquote: 'blockquote',
  delete: 'del',
  link: 'a',
  image: 'img',
  linkReference: 'a',
  imageReference: 'img',
  table: 'table',
  tableHead: 'thead',
  tableBody: 'tbody',
  tableRow: 'tr',
  tableCell: TableCell,

  list: List,
  listItem: ListItem,
  definition: NullRenderer,
  heading: Heading,
  inlineCode: InlineCode,
  code: CodeBlock,
  html: Html
}

function TableCell(props) {
  return createElement(
    props.isHeader ? 'th' : 'td',
    Object.assign(getCoreProps(props), {style: {textAlign: props.align}}),
    props.children
  )
}

function Heading(props) {
  return createElement('h' + props.level, getCoreProps(props), props.children)
}

function List(props) {
  var attrs = getCoreProps(props)
  if (props.start !== null && props.start !== 1) {
    attrs.start = props.start.toString()
  }

  return createElement(
    props.ordered ? 'ol' : 'ul',
    attrs,
    props.children
  )
}

function ListItem(props) {
  return createElement('li', getCoreProps(props), props.children)
}

function CodeBlock(props) {
  var className = props.language && 'language-' + props.language
  var code = createElement('code', className ? {className: className} : null, props.value)
  return createElement('pre', getCoreProps(props), code)
}

function InlineCode(props) {
  return createElement('code', getCoreProps(props), props.children)
}

function Html(props) {
  if (props.skipHtml) {
    return null
  }

  if (props.escapeHtml) {
    // @todo when fiber lands, we can simply render props.value
    return createElement('span', null, props.value)
  }

  var nodeProps = {dangerouslySetInnerHTML: {__html: props.value}}
  return createElement(props.isBlock ? 'div' : 'span', nodeProps)
}

function NullRenderer() {
  return null
}

function getCoreProps(props) {
  return props['data-sourcepos'] ? {'data-sourcepos': props['data-sourcepos']} : {}
}
