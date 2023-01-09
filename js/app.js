var assetCount = 0;
$(document).ready(() => {
  // execut this function on page load
  renderPageContent();
});
function renderPageContent() {
  // console.log('entered');
  // console.log(AssetTrackerContract);
  
  AssetTrackerContract.methods.getAssetCount().call((error, response) => {
    if (error) console.log(error);
    else {
      console.log(response);
      assetCount = response;
      $("#count").html("Total " + response + " Article(s) found");
      renderTable();
    }
  });

  // render landing page table
  function renderTable() {
    for (let i = 1; i <= parseInt(assetCount); i++) {
      AssetTrackerContract.methods.getAsset(i).call((error, response) => {
        if (error) console.log(error);
        else {
          // getCurrentStatus(i);
          AssetTrackerContract.methods
          .getStatus(i, response[4])
          .call((error, statusResponse) => {

            console.log(statusResponse);
            let row =
              '<tr><th scope="row">' +
              i +
              "</th>" +
              "<td>" +
              response[0] +
              "</td>" +
              "<td>" +
              response[1] +
              "</td>" +
              "<td>" +
              response[2] +
              "</td>" +
              "<td>" +
              response[3] +
              "</td>" +
              "<td>" +
              statusResponse[2] +
              "</td>" +
              "<td>" +
              statusResponse[1] +
              "</td></tr>";
              // "<td>" +
              // response[6] +
              // "</td></tr>";
              // "<td>" +
              // response[7] +
              // "</td></tr>";
  
            $("tbody").append(row);
           });

        }
      });
    }
    $("#loading").hide();
  }
}

// new asset create function
function createNewAsset() {
  let batchNo = parseInt($('input[name="batchNo"]').val());
  let name = $('input[name="name"]').val();
  let desc = $('input[name="desc"]').val();
  let manufacturer = $('input[name="manufacturer"]').val();
  let owner = $('input[name="owner"]').val();
  let status = $('#status option:selected').text();
  let latitude = $('input[name="latitude"]').val();
  let longitude = $('input[name="longitude"]').val();

  // send these values to the smart contract
  AssetTrackerContract.methods
    .createAsset(batchNo, name, desc, manufacturer, owner, status, latitude, longitude)
    .send({ from: fromAddress, gas: '3000000' })
    .then(result => {
      if (result.status === true) {
        alert("Success");
        // console.log(result);
        $("#loading").show();
        $("tbody").html("");

        // render the table again
        renderPageContent();
        // clear the form
        $('input[name="batchNo"]').val("");
        $('input[name="name"]').val("");
        $('input[name="desc"]').val("");
        $('input[name="manufacturer"]').val("");
        $('input[name="owner"]').val("");
        $('#status').val("");
        $('input[name="latitude"]').val("");
        $('input[name="longitude"]').val("");
      }
    }).catch(err => {
      console.log("app.js");
      console.log(err);
    });
  $("#exampleModal").modal("hide");
}

// Listen for events
// reload the ledger after any event

AssetTrackerContract.events.AssetTransfer((error, result) => {
  if (error) console.log(error);
  else {
    $("#count").html("");
    $("tbody").html("");
    renderPageContent();
  }
});

// function onLogin() {
//   console.log('aaya');
//   console.log(fromAddress);
// }

// get location coordinates function
function getCoordinates(){
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    // console.log(position);

    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
    $('input[name="longitude"]').val(long);
    $('input[name="latitude"]').val(lat);
  });
}