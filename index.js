var { Board , Servo, Led } = require("johnny-five");
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

var board = new Board();

app.use(express.static(__dirname + '/server'));

server.listen(3000, () => {
    console.log('server listening on port:', 3000);
})


function turnLedOn(onOrOff) {
    const led = new Led(13);
    if(onOrOff)
    led.blink();
    board.wait(3000, () => {
        led.stop().off();
    });
}

function turnServoOn(onOrOff){
 const servo = new Servo({
    pin:10,
    type: "continuous"
});

if(onOrOff)
servo.ccw(1);
servo.center();
servo.sweep();
board.wait(3000, () => {
    servo.sweep();
   board.wait(3000, () => {
       servo.stop();
       servo.center();
   })
})

}

board.on("ready", () => {
 console.log('Board is ready');

 io.on("connection", socketIO => {
    
    socketIO.on('ledValue', data => {
        turnLedOn(data);
    });

    socketIO.on('servoValue', data => {
        turnServoOn(data);
    });

 });

});