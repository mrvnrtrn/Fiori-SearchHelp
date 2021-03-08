sap.ui.define([], function() {
	"use strict";

	return {
		convertFaaliyet: function(val) {
			if (val) {
				switch (val) {
					case 'Y':
						return "Yükleme";
					case 'B':
						return "Boşaltma";
				}
			}
			return val;
		},
		
		visibleMessageButton: function(val){
			
		}
	};
});