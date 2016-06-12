sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"opensap/myapp/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"

	],
	function(Controller, MessageToast, formatter, Filter, FilterOperator) {
		"use strict";
		Controller.extend("opensap.myapp.controller.HasanApp", {
			formatter: formatter,
			
			onShowHello: function() {
				// read msg from i18n model
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
				var sMsg = oBundle.getText("helloMsg", [sRecipient]);

				// show message
				MessageToast.show(sMsg);
			},

			onItemSelected: function(oEvent) {
				var oSelectedItem = oEvent.getSource();
				var oContext = oSelectedItem.getBindingContext();
				var sPath = oContext.getPath();
				var oProductDetailPanel = this.byId("productDetailsPanel");

				oProductDetailPanel.bindElement({
					path: sPath
				});
				this.byId("productsList").setVisible(false);
				this.byId("productDetailsPanel").setVisible(true);

				// var oNavigation = new sap.ui.ux3.NavigationItem("productDetailsPanel",);
			},

			onDetailsSelect: function() {

				this.byId("productsList").setVisible(true);
				this.byId("productDetailsPanel").setVisible(false);

				// var oNavigation = new sap.ui.ux3.NavigationItem("productDetailsPanel",);
			},

			onFilterProducts: function(oEvent) {

				// build filter array
				var aFilter = [],
					sQuery = oEvent.getParameter("query"),
					// retrieve list control
					oList = this.getView().byId("productsList"),
					// get binding for aggregation 'items'
					oBinding = oList.getBinding("items");

				if (sQuery) {
					aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
				}
				// apply filter. an empty filter array simply removes the filter
				// which will make all entries visible again
				oBinding.filter(aFilter);
			}

		});
	});