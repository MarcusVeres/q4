'use strict';

(function()
{
    // 
    console.log( "all systems go" );

    // parent object to hold all of our stuff
    var expo = {

        settings : {} ,

        data : {
            contacts : []
        } ,

        loadContents : function()
        {
            helper.loadJson( '/static/data/contacts.json' , function( contacts )
            {
                console.log( contacts );

                // assign to local data object 
                expo.data.contacts = contacts;

                // populate vue 
                var example1 = new Vue({
                    el: '#example-1',
                    data: {
                        items : contacts
                    }
                })

            })
        },

        processContact : function()
        {   
            console.log( "processing contact" );
            var newContact = {
                firstName : "Bill", 
                lastName : "Burr", 
            };
            expo.addContact( newContact );
        },

        addContact : function( newContact )
        {
            expo.data.contacts.push( newContact );
            console.log( expo.data.contacts );
        },

        removeContact : function()
        {
            // code goes here
        },

        updateDataFile : function()
        {
            // code goes here
        },

        bindButtons : function()
        {
            console.log( "binding buttons" );
            document.getElementById( 'add-contact' ).addEventListener( 'click' , expo.processContact );
        },

        init : function()
        {
            expo.bindButtons();
            expo.loadContents();
        }

    };

    // start the show
    expo.init();

    // bind to the window
    window.expo = window.expo || expo;

    // we're done here
    return expo;

})();


(function()
{

    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })

})();

