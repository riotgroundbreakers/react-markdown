var React = require('react')
var CodeMirror = window.CodeMirrorEditor

module.exports = React.createClass({
  displayName: 'Editor',

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
  },

  handleInputChange: function (evt) {
    this.props.onChange(evt.target.value)
  },

  render: function () {
    return (
      <form className="editor pure-form">
        <CodeMirror
          mode="markdown"
          theme="monokai"
          value={this.props.value}
          onChange={this.handleInputChange}
        />
      </form>
    )
  }
})
