//Use a keyboardkey to end data gathering
document.onkeyup = getKey;
//debug indx
var i = 0;
//list for storing all collected data
var trafficDataOverTime = [];
//Used for getting time
var currentTime = new Date();

//Continuous running code
var interval = setInterval(function() {

    //Get the current data
    var trafficSent = $("#bytes_sent").html();
    var trafficRecieved = $("#bytes_rcvd").html();
    var trafficLost = $("#pkt_retransmissions").html();
    var trafficRetransmission = $("#pkt_lost").html();
    var time = currentTime.getTime();
    
    //Push all collected data into a tuple
    var traffic = {sent: trafficSent, recieved: trafficRecieved, lost: trafficLost, retransmitted: trafficRetransmission, time: time};
    
    //Push the tuple onto the list
    trafficDataOverTime.push(traffic);
    
    //DEBUG BELOW
    console.log("Data Recieved: " + trafficDataOverTime[i].sent);
    
    //Move the index
    i++;

}, 1000);


function getKey() {
    // If the users hits 'a', stop loopcode from running.
    if(event.keyCode == 65){
        window.clearInterval(interval); //Stop the loopcode
 
        //Using CSV
        let csvContent = "data:text/csv;charset=utf-8,";

        //header of the file
        let header = "sent" + "," + "recieved" + "," + "retransmitted" + "," + "lost" + "," + "time";
        
        //Append the row, carraige return, then start new line
        csvContent += header + "\r\n";

        //Foreach function to access the list
        trafficDataOverTime.forEach(function(rowArray){

           //Get all expected Tuple data
           var sent = rowArray.sent;
           var recieved = rowArray.recieved;
           var retransmitted = rowArray.retransmitted;
           var lost = rowArray.lost;
           var time = rowArray.time;

           //Addd Row content to the Row
           let row = sent + "," + recieved + "," + retransmitted + "," + lost + "," + time;
            
           //Append the row, carraige return, then start new line
           csvContent += row + "\r\n";
        }); 

        //Start encoding the csv to push out to the client running the script
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "networkData.csv");
        link.innerHTML= "Click Here to download";
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    };
}
