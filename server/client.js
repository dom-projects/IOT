let socket = io();

btnLedOn.addEventListener("click", () => {
    if(confirm('Quieres ejecutar la secuencia Led?')){
        socket.emit('ledValue', {
            ledValue: true
        });
    }
});

btnServoOn.addEventListener("click", () => {
    if(confirm('Quieres ejecutar la secuencia Servo?')){
        socket.emit('servoValue', {
            servoValue: true
        });
    }
});
