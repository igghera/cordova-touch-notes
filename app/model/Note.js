Ext.define('sencha-cordova.model.Note', {
    extend: 'Ext.data.Model',

    requires: "sencha-cordova.proxy.CordovaStorageProxy",

    config: {

        idProperty: 'id',

        proxy: {
            type: 'cordovastorageproxy'
        },

        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'narrative', type: 'string' }
        ],

        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
        ]
    }
});