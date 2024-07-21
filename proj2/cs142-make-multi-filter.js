"use strict";
function cs142MakeMultiFilter(originalArray) {
    let currentArray = originalArray.slice();
    function arrayFilter(filterCriteria, callback) {
        if (typeof filterCriteria === 'function') {
            currentArray = currentArray.filter(item => filterCriteria(item));
        } else {
            return currentArray;
        }

        if (typeof callback === 'function') {
            callback.call(originalArray, currentArray);
        }

        return arrayFilter;
    }

    return arrayFilter;
}