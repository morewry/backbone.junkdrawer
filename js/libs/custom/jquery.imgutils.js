$(function() {

	var imgUtils = {

		/**
		 * http://stackoverflow.com/questions/934012/get-image-data-in-javascript
		**/
		getBase64FromUrl: function( url ) {

			var img;

			img = new Image();

			img.src = url;
			img.onload = getBase64FromCanvas();

		}, // getBase64fromUrl

		/**
		 * http://stackoverflow.com/questions/934012/get-image-data-in-javascript
		**/
		getBase64FromCanvas: function( img ) {

			var canvas,
			ctx,
			imgType,
			dataUrl;

			canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;

			ctx = canvas.getContext("2d")
			ctx.drawImage(img, 0, 0);

			dataUrl = canvas.toDataURL("image/" + imgType);

			console.log(dataUrl);

			return dataUrl;

		}, // getBase64FromCanvas

		encodeBase64: function( ) {
		}, // encodeBase64

		/**
		 * https://github.com/bahamas10/preloadimages.js
		 * Author: Dave Eddy <dave@daveeddy.com>
		 * License: MIT
		**/
		preLoadImages: function( obj, cb ) {
			var loaded = 0;
			toload = 0,
			images = obj instanceof Array ? [] : {};

			for (var i in obj) {
				toload++;
				images[i] = new Image();
				images[i].src = obj[i];
				images[i].onload = load;
				images[i].onerror = load;
				images[i].onabort = load;
			} // for

			function load( ) {
				if (++loaded >= toload) cb(images);
			} // load
		} // preLoadImages

	} // imgUtils

}); // fn
