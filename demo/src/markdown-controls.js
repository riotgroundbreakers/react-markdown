var React = require('react')

module.exports = React.createClass({
  displayName: 'MarkdownControls',

  propTypes: {
    mode: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      mode: 'raw'
    }
  },

  handleChange: function (evt) {
    this.props.onChange(evt.target.value)
  },

  render: function () {
    var rawChecked = this.props.mode === 'raw'
    var skipChecked = this.props.mode === 'skip'
    var escapeChecked = this.props.mode === 'escape'

    return (
      <div className="markdown-controls">
        <form className="pure-form pure-form-inline">
          <fieldset>
            <legend>HTML mode:</legend>

            <label htmlFor="raw-html" className="pure-checkbox">
              Raw&nbsp;
              <input
                id="raw-html"
                name="html-mode"
                type="radio"
                value="raw"
                checked={rawChecked}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="escape-html" className="pure-checkbox">
              Escape&nbsp;
              <input
                id="escape-html"
                name="html-mode"
                type="radio"
                value="escape"
                checked={escapeChecked}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="skip-html" className="pure-checkbox">
              Skip&nbsp;
              <input
                id="skip-html"
                name="html-mode"
                type="radio"
                value="skip"
                checked={skipChecked}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
        </form>
      </div>
    )
  }
})
