$(document).ready(function(){
    
    
    
    $.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DASTY&outputsize=compact&apikey=4MFUKSOU61LFNKCS',  // url
        function (data, textStatus, jqXHR) {  // success callback
            console.log(data);
            
            var tsd = data["Time Series (Daily)"];
            var din = [];
            var open = [];
            var high = [];
            var low = [];
            var close = [];
            
       
            var i = 0;
            for(var key in tsd){
                if(i < 15){
                    i = i + 1;
                    din.push(String(key));
                    open.push(tsd[key]["1. open"]);
                    high.push(tsd[key]["2. high"]);
                    low.push(tsd[key]["3. low"]);
                    close.push(tsd[key]["4. close"]);
            }
        }
       
        open.reverse();
        close.reverse();
        high.reverse();
        low.reverse();
       
       
        
//==================================DASSAULT GRAPH==========================================================//    
        
        $(".ds").click(function(){
            var n = $(this).attr("name");
            var g = "#" + n;
            var s = 'input:checkbox[name='+ n +']';
            var f = $(s).is(':checked');
            if (f == false){
                
                dsRemover(n);
            } else if (f == true){
               
                dsAdder(n);
            }
        });
        
        function dsAdder(checkbox){
            var label = checkbox;
            var adder = {
                label: label,
                borderColor: 'rgb(153, 150, 255)',
                data: [],
            }
            if(checkbox == 'high'){
                adder.borderColor = 'rgb(0, 0, 102)';
            } else if (checkbox == 'low'){
                adder.borderColor = 'rgb(153, 150, 255)';
            } else if(checkbox == 'open'){
                adder.borderColor = 'rgb(102, 0, 102)';
            } else if(checkbox == 'close'){
                adder.borderColor = 'rgb(255, 150, 255)';
            }
            
            var place = adder.data;
            g1 = eval(checkbox);
            g1.forEach((n) => {
                place.push(n);
            });
            
            chart.data.datasets.push(adder);
            chart.update();
        }
        
        function dsRemover(checkbox){
            var n = chart.data.datasets.length;
            var imp;
            for (var i = 0; i < n; i++ ){
                if (chart.data.datasets[i].label == checkbox ){
                    imp = i;
                    break;
                }
            }
            
            chart.data.datasets.splice(imp,1);
            chart.update();
            
        }
//==================================Finish  DASSAULT GRAPH ===============================================//
        
        
//====================================COMPAROMETER =================================================//
       $("#check").click(function(){
            var n = $(this).attr("name");
            var g = "#" + n;
            var s = 'input:radio[name='+ n +']';
            var f = $(s).is(':checked');
            if (f == true){
                $(".upper-controls").addClass("freeze");
                chart.options.title.text = "Comparison Chart";
                chart.data.datasets = [];
                chart.data.datasets.push(main.D);
                chart.update();
            }
       }) 
        
        
        
//=====================================Graph Starts here==========================================//
//================================================================================================//
        
   
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: din,
            datasets: [       
            {
            label: "high",
            borderColor: 'rgb(0, 0, 102)',
            data: high,   
            }]
        },  

        // Configuration options go here
            options: {
                scales: {
                  xAxes: [{
                    ticks: {
                      autoSkip: false,
                      maxRotation: 70,
                      minRotation: 50
                    }
                }]
                },
                title: {
                    display: true,
                    text: 'Dassault Systemes',
                    position: "bottom",
                    fontSize: 20
                }
            }
            //Options ends here===================
        }); // Chart finish here
    
    
        //===========================Variables====================================//
        //========================================================================//
            
        //Siemens below
           var openS = [];
            var highS = [];
            var lowS = [];
            var closeS = [];
        
        //PTC below    
            var openP = [];
            var highP = [];
            var lowP = [];
            var closeP = [];
        
        //Ansys below//
            var openA = [];
            var highA = [];
            var lowA = [];
            var closeA = [];
        
        // Autodesk below//
            var openAk = [];
            var highAk = [];
            var lowAk = [];
            var closeAk = [];
        
        // Big object
            var main = {
                D: {
                    label: "Dassault",
                    borderColor: 'rgb(0, 0, 122)',
                    data: open,   
                },
                S: {
                    label: "Siemens",
                    borderColor: 'rgb(0, 153, 152)',
                    data: openS,   
                },
                P: {
                    label: "PTC",
                    borderColor: 'rgb(0, 51, 51)',
                    data: openP,   
                },
                A: {
                    label: "Ansys",
                    borderColor: 'rgb(220, 210, 40)',
                    data: openA,   
                },
                Ak: {
                    label: "Autodesk",
                    borderColor: 'rgb(102, 178, 222)',
                    data: openAk,   
                }
            }
            
        //===========================Variables end==================================//
        
        
        $.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NASDAQ:SIEGY&outputsize=compact&apikey=4MFUKSOU61LFNKCS',  // url
        function (dataS, textStatus, jqXHR){
            console.log(dataS);
            var tsdS = dataS["Time Series (Daily)"];
       
            var i = 0;
            for(var key in tsdS){
                if(i < 15){
                    i = i + 1;
                    openS.push(tsdS[key]["1. open"]);
                    highS.push(tsdS[key]["2. high"]);
                    lowS.push(tsdS[key]["3. low"]);
                    closeS.push(tsdS[key]["4. close"]);
            }
        }
       
        openS.reverse();
        closeS.reverse();
        highS.reverse();
        lowS.reverse();
            
        });  // End of GET for Seimens
        
        $.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NASDAQ:PTC&outputsize=compact&apikey=4MFUKSOU61LFNKCS',  // url
        function (dataP, textStatus, jqXHR){
            console.log(dataP);
            var tsdP = dataP["Time Series (Daily)"];
       
            var i = 0;
            for(var key in tsdP){
                if(i < 15){
                    i = i + 1;
                    openP.push(tsdP[key]["1. open"]);
                    highP.push(tsdP[key]["2. high"]);
                    lowP.push(tsdP[key]["3. low"]);
                    closeP.push(tsdP[key]["4. close"]);
            }
        }
       
        openP.reverse();
        closeP.reverse();
        highP.reverse();
        lowP.reverse();
            
        });  // End of GET for PTC
        
        $.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NASDAQ:ADSK&outputsize=compact&apikey=4MFUKSOU61LFNKCS',  // url
        function (dataAk, textStatus, jqXHR){
            console.log(dataAk);
            var tsdAk = dataAk["Time Series (Daily)"];
       
            var i = 0;
            for(var key in tsdAk){
                if(i < 15){
                    i = i + 1;
                    openAk.push(tsdAk[key]["1. open"]);
                    highAk.push(tsdAk[key]["2. high"]);
                    lowAk.push(tsdAk[key]["3. low"]);
                    closeAk.push(tsdAk[key]["4. close"]);
            }
        }
       
        openAk.reverse();
        closeAk.reverse();
        highAk.reverse();
        lowAk.reverse();
            
        });  // End of GET for Autodesk
        
        
        $.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NASDAQ:ANSS&outputsize=compact&apikey=4MFUKSOU61LFNKCS',  // url
        function (dataA, textStatus, jqXHR){
            console.log(dataA);
            var tsdA = dataA["Time Series (Daily)"];
       
            var i = 0;
            for(var key in tsdA){
                if(i < 15){
                    i = i + 1;
                    openA.push(tsdA[key]["1. open"]);
                    highA.push(tsdA[key]["2. high"]);
                    lowA.push(tsdA[key]["3. low"]);
                    closeA.push(tsdA[key]["4. close"]);
            }
        }
       
        openA.reverse();
        closeA.reverse();
        highA.reverse();
        lowA.reverse();
            
        });  // End of GET for Ansys
  

    //========================================= Control structure begins here==================================//
    //=========================================================================================================//
        
        
    }); //Ajax call finish here
    
  

    
});// finish ready