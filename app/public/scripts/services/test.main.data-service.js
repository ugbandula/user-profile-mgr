/**
 *  Created by Bandula Gamage
 */

'use strict';

/**
 * -------------------------------------------------------------------
 *  Service Definitions
 * -------------------------------------------------------------------
 */

angular
    .module('test.main.services', [])
    .factory('mainDataService', mainDataService);

mainDataService.$inject = ['$http', '$q'];

function mainDataService($http, $q) {

    return {
        /**
         * Extracts the location address using lat and long details
         */
        readLocationAddress: readGeocodeForLatLng
    };

    /**
     * Reads the corresponding address details from the Google geocoder service
     * @param lat   Latitude
     * @param long  Longitude
     * @returns Street address
     */
    function readGeocodeForLatLng(lat, long) {
        var deferred = $q.defer();

        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: lat, lng: long};
        console.log(latlng);
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    return deferred.resolve(results[0].formatted_address);
                } else {
                    return deferred.reject('No results found');
                }
            } else {
                console.log('ADDRESS READ FAILED');
                return deferred.reject('Geocoder failed due to: ' + status);
            }
        });

        return deferred.promise;
    }

}
