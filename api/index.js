let allUsers = {};

const cors = require('cors');

const express = require('express');
const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());

// {
//   locaiton: { lat: 40.74030752618321, long: -73.99588955220149 },
//   lastSeenTimestamp: 1656193862427,
//   id: 'hello',
//   handle: 'hello',
//   address: 'hello',
//   numFollowers: 1,
//   numFollowing: 1,
//   imageUrl: 'hello',
//   name: 'hello',
//   bio: 'hello'
// }

app.post('/update-coords', (req, res) => {
    console.log('THE BODY: ', req.body);

    const userToUpdate = req.body;

    allUsers[userToUpdate.id] = userToUpdate;

    res.send('Success!');
});

app.post('/users-close-to-me', (req, res) => {
    const myUser = req.body;
    const allCloseUsers = Object.values(allUsersArr).filter((user) => {
        const milesPerLatitude = 69; // ...
        const eucladeanDistanceMiles =
            Math.sqrt(
                Math.pow(user.location.lat - myUser.location.lat, 2),
                Math.pow(user.location.long - myUser.location.long, 2)
            ) / milesPerLatitude;

        const oneHour = 60 * 60 * 1000;

        return (
            eucladeanDistanceMiles < 1 &&
            user.id !== myUser.id &&
            Date.now() - user.lastSeenTimestamp < oneHour
        );
    });

    res.send(JSON.stringify({ data: allCloseUsers }));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
