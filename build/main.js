/** @jsx React.DOM */
/***********************************/
// Header contains title and start //
/***********************************/
var Header = new React.createClass({
	render: function() {
		return React.createElement('div', {className: 'carousel-header'}, 
			// this.props.title,
		 React.createElement('span', {className: 'carousel-title'}, this.props.title),
		 React.createElement('span', {className: 'carousel-start', onClick: this.props.startSlideshow}, 'Start Slideshow')
		)
	}
})

/***********************************/
//    			Image Container        //
/***********************************/
var Img = new React.createClass({
	render: function() {
		return React.createElement('div', null, 
			React.createElement('img', {src: this.props.url})
		)
	}
})

/***********************************/
//    		Footer Container         //
/***********************************/
var Footer = new React.createClass({
	render: function() {
		var images = this.props.images;
		var context = this;
		// return React.createElement('div', {className: 'carousel-footer'}, this.props.count)
		return (
			React.createElement("div", {className: "carousel-footer"}, 
			React.createElement("ul", null, " ", Object.keys(images).map(function(result) {
				var val = Math.abs(result - context.props.count-1)
				return React.createElement("li", {key: val, onClick: context.props.onClickIndex.bind(this, val)}, val);
			})
			)
			)
		)
	}
})

/***********************************/
//   Carousel Parent Container     //
/***********************************/
var Carousel = new React.createClass({
	getInitialState: function() {
		this.props.images = data.Images;
		this.organizeImgs();
		return {title: this.imagesCollection[1].title,
						url  : this.imagesCollection[1].url,
						index: 1}
	},

	organizeImgs: function() {
		this.count = this.props.images.length;

		// create a new associative array with increasing integer keys that organizes the images' information
		this.imagesCollection = {};
		var context = this;
		this.props.images.forEach(function(val, key, arr) {
			context.imagesCollection[key+1] = {
				title: val.Title,
				url: val.Url
			}
		})
	},

	leftClick: function(e) {
		if (this.state.index ===1 ){
			return;
		} else {
			var newIndex = this.state.index - 1;
			this.setState({
				index: newIndex,
				title: this.imagesCollection[newIndex].title,
				url: this.imagesCollection[newIndex].url
			})
		}
	},

	rightClick: function(e) {
		if (this.state.index ===this.count ){
			return;
		} else {
			var newIndex = this.state.index +1;
			this.setState({
				index: newIndex,
				title: this.imagesCollection[newIndex].title,
				url: this.imagesCollection[newIndex].url
			})
		}
	},

	onClickIndex: function(key) {
		this.setState({
				index: key,
				title: this.imagesCollection[key].title,
				url: this.imagesCollection[key].url
		})
	},

	startSlideshow: function(e) {
		this.setState({
			index: 1,
			title: this.imagesCollection[1].title,
			url: this.imagesCollection[1].url
		})

		var context = this;
		var slideshow = setInterval(function(){
			var newIndex = context.state.index + 1;
			if (newIndex > context.count) {
				clearInterval(slideshow);
			} else {			
				context.setState({
					index: newIndex,
					title: context.imagesCollection[newIndex].title,
					url: context.imagesCollection[newIndex].url
				})
			}
		}, 3500)
	},

	render: function() {
		return (
			React.createElement('div', {className: 'carousel'}, 
			React.createElement('div', {className: 'arrow-left', onClick: this.leftClick}), 
			React.createElement('div', {className: 'carousel-content'}, 
				React.createElement(Header, {title:  this.state.title, startSlideshow: this.startSlideshow}), 
				React.createElement(Img, {url:  this.state.url}), 
				React.createElement(Footer, {count: this.count, images: this.imagesCollection, onClickIndex: this.onClickIndex})
			), 
			React.createElement('div',{className: 'right-box'}, React.createElement('div', {className: 'arrow-right', onClick: this.rightClick}))
			
			)
		)
	}
})

React.render(React.createElement(Carousel, null), document.body)