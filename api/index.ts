type ProfileWithLocation = {
    location: { lat: number; long: number };
    lastSeenTimestamp: number;
    id: string;
    handle: string;
    address: string;
    numFollowers: number;
    numFollowing: number;
    imageUrl: string;
    name: string;
    bio: string;
};

let allUsers: { [key: string]: ProfileWithLocation } = {};

import cors from 'cors';
import express from 'express';
const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());

app.post('/update-coords', (req, res) => {
    console.log('THE BODY: ', req.body);

    const userToUpdate = req.body;

    allUsers[userToUpdate.id] = userToUpdate;

    res.send('Success!');
});

app.post('/users-close-to-me', (req, res) => {
    const myUser = req.body;
    const allCloseUsers = Object.values(allUsers).filter(
        (user: ProfileWithLocation) => {
            const milesPerLatitude = 69; // ...
            const eucladeanDistanceMiles =
                Math.sqrt(
                    Math.pow(user.location.lat - myUser.location.lat, 2) +
                        Math.pow(user.location.long - myUser.location.long, 2)
                ) / milesPerLatitude;

            const oneHour = 60 * 60 * 1000;

            return (
                eucladeanDistanceMiles < 1 &&
                user.id !== myUser.id &&
                Date.now() - user.lastSeenTimestamp < oneHour
            );
        }
    );

    res.send(JSON.stringify({ data: allCloseUsers }));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
