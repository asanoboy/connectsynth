var controls = [];
var width = 800, operatorNumber = 4, operatorWidth = 180, operatorHeight = 150, controlSize = 32, controlImage = "img/ic_up_circle.png";

var operatorMargin = (width - (operatorWidth * operatorNumber) ) / 5, innerMargin = (operatorWidth - (controlSize * 4) ) / 5, height = operatorMargin * 3 + operatorHeight + controlSize * 4 + innerMargin * 5, algorithmPanelHeight = controlSize * 4 + innerMargin * 5, algorithmPanelWidth = controlSize * 5 + innerMargin * 6;

// Set operator control.
controls = controls.concat((function() {
	var i, j, min, max, stap, value, offsetX, offsetY, id, labelEnabled, arr = [], adsr = ['a', 'd', 's', 'r'];
	for( i = 0; i < 4; i++) {
		offsetX = i * (operatorWidth + operatorMargin) + operatorMargin;
		offsetY = operatorMargin;

		// Octave and Factor
		for( j = 0; j < 2; j++) {
			id = "ope" + i;
			if( j==0 ){ // Octave
				id += "_oct";
				min=0; max=8; step=1;
				value = i==0 ? 1 : 1;
				labelEnabled = true;
			}
			else { // Factor
				id += "_fac";
				min=0; max=1; step=0.01;
				value = 0.5;
				labelEnabled = false;
			}
			
			arr.push({
				type : "control",
				id : id,
				image : controlImage,
				min: min, max: max, step: step,
				value : value,
				offsetx : offsetX + (j + 1) * operatorWidth / 3,
				offsety : offsetY + operatorHeight / 3,
				width : controlSize,
				height : controlSize,
				labelenabled: labelEnabled
			});
		}

		// ADSR
		for( j = 0; j < 4; j++) {
			id = "ope" + i;
			id += "_" + adsr[j];
			switch(adsr[j]){
				case 'a': 
				case 'd': 
				case 'r':
					min=0; max=2; step=0.01;
					value = 0;
					var labelPostfix = "sec";
					break;
				case 's':
					min=0; max=1; step=0.01; 
					value = 1;//i==0 ? 1: 0;
					var labelPostfix = "";
					break;
			}
			
			arr.push({
				id : id,
				offsetx : offsetX + innerMargin / 2 + controlSize / 2 + j * (innerMargin + controlSize),
				offsety : offsetY + 2 * operatorHeight / 3,
				type : "control",
				min: min, max: max, step: step, value : value,
				image : controlImage,
				width : controlSize,
				height : controlSize,
				labelenabled: true,
				labelpostfix: labelPostfix
			});
		}

	}

	return arr;
})());

// Set algorithm panel.
controls = controls.concat((function() {
	var offsetX = width - algorithmPanelWidth - operatorMargin, offsetY = 2 * operatorMargin + operatorHeight, arr = [], i, j, id, suffixList = ["mod0", "mod1", "mod2", "mod3", 'out'];

	for( i = 0; i < 4; i++) {
		for( j = 0; j < 5; j++) {
			id = "car" + i + "_" + suffixList[j];
			min=0, max=1, step=0.01, value= (j==4 && i==0) ? 1 : 0;
			arr.push({
				id : id,
				offsetx : offsetX + innerMargin / 2 + controlSize / 2 + j * (innerMargin + controlSize),
				offsety : offsetY + (innerMargin + controlSize) / 2 + i * (innerMargin + controlSize),
				type : "control",
				min: min, max: max, step: step, value : value,
				image : controlImage,
				width : controlSize,
				height : controlSize
			});
		}
	}

	return arr;
})());

// Set volume control.
controls = controls.concat((function() {
	return [{
		id : "vol",
		offsetx : operatorMargin + (operatorWidth) / 2,
		offsety : (height + operatorMargin + operatorHeight) / 2,
		type : "control",
		value : 0.5,
		min: 0, max: 1, step: 0.01,
		image : controlImage,
		width : controlSize,
		height : controlSize
	}];
})());

var controller = {
	background : {
		image : "img/background.png",
		height : height,
		width : width
	},
	controls : controls
}