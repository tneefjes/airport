function getDestinations() {
    console.log("getting data...");

    // Get the data from endpoint.
    $.ajax({
        url:"api/airport",
        type:"get",
        success: function(result) {
            // On successful get, reload the data table with new data.
            console.log("This is the data: " + result);
            $('#destinations').DataTable().clear();
            $('#destinations').DataTable().rows.add(result);
            $('#destinations').DataTable().columns.adjust().draw();
        }
    });
 }

// Should be done in a central file.
 $(document).ready(function () {
      console.log("Ik voer dit uit");
      // Load destinations with data format
      $('#destinations').DataTable({
          columns: [
              { "data": "id" },
              { "data": "name" }
          ]
      });
      getDestinations();
 });