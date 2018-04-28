const friends = require('../data/friends.js');
const path = require('path');
const fs = require('fs');

//body parser middleware
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        //retrieving the scores property from user's input
        scores = req.body['scores[]'];
        //a starting smallest difference score to compare diffrence with current friend
        var smallest = 50;
        //bestFriend will be updated if current friend's difference is smalled than current bestFriend
        var bestFriend;
        
            //For loop through each friend in friends
            for (var i = 0; i < friends.length; i++) {
                // Array of different scores to each question
                var compArray = [];
                let friendScore = friends[i]['scores[]'];
                for (var j = 0; j < friendScore.length; j++) {
                    //push absolute value of difference in answers to question
                    compArray.push(Math.abs(friendScore[j] - parseFloat(scores[j])));

                }
                //sum of all values in compaArray
                var matchScore = compArray.reduce((a, b) => a + b, 0);
                //compares difference in answers between user and current friend. If difference is less than previous friends,
                //best friend updated to friend[i]
                if (matchScore < smallest) {
                    smallest = matchScore;
                    bestFriend = friends[i];
                }
            }
            
            // Return best match to client
            res.json(bestFriend);
            // Add current user to friendsArray
            friends.push(req.body);
    });
};
