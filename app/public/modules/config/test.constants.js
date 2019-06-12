/**
 * Created by Bandula Gamage on 11/06/2019.
 */
'use strict';

angular
    .module('test.config', [])

    .constant('SERVICE_URLS', {
        readUserProfile: '/api/users/',
        saveUserProfile: '/api/users/'
    })

    .constant('KEYS', {
        localStorageKey: 'userProfile'
    })

    .constant('ZOOM_LEVEL', {
        MIN:                10,
        NORMAL:             14,
        SUBURB:             15,
        MAX:                17,
        PROPERTY_HIGHLIGHT: 18,
        ULTRA_ZOOM:         30
    })

;
