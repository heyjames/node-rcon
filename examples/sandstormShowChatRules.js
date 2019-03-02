var Rcon = require('../node-rcon').newHandle;
var rcon = new Rcon();
let connTimer;
let connTimeout = 6000;

let ip = "12.34.567.890";
let port = 12345;
let rconPassword = "pa$$w0rd"

start();

function start() {
  startConnTimer();
  rcon.connect(ip, port, rconPassword, onConnected);
}

// Try connecting for 5 seconds.
function startConnTimer() {
  connTimer = setTimeout( () => {
    console.log("Connection timed out. Server didn't respond.");
    process.exit(0);
  }, connTimeout);
}

function onConnected(err, response){
  clearTimeout(connTimer);

  if (err) { console.error(err); return; }
  console.log("Connected.");

  const guidelines = "say\
  ____________________Rules______________________\
  No rushing. Clear bots up to and around obj. \
  Wait off the obj and cap ONLY when team is ready. \
  Don't step into firing lanes. \
  Website (TBA) for detailed guidelines. \
  ";

  const test = "say Test msg.";

  rcon.sendCommand(guidelines, function(err, response){
    if (err) { console.log(err); return; }

    console.log("Guidelines posted in chat.");
    
    // rcon.end() doesn't work, so this is used.
    process.exit(0);
  });
  
  rcon.end();
}
