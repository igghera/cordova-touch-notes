Ext.define("sencha-cordova.store.Notes", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",

    config: {

        model: "sencha-cordova.model.Note",

        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },

        sorters: [{ property: 'dateCreated', direction: 'DESC'}],

        grouper: {
            sortProperty: "dateCreated",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.dateCreated) {
                    var theDate = record.data.dateCreated;

                    return theDate.getDate() + '/' + (theDate.getMonth() + 1) + '/' + theDate.getFullYear();
                } else {
                    return '';
                }
            }
        }
    }
});