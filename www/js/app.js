(function () {

    "use strict";

    function authenticate(successHandler, errorHandler) {

        // Get reference to Salesforce OAuth plugin
        var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");

        // Authenticate
        oauthPlugin.getAuthCredentials(
            function (creds) {
                // Instantiate ForceTK client
                var forceClient = new forcetk.Client();
                forceClient.setSessionToken(creds.accessToken, "v31.0", creds.instanceUrl);
                if (successHandler) successHandler(forceClient);
            },
            function (error) {
                if (errorHandler) errorHandler(error);
            }
        );
    }

    function showContacts(forceClient) {

        forceClient.query('SELECT Name, Phone FROM Contact LIMIT 20',
            function(data) {
                var contacts = data.records,
                    html = '';
                for (var i=0; i < contacts.length; i++) {
                    html += ('<li class="table-view-cell"><div class="media-body">' + contacts[i].Name + '<p>' + contacts[i].Phone + '</p></div></li>');
                }
                document.querySelector('#contacts').innerHTML = html;
            },
            function(error) {
                alert("Can't load contacts: " + error);
            });

    }

    // Wait for Cordova to be fully initialized
    document.addEventListener("deviceready", function() {
        authenticate(showContacts, function(error) {
            alert('Authentication failed: ' + error);
        });
    }, false);

})();