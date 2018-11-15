import success from './json/successPOST';
import duplicateUsername from './json/failedPOSTDuplicateUsername';
import noCreds from './json/failedPOSTNoCreds';
import noPw from './json/failedPOSTNoPw';
import noUsername from './json/failedPOSTNoUsername';
import {runTest} from "./testRunner";

runTest('Successful POST response', success.success === true && success.message === 'user added successfully');
runTest('Failed POST response (No creds)', noCreds.success === false && noCreds.message === 'username and password are required');
runTest('Failed POST response (No password)', noPw.success === false && noPw.message === 'username and password are required');
runTest('Failed POST response (No username)', noUsername.success === false && noUsername.message === 'username and password are required');
runTest('Failed Post Request (Duplicate username)', duplicateUsername.success === false, duplicateUsername.message === 'unique name failure');
