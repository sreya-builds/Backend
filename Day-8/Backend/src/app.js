const express = require('express');
 const Profile = require('./models/profile.model');
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/profiles', async (req, res) => {
    const { name, city, address, education, professional, salary } = req.body;
     
   const profile = await Profile.create({ 
    name, city, address, education, professional, salary 
});
   res.status(201).json({
    message: 'Profile created successfully',
    profile
   });
});

app.get('/api/profiles', async (req, res) => {
    const profiles = await Profile.find();
    res.status(200).json({  
        message: 'Profiles retrieved successfully',
        profiles
    });
});

app.delete('/api/profiles/:id', async (req, res) => {
    const id  = req.params.id;
   
    const deletedProfile = await Profile.findByIdAndDelete(id);
    
    res.status(200).json({
        message: 'Profile deleted successfully',
        deletedProfile
    });
});

app.patch('/api/profiles/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;   
    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({
        message: 'Profile updated successfully',
        updatedProfile
    });
});

module.exports = app;