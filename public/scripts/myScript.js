
//Om hier ook de colors te kunnen gebruiken 
function kleur(r,g,b,bright){
    this.r = r;
    this.g = g;
    this.b = b;
    this.brightness = bright;
}

var mqttHost = "m23.cloudmqtt.com";
var mqttPort = 34309;

var socket = io();

$(document).ready(function(){

    //Ontvangen en zenden  via soket .Io   

    $('#verzendForm').submit(function(e){
        e.preventDefault(); // prevents page reloading

        var teverzendenOject = {
            "tekst" : "Je ne porte pas une Jsonderbroek"
        }        
        
        socket.emit('onderwerpNaarServer', teverzendenOject);     
    });

    //Ontvangen van socket bericht
    socket.on('onderwerpNaarClient', function(msg){          
        console.log("rééééééééééééééééééé");
        $("#binnenKomendeSocket").text(msg.tekst);
    });



    
    $('.chkBox').on('change', function() {
        $('.chkBox').not(this).prop('checked', false);  
    });
    
    
    var clientId = Math.floor(Math.random()* 10001); 
    client = new Paho.MQTT.Client(mqttHost,Number(mqttPort),String(clientId));

    

    client.connect(
        {
            //Onconnected is een functie
            onSuccess:onConnected,
            userName:"korneel",
            password:"admin",
            useSSL:true
        }
    );
   



    function Verzend_Mqtt(){
        Maakjson();
        var JsonString = JSON.stringify(pixelFrame,);
        message = new Paho.MQTT.Message(
            JsonString
            );
            message.destinationName = "PixelFrame";
            client.send(message);
    };


    function onConnected()
    {
        console.log("onConnected");
        //Connected tonen wanneer mqtt geconecteerd is
        $("#connect").html("CONNECTED to Mqtt-broker").addClass("text-succes");
        
        client.subscribe("pixelFrame",{onSuccess:OnSubscribed});
        $("#btnVerstuur").prop("disabled",false);

    }

    function OnSubscribed(invocationContext)
    {
        console.log("onScubscribed");
    }   

    
});