$("#loading").hide();
function searchAsset() {
  // location.reload();
  $("#loading").show();
  let id = parseInt($('input[name="id"]').val());
  // console.log(id);

  // search in the smart contract
  if (!id) '<br><h2 style="color: #218f76;">Please enter a field</h2>';
  else {
    AssetTrackerContract.methods.getAsset(id).call((error, response) => {
      if (error) console.log(error);
      else {
        console.log(response);
        if (response[1] !== "") {
          // asset is found
          AssetTrackerContract.methods
            .getStatus(id, response[4])
            .call((error, statusResponse) => {
              if (error) console.log(error);
              else {
                $("#statusTimeline").html("");
                // console.log(response);
                let result = `<div class="timeline-step">
                <h3 class="font-weight-bold mt-3">Asset Details</h3>
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                  <p class="h6 text-muted mb-1 mb-lg-2"><strong>Batch No:</strong>${response[0]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2"><strong>Name:</strong> ${response[1]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2"><strong>Description:</strong> ${response[2]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2"><strong>Manufacturer:</strong> ${response[3]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2" ><strong>Owner:</strong> ${statusResponse[2]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2" ><strong>Current Status:</strong> ${statusResponse[1]}</p>
                  <p class="h6 text-muted mb-1 mb-lg-2"><strong>Current Location:</strong> lat: ${statusResponse[3]}, long: ${statusResponse[4]}</p>
                </div>
              </div>`;
                initMap(statusResponse[3], statusResponse[4]);
                $("#searchResult").html("");
                $("#loading").hide();
                $("#searchResult").append(result);

                // show the status history
                $("#statusHistory").show();
                // asset history
                assetHistory(id, response[6]);
              }
            });
        } else {
          // asset is not found
          let result = '<h2 style="color: red;">Asset Not found</h2>';
          $("#searchResult").html("");
          $("#loading").hide();
          $("#searchResult").append(result);
          $("#timelineHeader").html("");
          $("#statusTimeline").html("");
          $("#map").html("");
          $("#searchInput").val("");
          $("#transferInput").val("");
        }
      }
    });
  }
}

// get historyAsset function
function assetHistory(id, count) {
  AssetTrackerContract.methods.AssetStore(id).call((error, response) => {
    if (error) console.log(error);
    else {
      console.log(response);
      // let statusCount = parseInt(count);
      let statusCount = parseInt(response[5]);
      // let header = `<h2 class="font-weight-bold">Status Timeline</h2>
      // <p class="text-muted">
      //   This shows timeline through which parcels went through
      // </p>`;
      // $("#timelineHeader").append(header);
      for (let i = 1; i <= statusCount; i++) {
        // for (let i = statusCount; i >= 1; i--) {
        AssetTrackerContract.methods
          .getStatus(id, i)
          .call((error, response) => {
            if (error) console.log(error);
            else {
              // console.log(response);
              let date = new Date(
                parseInt(response[0]) * 1000
              ).toLocaleString();
              let event = `<div class="timeline-step">
                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title=""
                  data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                  <div class="inner-circle"></div>
                  <p class="h6 mt-3 mb-1">${date}</p>
                  <p class="h6 text-muted mb-0 mb-lg-0"><strong>Status:</strong> ${response[1]}</p>
                  <p class="h6 text-muted mb-0 mb-lg-0"><strong>Modified By:</strong> ${response[2]}</p>
                </div>
              </div>`;

              $("#statusTimeline").append(event);
            }
          });
      }
    }
  });
}

// implementation of map functionality
function initMap(lati, longi) {
  // The location of loc
  // const loc = { lat: 25.6049152, lng: 85.1017728 };
  const loc = { lat: parseInt(lati), lng: parseInt(longi) };
  console.log(loc);
  // The map, centered at loc
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: loc,
  });
  // The marker, positioned at loc
  const marker = new google.maps.Marker({
    position: loc,
    map: map,
  });
}

// window.initMap = initMap.bind(25.6049152,85.1017728);
