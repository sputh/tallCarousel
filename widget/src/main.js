/** @jsx React.DOM */
var test = {
	'Title': 'Drag & Drop a Receipt',
	'Url': 'http://support.usetallie.com/customer/portal/attachments/363862'
}

var Title = new React.createClass({
	render: function() {
		return React.createElement('div', {className: 'carousel-header'}, 
			// this.props.title,
		 React.createElement('span', {className: 'carousel-title'}, this.props.title),
		 React.createElement('span', {className: 'carousel-start'}, 'Start Slideshow')
		)
	}
})

var Img = new React.createClass({
	render: function() {
		return React.createElement('div', null, 
			React.createElement('img', {src: 'http://support.usetallie.com/customer/portal/attachments/363862'})
		)
	}
})

var Footer = new React.createClass({
	render: function() {
		return React.createElement('div', {className: 'carousel-footer'}, '1')
	}
})

var Carousel = new React.createClass({
	getInitialState: function() {
		return {title: test.Title,
						url  : test.Url}
	},

	render: function() {
		console.log(this.state.url)
		return (
			React.createElement('div', {className: 'carousel'}, 
			React.createElement('div', {className: 'arrow-left'}), 
			React.createElement('div', {className: 'carousel-content'}, 
				React.createElement(Title, {title:  this.state.title}), 
				React.createElement(Img, {url:  this.state.url}), 
				React.createElement(Footer, null)
			), 
			React.createElement('div', {className: 'arrow-right'})
			)
		)
	}
})

React.render(React.createElement(Carousel, null), document.body)