Ext.define('sencha-cordova.proxy.CordovaStorageProxy', {

    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.cordovastorageproxy',

    db: null,           //here we store a reference to our db
    savedNotes: [],     //here we store the notes we extract from our db

    read: function(operation, callback, scope) {

        console.log('[CordovaStorageProxy] read');

        var thisProxy = this;

        //init db

        this.db = window.openDatabase("Notes", "1.0", "Saved Notes", 200000);
        this.db.transaction(

            function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS NOTES (id, title, narrative, dateCreated)");
                tx.executeSql(
                    "SELECT * FROM NOTES",
                    [],
                    function(tx, results) {
                        thisProxy.onSelectSuccess(tx, results, operation, callback, scope);
                    },
                    thisProxy.onDbError
                );
            },
            thisProxy.onDbError,
            thisProxy.onDbSuccess
        );
    },

    onSelectSuccess: function(tx, results, operation, callback, scope) {

        var thisProxy = this;

        for(var i = 0, len = results.rows.length; i < len; i++) {
            thisProxy.savedNotes.push(results.rows.item(i));
        }

        var myResultSet = new Ext.data.ResultSet({
            records: thisProxy.savedNotes,
            total  : thisProxy.savedNotes.length,
            loaded : true
        });

        operation.setResultSet(myResultSet);

        //announce success
        operation.setSuccessful();
        operation.setCompleted();

        //finish with callback
        if (typeof callback == 'function') {
            Ext.callback(callback, scope || thisProxy, [operation]);
        }
    },

    update: function(operation, callback, scope) {

        console.log('[CordovaStorageProxy] update');

        operation.setStarted();

        //save data in storage via PhoneGap

        var thisProxy = this,
            record2add = operation._records[0].data;

        this.db.transaction(

            function(tx) {
                tx.executeSql("INSERT INTO NOTES (id, title, narrative, dateCreated) VALUES (?, ?, ?, ?)",[record2add.id, record2add.title, record2add.narrative, record2add.dateCreated]);
            },

            thisProxy.onDbError,
            thisProxy.onDbSuccess
        );

        //announce success
        operation.setCompleted();
        operation.setSuccessful();

        //finish with callback
        if (typeof callback == 'function') {
            Ext.callback(callback, scope || thisProxy, [operation]);
        }
    },

    destroy: function(operation, callback, scope) {
        console.log('[CordovaStorageProxy] destroy');

        var records = operation.getRecords(),
            thisProxy = this;

        operation.setStarted();

        for(var i = 0; i < records.length; i++) {
            console.log('[myproxy] deleting ' + records[i].data.id);

            var idToDelete = records[i].data.id;

            this.db.transaction(

                function(tx) {
                    tx.executeSql("DELETE FROM NOTES WHERE id = ?", [idToDelete]);
                },

                thisProxy.onDbError,
                thisProxy.onDbSuccess
            );
        }

        operation.setCompleted();
        operation.setSuccessful();

        //finish with callback
        if (typeof callback == 'function') {
            Ext.callback(callback, scope || thisProxy, [operation]);
        }
    },

    create: function(operation, callback, scope) {
        console.log('[CordovaStorageProxy] create');
    },

     onDbError: function(error) {
        console.log("Database error " + error.message);
    },

    onDbSuccess: function(tx, results) {
        console.log('Database call successful');
    }
});