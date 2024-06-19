const uniqueIDGenerator = (firstName, mobileNumber) => {
    const uniqueID=(firstName + mobileNumber);
    return uniqueID;
};

module.exports = uniqueIDGenerator;