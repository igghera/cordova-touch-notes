Ext.define("sencha-cordova.store.Notes", {
    extend: "Ext.data.Store",

    requires: "sencha-cordova.proxy.CordovaStorageProxy",

    config: {

        //autoLoad: true,

        model: "sencha-cordova.model.Note",

        proxy: {
            type: 'cordovastorageproxy'
        },

        sorters: [{ property: 'dateCreated', direction: 'DESC'}],

        grouper: {
            sortProperty: "dateCreated",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.dateCreated) {
                    var theDate = new Date(record.data.dateCreated);
                    return theDate.getDate() + '/' + (theDate.getMonth() + 1) + '/' + theDate.getFullYear();
                } else {
                    return '';
                }
            }
        },

        listeners: {
            addrecords: function(store, records, eOpts) {
                console.log('[Notes store] addrecords ');
                console.dir(records);
            },

            load: function(theStore, records, successful, operation) {
                console.log('[Notes store] load success? ' + successful);
                console.dir(operation);
            },

            refresh: function(theStore, data) {
                console.log('[Notes store] refresh - this store:');
                console.dir(theStore);
                console.log('data:');
                console.log(data);
            }
        }
    }
});