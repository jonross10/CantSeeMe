'use strict';

const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeRichText = Alexa.utils.TextUtils.makeRichText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

var url = "https://s3.amazonaws.com/voice-tickets.com/HIS+NAME+IS+JOHN+CENA.mp3";

const handlers = {
    'LaunchRequest': function () {
        let builder = new Alexa.templateBuilders.BodyTemplate1Builder();
        let cantSeeMe = builder.setTitle('You Can\'t See Me')
            .setBackgroundImage(makeImage('https://pbs.twimg.com/media/DIqNW7hXkAAuC-m.jpg'))
            .setTextContent(makePlainText('You Can\'t See Me'))
            .build();
            
        this.response.speak('The time is')
                    .audioPlayerPlay('REPLACE_ALL', url, url, null, 0).renderTemplate(cantSeeMe);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "The time is "+getTime());
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "The time is "+getTime());
    },
    'Unhandled': function () {
        this.emit(':tell', "The time is "+getTime());

    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function getTime(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var amOrPm = "AM";
    var extraZero = "";
    hours=hours-4;
    if(hours>12){
        hours=hours-12;
        amOrPm="PM";
    } else if(hours==12){
        amOrPm="PM";
    }
    if(minutes<10){
        extraZero = "0";
    }
    return hours+":"+extraZero+minutes+" "+amOrPm;
}

