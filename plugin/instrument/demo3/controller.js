var controls = [], operatorNumber = 4;


// Set operator control.
controls = controls.concat((function() {
	var i, j, min, max, stap, value, offsetX, offsetY, id, labelEnabled, prefix, arr = [], adsr = ['a', 'd', 's', 'r'];
	for( i = 0; i < 4; i++) {
		
		offsetX = i%2==0 ? 0 : 296;
		offsetY = i<2 ? 0 : 200;

		// Octave and Factor
		for( j = 0; j < 2; j++) {
			id = "ope" + i;
			if( j==0 ){ // Octave
				id += "_oct";
				min=0; max=12; step=1;
				value = i==0 ? 1 : 1;
				labelEnabled = true;
				prefix = "x";
				postfix = "";
			}
			else { // Factor
				id += "_fac";
				min=0; max=100; step=1;
				value = 50;
				labelEnabled = true;
				prefix = "";
				postfix = "%";
			}
			
			arr.push({
				type : "knob",
				id : id,
				image : "img/labelcontrol.png",
				min: min, max: max, step: step,
				value : value,
				offsetx : offsetX + 152 + j * 72,
				offsety : offsetY + 64,
				width : 56,
				height : 56,
				label: labelEnabled,
				labelpostfix: postfix,
				labelprefix: prefix
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
					min=0; max=100; step=1; 
					value = 100;//i==0 ? 1: 0;
					var labelPostfix = "%";
					break;
			}
			
			arr.push({
				id : id,
				offsetx : offsetX + j * 64 + 48,
				offsety : offsetY + 144,
				type : "knob",
				min: min, max: max, step: step, value : value,
				image : "img/labelcontrol.png",
				width : 56,
				height : 56,
				label: true,
				labelpostfix: labelPostfix
			});
		}

	}

	return arr;
})());

// Set algorithm panel.
controls = controls.concat((function() {
	var arr = [], i, j, id, suffixList = ["mod0", "mod1", "mod2", "mod3", 'out'];

	for( i = 0; i < 4; i++) {
		for( j = 0; j < 5; j++) {
			id = "car" + i + "_" + suffixList[j];
			min=0, step=0.01, value= (j==4 && i==0) ? 1 : 0;
			if( j<4 ){
				max = 3;
			}
			else {
				max = 1;
			}
			arr.push({
				id : id,
				offsetx : 704 + j * 48,
				offsety : 208 + i * 48,
				type : "knob",
				min: min, max: max, step: step, value : value,
				image : "img/needlecontrol.png",
				width : 40,
				height : 40
			});
		}
	}

	return arr;
})());

// Set volume control.
controls = controls.concat((function() {
	return [{
		id : "vol",
		offsetx : 755,
		offsety : 51,
		type : "knob",
		value : 0.5,
		min: 0, max: 1, step: 0.01,
		image : "img/volume.png",
		width : 90,
		height : 90
	}];
})());

var controller = {
	background : {
		image : "img/background.png",
		height : 448,
		width : 1000
	},
	controls : controls
}