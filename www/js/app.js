function authenticate(successHandler, errorHandler) {

    // Get reference to Salesforce OAuth plugin
    var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");

    // Authenticate
    oauthPlugin.getAuthCredentials(
        function (creds) {
            console.log(JSON.stringify(creds));
            // Initialize ForceJS
            force.init({accessToken: creds.accessToken, instanceURL: creds.instanceUrl, refreshToken: creds.refreshToken});
            if (successHandler) successHandler();
        },
        function (error) {
            console.log(error);
            if (errorHandler) errorHandler(error);
        }
    );
}

function showContacts() {
    force.query('SELECT Name, Phone FROM Contact LIMIT 20',
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
document.addEventListener("deviceready",
    function() {
        authenticate(showContacts, function(error) {
            alert('Authentication failed: ' + error);
        });
    },
    false);