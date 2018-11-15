import success from './json/successPUT';
import noBody from './json/failedPUTNoBody';
import badPw from './json/failedPUTBadPw';
import badUsername from './json/failedPUTBadUsername';
import noUsername from './json/failedPUTNoUsername';
import noOldPw from './json/failedPUTNoOldPw';
import noNewPw from './json/failedPUTNoNewPw';
import {runTest} from "./testRunner";

runTest('Successful PUT request', success.success === true && success.message === 'password updated');
runTest('Failed PUT request (No body sent)', noBody.success === false && noBody.message === 'username, oldPw and newPw are required');
runTest('Failed PUT request (Bad password)', badPw.success === false && badPw.message === 'bad username or password');
runTest('Failed PUT request (No username)', noUsername.success === false && noUsername.message === 'username, oldPw and newPw are required');
runTest('Failed PUT request (No oldPw)', noOldPw.success === false && noOldPw.message === 'username, oldPw and newPw are required');
runTest('Failed PUT request (No newPw)', noNewPw.success === false && noNewPw.message === 'username, oldPw and newPw are required');
runTest('Failed PUT request (Bad / missing username)', badUsername.success === false);
