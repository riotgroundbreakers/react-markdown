'use strict';

var React = require('react');
var remark = require('remark');
var reactRenderer = require('remark-react');

var propTypes = React.PropTypes;

var ReactMarkdown = React.createClass({
    displayName: 'ReactMarkdown',

    propTypes: {
        className: propTypes.string,
        source: propTypes.string.isRequired,
        containerTagName: propTypes.string,
        sourcePos: propTypes.bool,
        escapeHtml: propTypes.bool,
        skipHtml: propTypes.bool,
        softBreak: propTypes.string,
        allowNode: propTypes.func,
        allowedTypes: propTypes.array,
        disallowedTypes: propTypes.array,
        transformLinkUri: propTypes.func,
        unwrapDisallowed: propTypes.bool,
        renderers: propTypes.object,
        walker: propTypes.func
    },

    getDefaultProps: function() {
        return {
            containerTagName: 'div'
        };
    },

    render: function() {
        var containerProps = {};
        if (this.props.className) {
            containerProps.className = this.props.className;
        }

        var children = remark().use(reactRenderer, {sanitize: false}).process(this.props.source);
        var args = [this.props.containerTagName, containerProps].concat(children);
        return React.createElement.apply(React, args);
    }
});

module.exports = ReactMarkdown;
