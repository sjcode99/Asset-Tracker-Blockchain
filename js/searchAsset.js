function searchAsset() {
  console.log("hello");
  $("#loading").show();
  let id = parseInt($('input[name="id"]').val());
  // console.log(id);

  // search in the smart contract
  AssetTrackerContract.methods.getAsset(id).call((error, response) => {
    if (error) console.log(error);
    else {
      // console.log(response);
      if (response[1] !== "") {
        // asset is found
        let result =
          '<br><h2 style="color: #218f76;">Asset found</h2>' +
          "<strong>Batch No: </strong>" +
          response[0] +
          "<br>" +
          "<strong>Name: </strong>" +
          response[1] +
          "<br>" +
          "<strong>Description: </strong>" +
          response[2] +
          "<br>" +
          "<strong>Manufacturer: </strong>" +
          response[3] +
          "<br>" +
          "<strong>Owner: </strong>" +
          response[4] +
          "<br>" +
          "<strong>Current Status: </strong>" +
          response[5] +
          "<br>";

        $("#searchResult").html("");
        $("#loading").hide();
        $("#searchResult").append(result);

        // show the status history
        $("#statusHistory").show();
        // asset history
        assetHistory(id);
      } else {
        // asset is not found
        let result = '<br><h2 style="color: red;">Asset Not found</h2>';
        $("#searchResult").html("");
        $("#loading").hide();
        $("#searchResult").append(result);
      }
    }
  });
}

function assetHistory(id) {
  AssetTrackerContract.methods.AssetStore(id).call((error, response) => {
    if (error) console.log(error);
    else {
      // console.log(response);
      let statusCount = parseInt(response[5]);
      for (let i = statusCount; i >= 1; i--) {
        AssetTrackerContract.methods
          .getStatus(id, i)
          .call((error, response) => {
            if (error) console.log(error);
            else {
              console.log(response);
              let date = new Date(parseInt(response[0]) * 1000).toLocaleString();
              let event =
                '<br><h2>Status History: </h2>' +
                '<strong>Date: </strong>' +
                date +
                "<br>" +
                "<strong>Owner: </strong>" +
                response[2] +
                "<br>" +
                "<strong>Count: </strong>" +
                response[1] +
                "<br>" +
                "<br>";
              $("#statusHistory").append(event);
            }
          });
      }
    }
  });
}
