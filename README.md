# Meetup js

a node.js interface for the meetup.com api


## usage

    var Meetup = require('meetup')
    var mup = new Meetup({...})
    mup.stream('/2/rsvps', function(stream){
      stream
        .on('data', function(item){
          console.log(item)
        }).on('error', function(e) {
           console.log("error! " + e)
           stream.destory()
        });
    });    
