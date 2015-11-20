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

force.login(showContacts, function(error) {
    alert('Authentication failed: ' + error);
});