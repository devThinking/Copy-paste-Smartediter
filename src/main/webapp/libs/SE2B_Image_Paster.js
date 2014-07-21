/**
 * 
 */
function ClipboardImagePaster(targetIframe , id){
	this.targetIframe = targetIframe;
	this.id = id;
}

ClipboardImagePaster.prototype.imageUpload = function(url, image,id) {
	$.ajax({
		url : url,
		data : {"image" : image	},
		type : "post"
	}).done(function(d) {
		var append_img = "<img src='" + d + "'/>";
		oEditors.getById[id].exec("PASTE_HTML", [ append_img ]);
	}).fail(function(d) {
		console.log(d);
	});
};

ClipboardImagePaster.prototype.convertImgToBase64 = function(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS'), ctx = canvas
			.getContext('2d'), img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var dataURL;
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = url;
};

ClipboardImagePaster.prototype.init = function(uploadPath) {
	var obj = this;
	var id = this.id;
	$("#"+this.targetIframe).contents().find('iframe').contents().on('paste', function(e) {
		e.originalEvent.preventDefault();
		if (e.originalEvent.msConvertURL) {
			var cbData = window.clipboardData;
			var fileList = cbData.files;
			if (fileList.length > 0) {
				for (var i = 0; i < fileList.length; i++) {
					var file = fileList[i];
					var url = URL.createObjectURL(file);
					e.originalEvent.msConvertURL(file, "specified", url);
					obj.convertImgToBase64(url, function(base64Img) {
						obj.imageUpload(uploadPath,base64Img,id);
					});
				}
			}
		} else if (e.originalEvent.clipboardData) {
			var items = e.originalEvent.clipboardData.items;
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].type.indexOf("image") !== -1) {
						var blob = items[i].getAsFile();
						var URLObj = window.URL || window.webkitURL;
						var source = URLObj.createObjectURL(blob);
						obj.convertImgToBase64(source, function(base64Img) {
							obj.imageUpload(uploadPath,base64Img,id);
						});
					}
				}
			}
		}
	});
};