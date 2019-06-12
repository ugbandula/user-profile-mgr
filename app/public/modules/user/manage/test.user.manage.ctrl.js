/**
 * Created by Bandula Gamage on 11/06/2019.
 */
'use strict';

angular
    .module('test.user')
    .controller('ManageUserController', ManageUserController);

ManageUserController.$inject = ['$scope', '$state', '$location', '$mdDialog', 'leafletData', 'mainDataService', 'userMgtService', 'ZOOM_LEVEL', 'KEYS'];

function ManageUserController($scope, $state, $location, $mdDialog, leafletData, mainDataService, userMgtService, ZOOM_LEVEL, KEYS) {

    /**
     * Initializes the controller
     */
    $scope.init = function () {
        console.log('<ManageUserController> Controller initializing');

        /**
         * Loads the cached information from localStorage if the entry exists
         */
        try {
            $scope.userProfile = JSON.parse(localStorage.getItem(KEYS.localStorageKey));
        } catch (e) {
            $scope.userProfile = null;
        }
        // console.log('<ManageUserController> Cached user profile: ' + JSON.stringify($scope.userProfile));

        /**
         * If theres no entry initialize the object
         */
        if (!$scope.userProfile) {
            $scope.userProfile = {
                name: null,
                email: null,
                dateOfBirth: null,
                location: {
                    address: null,
                    lat: null,
                    long: null
                }
            };

            $scope.getCurrentLocation();
        } else {
            $scope.userProfile.dateOfBirth = moment($scope.userProfile.dateOfBirth, 'DD/MM/YYYY');
            drawMarker($scope.userProfile.location.address, $scope.userProfile.location.lat, $scope.userProfile.location.long);
        }

        /**
         * Initialize the map definitions
         */
        angular.extend($scope, {
            defaults: {
                intertia:           true,
                tap:                true,
                maxZoom:            ZOOM_LEVEL.ULTRA_ZOOM,
                minZoom:            ZOOM_LEVEL.MIN
            },

            berwick: {
                lat: -37.817760,
                lng: 145.192001,
                zoom: ZOOM_LEVEL.NORMAL
            },

            markers: {
            },

            defaultIcon: {},

            awesomeMarkerIcon: {
                type: 'awesomeMarker',
                icon: 'tag',
                markerColor: 'red'
            },

            events: {
            },

            controls: {
                fullscreen: {
                    position: 'topleft'
                },
                custom: [
                ]
            }
        });
    };

    /**
     * This will be used to enable the proximity based views on the map
     */
    $scope.getCurrentLocation = function () {
        var options = {
            enableHighAccuracy: false,
            timeout: 2000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(whenLocationIdentifies, whenLocationIdentificationFails, options);
    };
    $scope.init();

    /**
     * Calls once the current location identifies.
     *
     * @param pos   Geo-location
     */
    function whenLocationIdentifies(pos) {
        if (typeof(pos) === "undefined") {
        } else {
            var crd = pos.coords;

            $scope.userProfile.location.lat     = crd.latitude;
            $scope.userProfile.location.long    = crd.longitude;

            mainDataService.readLocationAddress(crd.latitude, crd.longitude)
                .then(function(res) {
                    $scope.userProfile.location.address = res;
                }, function(error) {
                    console.log('Address resolution dailed.');
                });

            drawMarker($scope.userProfile.location.address, $scope.userProfile.location.lat, $scope.userProfile.location.long);
        }
    }

    /**
     * Calls once the current location identification fails.
     * @param err   Error
     */
    function whenLocationIdentificationFails(err) {
        $scope.openModal('lg','LocationError.html');
    }

    /**
     * Draws the marker pin on the already identified location.
     * @param address   Address
     * @param lat       Latitude
     * @param long      Longitude
     */
    function drawMarker(address, lat, long) {
        leafletData.getMap().then(function (map) {
            map.setView([lat, long], ZOOM_LEVEL.MAX, {animation: true});

            var myLocation = L.marker([lat, long], {title: address, alt: address, draggable: true})
                .addTo(map)

                /**
                 * Allows to capture marker drag and drop events. Once the drag finishes it captures the location and then the address.
                 */
                .on('dragend', function() {
                    var coord  = String(myLocation.getLatLng()).split(',');
                    var newLat = coord[0].split('(');
                    var newLng = coord[1].split(')');

                    /**
                     * Reads the address for the identified location using Google geoCode service
                     */
                    mainDataService.readLocationAddress(toNumber(newLat[1]), toNumber(newLng[0]))
                        .then(function(res) {
                            $scope.userProfile.location.address = res;
                            $scope.userProfile.location.lat     = newLat[1];
                            $scope.userProfile.location.long    = newLng[0];
                        }, function(error) {
                            console.log(error);
                        });
                });
        });
    }

    /**
     * Converts to a decimal value
     * @param strValue
     * @returns {number}
     */
    function toNumber(strValue) {
        return parseFloat(strValue);
    }

    /**
     * Saves changes to the localStorage and to the central server
     */
    $scope.saveChanges = function() {
        localStorage.removeItem(KEYS.localStorageKey);
        localStorage.setItem(KEYS.localStorageKey, JSON.stringify($scope.userProfile));

        userMgtService.submitUserProfile($scope.userProfile)
            .then(function(res) {
                console.log(res);

                $location.path('dashboard');
            }, function(error) {
                console.log(error);
            });
    };

    /**
     * Opens up a custom error message as modal dialog
     * @type {string[]}
     */
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    /**
     * Opens up a modal to display the message
     * @param size      Size of the wirdow
     * @param template  HTML Template
     */
    $scope.openModal = function (size, template) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: template,
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            // $uibModalInstance.close($ctrl.selected.item);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /**
     * Formats the date after user has input a new date
     */
    $scope.captureNewDate = function() {
        $scope.userProfile.dateOfBirth = moment($scope.userProfile.dateOfBirth).format('DD/MM/YYYY');
    }
}
