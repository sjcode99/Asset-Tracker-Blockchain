// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.16;
import "./AssetLibrary.sol";

contract AssetTracker {
    
    mapping(uint => AssetLibrary.Asset) public AssetStore;
    // state variable
    uint256 public assetCount= 0;
    
    // create new asset
    function createAsset(
        uint _batchNo,
        string memory _name,
        string memory _description,
        string memory _manufacturer,
        string memory _owner,
        string memory _status,
        string memory _latitude,
        string memory _longitude
        ) public{
        
        assetCount++;
        AssetLibrary.Asset storage assSt = AssetStore[assetCount];
        assSt.id = assetCount;
        assSt.batchNo = _batchNo;
        assSt.name = _name;
        assSt.description = _description;
        assSt.manufacturer = _manufacturer;
        assSt.statusCount = 0;
        // AssetStore[assetCount]= AssetLibrary.Asset(assetCount, _batchNo, _name, _description, _manufacturer , 0);
        AssetStore[assetCount].statusCount++;
        AssetStore[assetCount].articleStatus[AssetStore[assetCount].statusCount]=AssetLibrary.StatusDetail(block.timestamp, _status, _owner, _latitude, _longitude);
        emit AssetCreate(assetCount, _manufacturer, _status);
    }
    

    // get info of asset
    function getAsset(uint _id) view public returns(uint, string memory, string memory, string memory, uint) {       
        AssetLibrary.Asset storage asst = AssetStore[_id];
        return (asst.batchNo,
        asst.name,
        asst.description, 
        asst.manufacturer,
        asst.statusCount);
    }

    
    // function getAsset(uint _id) view public returns(uint, string memory, string memory, string memory, string memory, uint,string memory, string memory, string memory) {
    //     AssetLibrary.Asset storage asst = AssetStore[_id];
    //     return (asst.batchNo,
    //     asst.name,
    //     asst.description, 
    //     asst.manufacturer, 
    //     asst.articleStatus[asst.statusCount].owner, 
    //     asst.articleStatus[asst.statusCount].time,
    //     asst.articleStatus[asst.statusCount].currentStatus,
    //     asst.articleStatus[asst.statusCount].latitude,
    //     asst.articleStatus[asst.statusCount].longitude);
    // }
    
    // transfer asset
    function transferAsset(uint _id, string memory _newOwner, string memory _status, string memory _latitude, string memory _longitude) public{
        AssetStore[_id].statusCount++;
        AssetStore[_id].articleStatus[AssetStore[_id].statusCount]=AssetLibrary.StatusDetail(block.timestamp, _status, _newOwner,_latitude, _longitude );
        emit AssetTransfer(_id, _newOwner);
    }
    
    // get total asset count
    function getAssetCount() view public returns(uint) {       
        return assetCount;
    }
    
    
    function getStatus(uint _id, uint _statusCount) view public returns(uint, string memory, string memory, string memory, string memory) {
        AssetLibrary.StatusDetail memory s= AssetStore[_id].articleStatus[_statusCount];
        return (s.time, s.currentStatus, s.owner, s.latitude, s.longitude);
    }
    
    event AssetCreate(uint id, string manufacturer, string status);
    event AssetTransfer(uint id, string newOwner);
}