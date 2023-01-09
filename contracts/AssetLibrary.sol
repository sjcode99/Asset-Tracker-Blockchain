// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.16;

library AssetLibrary {
    struct Asset {
        uint id;
        uint batchNo;
        string name;
        string description;
        string manufacturer;
        uint statusCount;
        mapping(uint => StatusDetail) articleStatus;
    }
    struct StatusDetail {
        uint time;
        string currentStatus;
        string owner;
        string latitude;
        string longitude;

    }
}