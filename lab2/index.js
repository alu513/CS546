const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Head Tests
try {
    // Should Pass
    const headOne = arrayUtils.head([2, 3, 4]);
    console.log('head passed successfully');
 } catch (e) {
    console.error('head failed test case');
 }
 try {
    // Should Fail
    const headTwo = arrayUtils.head(1234);
    console.error('head did not error');
 } catch (e) {
    console.log('head failed successfully');
 }


 // Capitalize Tests
try {
    // Should Pass
    const capOne = stringUtils.capitalize('tEsT');
    console.log('capitalize passed successfully');
 } catch (e) {
    console.error('capitalize failed test case');
 }
 try {
    // Should Fail
    const capTwo = stringUtils.capitalize(1234);
    console.error('capitalize did not error');
 } catch (e) {
    console.log('capitalize failed successfully');
 }


 // Count Elements Tests
try {
    // Should Pass
    const countOne = arrayUtils.countElements([13, '13', 13, 'hello', true, true]);
    console.log('count elements passed successfully');
 } catch (e) {
    console.error('count elements failed test case');
 }
 try {
    // Should Fail
    const countTwo = arrayUtils.countElements(1234);
    console.error('count elements did not error');
 } catch (e) {
    console.log('count elements failed successfully');
 }


 // Map Tests
try {
    // Should Pass
    const mapOne = objUtils.mapValues({ a: 1, b: 2, c: 3 }, n => n + 1);
    console.log('map passed successfully');
 } catch (e) {
    console.error('map failed test case');
 }
 try {
    // Should Fail
    const mapTwo = objUtils.mapValues({ a: 1, b: 2, c: 3 }, 1234);
    console.error('map did not error');
 } catch (e) {
    console.log('map failed successfully');
 }
 