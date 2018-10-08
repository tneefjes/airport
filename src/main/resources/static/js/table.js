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
         location : {name : location}
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

 function fly() {
     console.log("The airplane is departing...");

     // Get values from html.
     var id = $("#idFly").val();
     var destination = $("#destinationFly").val();

     // Create JS object with data.
     var flyAirplane = {
         id : id,
         location : {name: destination}
     };
     console.log(flyAirplane);

     // Convert JS object to JSON.
     var validJsonTable = JSON.stringify(flyAirplane);
     console.log(validJsonTable);

     // Post JSON to endpoint.
     $.ajax({
         url:"api/airplane/update/" + $("#idFly").val(),
         type:"put",
         data: validJsonTable,
         contentType: "application/json",
         success: function(result) {
             // On successful post, reload data to get the added one as well.
             console.log("success put data!");
             getData();
         }
     });
 }

 function refuel() {
      console.log("Refueling the airplane...");

      // Get values from html.
      var id = $("#idRefuel").val();

      // Create JS object with data.
      var refuelAirplane = {
          id : id,
          fuel: 5
      };
      console.log(refuelAirplane);

      // Convert JS object to JSON.
      var validJsonTable = JSON.stringify(refuelAirplane);
      console.log(validJsonTable);

      // Post JSON to endpoint.
      $.ajax({
          url:"api/airplane/update/" + id,
          type:"put",
          data: validJsonTable,
          contentType: "application/json",
          success: function(result) {
              // On successful post, reload data to get the added one as well.
              console.log("success put data!");
              getData();
          }
      });
 }

 $(document).ready(function () {

    // Add airplane modal submit.
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

    // Fly modal submit.
    $("#flyForm").on('submit', function(e) {
        console.log("Submitted fly form");

        fly();
        // Reset modal to hide and no values.
        $('#flyModal').modal('hide');
        $("#idFly").val("");
        $("#destinationFly").val("");
    });

    // Fly modal submit.
    $("#refuelForm").on('submit', function(e) {
        console.log("Submitted refuel form");

        refuel();
        // Reset modal to hide and no values.
        $('#refuelModal').modal('hide');
        $("#idFly").val("");
    });

     // Load table with data format
     $('#table').DataTable({
         columns: [
             { "data": "id" },
             { "data": "manufacturer" },
             { "data": "type" },
             { "data": "fuel" },
             { "data": "location.name" }
         ]
     });
     getData();
 });