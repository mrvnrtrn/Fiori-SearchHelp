sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../util/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("com.tosyali.deneme04Z_MERVET_0412.controller.Seferler", {
		
        myformatter : formatter,
        
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("Seferler").attachPatternMatched(this.onObjectMatched, this);
		},
		onObjectMatched: function(oEvent) {
			var Imono1 = oEvent.getParameter("arguments").Imono;
			var that = this;
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				/*			that.getView().bindElement({
				path : "/GemiTanimSet('"+Imono1+"')"
			});*/
				//çalışıyor.
				var ObjectPath = that.getOwnerComponent().getModel().createKey("/GemiTanimSet", {
					Imono: Imono1
				});
				// that.getView().bindElement({path : ObjectPath}); bu çalışıyor.
				that.bindView(ObjectPath);
			});
		},
		bindView: function(ObjectPath) {
			this.getView().bindElement({
				path: ObjectPath
			});
		},
		onPressBack: function(oEvent) {
			window.history.back();
		},

/*		convertFaaliyet: function(val) {
			if (val) {
				switch (val) {
					case 'Y':
						return "Yükleme";
					case 'B':
						return "Boşaltma";
				}
			}
			return val;
		}*/

	});

});