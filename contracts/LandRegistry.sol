// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract LandRegistry {
    address public superAdmin;
    uint256 public currentLandId;

    enum Status {
        NotExists,
        Pending,
        Approved,
        Rejected
    }
    enum Role {
        Admin,
        User
    }

    constructor(address _superAdmin) {
        superAdmin = _superAdmin;
    }

    struct Land {
        uint256 landId;
        string plotCoords;
        uint256 area;
        address owner;
        address verifiedBy;
        Status status;
    }

    struct LandTransfer {
        uint256 landId;
        address from;
        address to;
        address verifiedBy;
        Status status;
    }

    event LandRegistered(
        uint256 landId,
        string plotCoords,
        uint256 area,
        address owner,
        Status status
    );
    event LandRegistrationVerified(
        uint256 landId,
        Status status,
        address verifiedBy
    );
    event LandTransferRegistered(
        uint256 landId,
        address from,
        address to,
        Status status
    );
    event LandTransferVerified(
        uint256 landId,
        address from,
        address to,
        Status status,
        address verifiedBy
    );
    event UserRegistered(address addr, Role role);

    mapping(uint256 => Land) public lands;
    mapping(uint256 => LandTransfer) public landTransfers;
    mapping(address => bool) public verifiedUsers;
    mapping(address => bool) public verifiedAdmins;

    /// @dev Modifier ensures that the caller is a super admin.
    modifier onlySuperAdmin() {
        require(
            msg.sender == superAdmin,
            "Only super admin can perform this action"
        );
        _;
    }

    /// @dev Modifier ensures that the caller is a verified admin.
    modifier onlyVerifiedAdmin(address _admin) {
        require(
            verifiedAdmins[_admin],
            "Only verified admin can perform this action"
        );
        _;
    }

    /// @dev Modifier ensures that the caller is a owner of the land.
    /// @param _landId The id of the land.
    modifier onlyOwner(uint256 _landId) {
        require(
            lands[_landId].owner == msg.sender,
            "Only land owner can perform this action"
        );
        _;
    }

    /// @dev Modifier ensures that the caller is a verified user.
    modifier onlyVerifiedUser(address _user) {
        require(
            verifiedUsers[_user],
            "Only verified user can perform this action"
        );
        _;
    }

    /// @dev Registers new users by the super admin.
    /// @param _addr The address of the user/admin
    /// @param _role The role of the user.
    function registerUser(address _addr, Role _role) public onlySuperAdmin {
        if (_role == Role.Admin) {
            verifiedAdmins[_addr] = true;
        } else {
            verifiedUsers[_addr] = true;
        }
        emit UserRegistered(_addr, _role);
    }

    /// @dev Registers new land by verified users.
    /// @param _plotCoords The physical coordinates of land.
    /// @param _area The area of the land.
    function registerLand(string memory _plotCoords, uint256 _area)
        public
        onlyVerifiedUser(msg.sender)
    {
        lands[currentLandId] = Land(
            currentLandId,
            _plotCoords,
            _area,
            msg.sender,
            address(0),
            Status.Pending
        );
        emit LandRegistered(
            currentLandId,
            _plotCoords,
            _area,
            msg.sender,
            Status.Pending
        );
        currentLandId++;
    }

    /// @dev Verifies the land registration by the verified admin.
    /// @dev Land status must be pending before verification.
    /// @param _landId The id of the land.
    /// @param _status The status of the land.
    function verifyLandRegistration(uint256 _landId, Status _status)
        public
        onlyVerifiedAdmin(msg.sender)
    {
      require(lands[_landId].status == Status.Pending, "Land status must be pending");
        lands[_landId].status = _status;
        lands[_landId].verifiedBy = msg.sender;
        emit LandRegistrationVerified(_landId, _status, msg.sender);
    }

    /// @dev Registers new land transfer by land owner.
    /// @param _landId The id of the land.
    /// @param _to The address of the user who is receiving the land.
    function registerLandTransfer(uint256 _landId, address _to)
        public
        onlyOwner(_landId)
    {
        require(
            lands[_landId].status == Status.Approved,
            "Land must be approved before transfer"
        );
        require(
            lands[_landId].owner != _to,
            "Land owner cannot transfer to himself"
        );
        require(verifiedUsers[_to], "User must be verified before transfer");
        lands[_landId].status = Status.Pending;
        landTransfers[_landId] = LandTransfer(
            _landId,
            msg.sender,
            _to,
            address(0),
            Status.Pending
        );
        emit LandTransferRegistered(_landId, msg.sender, _to, Status.Pending);
    }

    /// @dev Verifies the land transfer by the verified admin.
    /// @dev Land transfer status must be pending before verification.
    /// @param _landId The id of the land.
    /// @param _status The status of the land transfer.
    function verifyLandTransfer(uint256 _landId, Status _status)
        public
        onlyVerifiedAdmin(msg.sender)
    {
        require(
            landTransfers[_landId].status == Status.Pending,
            "Land transfer must be pending before verification"
        );
        landTransfers[_landId].status = _status;
        landTransfers[_landId].verifiedBy = msg.sender;
        if(_status == Status.Approved) {
            lands[_landId].owner = landTransfers[_landId].to;
        }
        lands[_landId].status = _status;
        emit LandTransferVerified(
            _landId,
            msg.sender,
            landTransfers[_landId].to,
            _status,
            msg.sender
        );
    }
}
