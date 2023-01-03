function searchAsset() {
  // clear previous search result
  $("#searchResult").html("");

  //   now search the asset
  assetId = parseInt($('input[name="id"]').val());
  AssetTrackerContract.methods.getAsset(assetId).call((error, response) => {
    if (error) console.log(error);
    else {
      // if found
      if (response[1] !== "") {
        let content =
          '<h4 style="color: #28a745;">Asset Found</h4>Name: ' +
          response[1] +
          "<br>" +
          "Owner: " +
          response[3] +
          "<br>" +
          "Current Status: " +
          response[4];
        $("#searchResult").append(content);
        $("#transferFrom").show();
      } else {
        //   if not found
        let content = '<h4 style="color: red;">Asset Not Found</h4>';
        $("#searchResult").append(content);
        $("#transferFrom").hide();
      }
    }
  });
}

function transferAsset() {
  let assetId = parseInt($('input[name="id"]').val());
  let newOwner = $('input[name="newOwner"]').val();
  let newStatus = $('input[name="newStatus"]').val();

  console.log(assetId, newOwner, newStatus);
  // transfer the asset
  AssetTrackerContract.methods
    .transferAsset(assetId, newOwner, newStatus)
    .send()
    .then(tx => {
      console.log(tx);
    });
}
