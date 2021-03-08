sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/MessageType",
	"../util/formatter" // çok kullanacağın kütüphaneleri buralara tanımla.
], function(Controller, Filter, JSONModel, MessageBox, MessageToast, MessageType, formatter) {
	"use strict";

	return Controller.extend("com.tosyali.deneme04Z_MERVET_0412.controller.View1", {

		myformatter: formatter,

		onInit: function() {
			var jModel = new JSONModel();
			this.getView().setModel(jModel, "viewModel");

			var mModel = new JSONModel();
			mModel.setData([]);
			this.getView().setModel(mModel, "messages");
		},

		openGemilerSh: function(oEvent) {

			if (!this.SeferGemiShDiaolog) {
				this.SeferGemiShDiaolog = sap.ui.xmlfragment("com.tosyali.deneme04Z_MERVET_0412.view.fragments.sefergemi", this);
				this.getView().addDependent(this.SeferGemiShDiaolog);
			}
			this.SeferGemiShDiaolog.open();
		},

		HandleSeferGemiSearchHelp: function(oEvent) {
			var val = oEvent.getParameter("value");
			var myfilter = new Filter("LANDX", sap.ui.model.FilterOperator.Contains, val);
			oEvent.getSource().getBinding("items").filter([myfilter]);
		},

		HandleSeferGemiHelpClose: function(oEvent) {
			var item = oEvent.getParameter("selectedItem");
			if (item) {
				this.byId("ImonoId").setValue(item.getTitle());
			} // this.ToplantiHelpDialog.close();
		},
		onSearch: function(oEvent) {
			this.getView().getModel().setProperty("/busy", true);

			var ulkeKod = this.byId("ImonoId").getValue();
			ulkeKod = ulkeKod.split("-")[0];
			var myfilters = [];
			if (ulkeKod.length > 0) {
				myfilters.push(new Filter("Bayrak", sap.ui.model.FilterOperator.EQ, ulkeKod));
			}
			var that = this;
			var jModel = new JSONModel();
			var msg = that.getView().getModel("messages");
			var messages = [];

			this.getOwnerComponent().getModel().read("/GemiTanimSet", {
				filters: myfilters,
				success: function(data) {
					this.getView().getModel().setProperty("/busy", false);
					jModel.setData(data.results);
					that.getView().setModel(jModel, "bayrakUlkeKod");
					if (data.results.length == 0) {
						// MessageBox.error("Hiç Kayıt bulunamadı...");
						messages.push({
							type: MessageType.Warning,
							title: "Kayıt Bulunamadı",
							additionalText: "Hata Mevcut"

						});
						messages.push({
							type: MessageType.Error,
							title: "Kayıt Bulunamadı"

						});

						msg.setData(messages);
						msg.setProperty("/numberOfMessages", messages.length);
						this.getView().setModel(msg, "messages");

					} else {
						MessageToast.show(data.results.length + "Kayıt var");
						msg.setData([]);
						msg.setProperty("/numberOfMessages", 0);
						that.getView().setModel(msg, "messages");
					}

				}.bind(this),

				error: function(err) {
					this.getView().getModel().setProperty("/busy", false);
					MessageBox.error(JSON.parse(err.responseText).error.message.value);
				}

			});

		},

		onPressImono: function(oEvent) {
			var imono = oEvent.getSource().getTitle();
			this.getOwnerComponent().getRouter().navTo("Seferler", {
				Imono: imono
			});

		},
		onPressMessagePopover: function(oEvent) {
			if (!this._oMessagePopover) {
				this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),
					"com.tosyali.deneme04Z_MERVET_0412.view.fragments.MessagePopOver", this);
				this.getView().addDependent(this._oMessagePopover);
			}
			this._oMessagePopover.openBy(oEvent.getSource());
		}

	});
});