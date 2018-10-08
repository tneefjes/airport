 function getData() {
    console.log("getting data...");

    // Get the data from endpoint.
    $.ajax({
        url:"api/airplane",
        type:"get",
        success: function(result) {
            // On successful get, reload the data table with new data.
            console.log("This is the data: " + result);
            $('#table').DataTable().clear();
            $('#table').DataTable().rows.add(result);
            $('#table').DataTable().columns.adjust().draw();
        }
    });
 }

 function postData() {
     console.log("posting data...");

     // Get values from html.
     var manufacturer = $("#manufacturerAdd").val();
     var type = $("#typeAdd").val();
     var location = $("#locationAdd").val();

     // Create JS object with data.
     var newAirplane = {
         manufacturer : manufacturer,
         type : type,
         location : location
     };

     console.log(newAirplane);

     // Convert JS object to JSON.
     var validJsonTable = JSON.stringify(newAirplane);
     console.log(validJsonTable);

     // Post JSON to endpoint.
     $.ajax({
         url:"http://localhost:8080/api/airplane",
         type:"post",
         data: validJsonTable,
         contentType: "application/json",
         success: function(result) {
             // On successful post, reload data to get the added one as well.
             console.log("success post data!");
             getData();
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert("Error!!!");
         }
     });
 }
 
 $(document).ready(function () {

    // Add table modal submit.
    $("#newAirplaneForm").on('submit', function(e) {
        console.log("Submitted new airplane form");
        // Post the data from the modal.
        postData();
        // Reset modal to hide and no values.
        $('#newAirplaneModal').modal('hide');
        $("#manufacturerAdd").val("");
        $("#typeAdd").val("");
        $("#locationAdd").val("");
    });

     //load table with data format
     $('#table').DataTable({
         columns: [
             { "data": "id" },
             { "data": "manufacturer" },
             { "data": "type" },
             { "data": "fuel" },
             { "data": "location" }
         ]
     });
     getData();
 });