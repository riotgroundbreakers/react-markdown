'use strict'

var unified = require('unified')
var parse = require('remark-parse')
var PropTypes = require('prop-types')
var objectAssign = require('object-assign')
var defaultRenderers = require('./renderers')
var getDefinitions = require('./get-definitions')
var astToReact = require('./ast-to-react')
var wrapTableRows = require('./wrap-table-rows')
var disallowNode = require('./plugins/disallow-node')

var allTypes = Object.keys(defaultRenderers)

var ReactMarkdown = function ReactMarkdown (props) {
  var src = props.source || props.children || ''

  if (props.allowedTypes && props.disallowedTypes) {
    throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined')
  }

  var renderers = objectAssign({}, defaultRenderers, props.renderers)
  var plugins = [wrapTableRows]

  var disallowedTypes = props.disallowedTypes || []
  if (props.allowedTypes) {
    disallowedTypes = allTypes.filter(function (type) {
      return type !== 'root' && props.allowedTypes.indexOf(type) === -1
    })
  }

  var removalMethod = props.unwrapDisallowed ? 'unwrap' : 'remove'
  if (disallowedTypes.length > 0) {
    plugins.push(disallowNode.ofType(disallowedTypes, removalMethod))
  }

  if (props.allowNode) {
    plugins.push(disallowNode.ifNotMatch(props.allowNode, removalMethod))
  }

  var rawAst = unified().use(parse).parse(src)
  var ast = plugins.reduce(function (node, plugin) {
    return plugin(node)
  }, rawAst)

  var renderProps = objectAssign({}, props, {
    renderers: renderers,
    definitions: getDefinitions(ast)
  })

  return astToReact(ast, renderProps)
}

ReactMarkdown.defaultProps = {
  renderers: {},
  escapeHtml: true,
  skipHtml: false
}

ReactMarkdown.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string,
  children: PropTypes.string,
  sourcePos: PropTypes.bool,
  escapeHtml: PropTypes.bool,
  skipHtml: PropTypes.bool,
  softBreak: PropTypes.string,
  allowNode: PropTypes.func,
  allowedTypes: PropTypes.arrayOf(PropTypes.oneOf(allTypes)),
  disallowedTypes: PropTypes.arrayOf(PropTypes.oneOf(allTypes)),
  transformLinkUri: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  transformImageUri: PropTypes.func,
  unwrapDisallowed: PropTypes.bool,
  renderers: PropTypes.object
}

module.exports = ReactMarkdown
