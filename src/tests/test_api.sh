#!/usr/bin/env bash
# Integration Test for API

url='localhost:5001/api/v1/users/'
# username is a constantly changing name, for test repeatability without having
# to restart the api and clear out the database.
username=(`printf '%(%s)T\n' -1`)

clear
echo "Testing database"
../../node_modules/.bin/babel-node ./database.test.js
echo ""
echo "Testing the API"
echo ""
echo "POST Test"
curl $url -s -X POST -H "Content-Type:application/json" -d '{}' > json/failedPOSTNoCreds.json
curl $url -s -X POST -H "Content-Type:application/json" -d '{"username": "'"$username"'"}' > json/failedPOSTNoPw.json
curl $url -s -X POST -H "Content-Type:application/json" -d '{"password": "'"$username"'"}' > json/failedPOSTNoUsername.json
curl $url -s -X POST -H "Content-Type:application/json" -d '{"username": "'"$username"'", "password": "hello!"}' > json/successPOST.json
curl $url -s -X POST -H "Content-Type:application/json" -d '{"username": "'"$username"'", "password": "hello!"}' > json/failedPOSTDuplicateUsername.json
../../node_modules/.bin/babel-node testPOST.js
echo ""
echo "PUT Test"
curl $url -s -X PUT -H "Content-Type:application/json" > json/failedPUTNoBody.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"username": "'"$username"'", "oldPw": "hello", "newPw": "hello1"}' > json/failedPUTBadPw.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"oldPw": "hello", "newPw": "hello1"}' > json/failedPUTNoUsername.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"username": "'"$username"'", "newPw": "hello1"}' > json/failedPUTNoOldPw.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"username": "'"$username"'", "oldPw": "hello!"}' > json/failedPUTNoNewPw.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"username": "'"$username"'", "oldPw": "hello!", "newPw": "hello1"}' > json/successPUT.json
curl $url -s -X PUT -H "Content-Type:application/json" -d '{"username": "fake-username", "oldPw": "hello!", "newPw": "hello1"}' > json/failedPUTBadUsername.json
../../node_modules/.bin/babel-node testPUT.js
