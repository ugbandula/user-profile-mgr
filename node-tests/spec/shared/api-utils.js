/**
 * Created by Bandula Gamage on 01/05/2019.
 */

var chakram         = require('chakram');
var moment          = require('moment');
var momentBusDays   = require('moment-business-days');

require('dotenv').config({path: __dirname + '/../../env/.env'});

var globalTestConditionNo = 1;
var currentTime     = moment(new Date()).format('YYYY-MM-DD-HH.mm.ss');
var todaysDate      = moment(new Date()).format('YYYY-MM-DD');
var tomorrowsDate   = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');

/**
 * *************************************************************************
 * Base API management utility functions to ready for testing scenarios
 * *************************************************************************
 */
before("\tInitialize all working variables", function () {
    globalTestConditionNo = 1;
});

/**
 * Returns the next test module no.
 * @returns Test condition no
 */
exports.getGlobalTestConditionNo = function() {
    return globalTestConditionNo++;
};

/**
 * Returns the current time and date
 * @returns The date in YYYY-MM-DD-HH.mm.ss
 */
exports.getCurrentTimeNDate = function() {
    return currentTime;
};

/**
 * Returns the today's date
 * @returns The date in YYYY-MM-DD
 */
exports.getTodaysDate = function() {
    return todaysDate;
};

/**
 * Returns the tomorrow's date
 * @returns The date in YYYY-MM-DD
 */
exports.getTomorrowDate = function() {
    return tomorrowsDate;
};

/**
 * Returns the formatted date string to be displayed
 * @param inputDate
 * @returns {string}
 */
exports.getFormattedDate = function(inputDate) {
    if (inputDate)
        return moment(inputDate).format('DD/MM/YYYY hh:mm A');
    else
        return 'n/a';
};

/**
 * Returns whether the submitted date is in future
 * @returns Boolean value
 */
exports.isBeforeCurrentDateTime = function(dateString) {
    let parsedDate = parseDate(dateString);
    let currentDate= moment();
    if (parsedDate && (currentDate.diff(parsedDate, 'minutes') > 0))
        return true;
    else
        return false;
};

/**
 * Returns whether the submitted date is in future
 * @returns Boolean value
 */
exports.isAfterCurrentDateTime = function(dateString) {
    let parsedDate = parseDate(dateString);
    let currentDate= moment();
    if (parsedDate && (parsedDate.diff(currentDate, 'days') > 0))
        return true;
    else
        return false;
};

/**
 * Returns whether the submitted date is in future
 * @returns Boolean value
 */
exports.isAfterORWithinLastTwoDaysFromCurrentDateTime = function(dateString) {
    let parsedDate = parseDate(dateString);
    let currentDate= moment();
    if (parsedDate && (parsedDate.diff(currentDate, 'days') > 0))
        return true;
    else {
        // console.log('Date diff: ' + currentDate.diff(parsedDate, 'days'));
        if (parsedDate && (currentDate.diff(parsedDate, 'days') < 3))
            return true;
        else
            return false;
    }
};

/**
 * Formats the String formatted date to a Moment date time object
 * @param dateStr String formatted date
 * @returns Moment date time object
 */
function parseDate(dateStr) {
    if (dateStr) {
        return moment(dateStr);
    } else
        return null;
}

// function convertToInt(intStr) {
//     if (intStr)
// }
