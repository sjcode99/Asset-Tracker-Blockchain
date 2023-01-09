function searchAsset() {
  // clear previous search result
  $("#searchResult").html("");

  //   now search the asset
  assetId = parseInt($('input[name="id"]').val());
  AssetTrackerContract.methods.getAsset(assetId).call((error, response) => {
    if (error) console.log(error);
    else {
      // if found
      console.log(response);
      if (response[1] !== "") {

        AssetTrackerContract.methods
        .getStatus(assetId, response[4])
        .call((error, statusResponse) => { 
          if (error) console.log(error);
          else { 
            console.log(statusResponse);
            let result = `<div class="timeline-step">
                    <h3 class="font-weight-bold mt-3">Asset Found</h3>
                    <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                      data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                      <p class="h6 text-muted mb-1 mb-lg-2"><strong>Name:</strong> ${response[1]}</p>
                      <p class="h6 text-muted mb-1 mb-lg-2" ><strong>Owner:</strong> ${statusResponse[2]}</p>
                      <p class="h6 text-muted mb-1 mb-lg-2" ><strong>Current Status:</strong> ${statusResponse[1]}</p>
                      <p class="h6 text-muted mb-1 mb-lg-2"><strong>Current Location:</strong> lat: ${statusResponse[3]}, long: ${statusResponse[4]}</p>
                    </div>
                  </div>`
            
            $("#searchResult").append(result);
            $("#transferFrom").show();
          }
         })

      } else {
        //   if not found
        let content = '<h4 style="color: red;">Asset Not Found</h4>';
        $("#searchResult").append(content);
        $("#transferFrom").hide();
      }
    }
  });
}

// transfer asset function
function transferAsset() {
  let assetId = parseInt($('input[name="id"]').val());
  let newOwner = $('input[name="newOwner"]').val();
  let newStatus = $('#newStatus option:selected').text();
  let latitude = $('input[name="newLatitude"]').val();
  let longitude = $('input[name="newLongitude"]').val();

  console.log(assetId, newOwner, newStatus);
  // transfer the asset
  AssetTrackerContract.methods
    .transferAsset(assetId, newOwner, newStatus, latitude, longitude)
    .send({ from: fromAddress, gas: '3000000' })
    .then((res) => {
      if(res.status === true) {
        alert('success');
      }
      // console.log(res);
    })
    .catch((err) => console.log(err));
}

// get location coordinates function
function getCoordinates(){
  // let latText = $('')
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    // console.log(position);

    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
    $('input[name="newLongitude"]').val(long);
    $('input[name="newLatitude"]').val(lat);
  });
}