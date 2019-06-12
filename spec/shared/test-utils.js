/**
 * Created by Bandula Gamage on 11/06/2019.
 */

let globalTestConditionNo = 1;

/**
 * Returns the next test module no.
 * @returns Test condition no
 */
exports.getGlobalTestConditionNo = function() {
    return globalTestConditionNo++;
};

exports.getSampleUserProfile = function() {
    return {
        "email" : "test6@test.com",
        "dateOfBirth" : "29/07/2003",
        "location" : {
            "address" : "24 Agra Street, Mitcham, VIC",
            "lat" : "-38.06383",
            "long" : "145.351374"
        },
        "name" : "Sample User"
    };
};

exports.getSampleArray2 = function() {
    return ['Simba', 'Garfield'];
};
