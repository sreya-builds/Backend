const express = require('express');
const Profile = require('./models/profile.model');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/profiles', async (req, res) => {
  try {
    const { name, city, address, education, salary } = req.body;
    const professional = req.body.professional || req.body.profession;

    let edu = education;
    if (typeof edu === 'string') {
      const e = edu.trim().toLowerCase();
      if (e === 'graduation' || e === 'graduate') edu = 'Graduate';
      else if (e === '10th' || e === '10') edu = '10th';
      else if (e === '12th' || e === '12') edu = '12th';
    }

    const profile = await Profile.create({
      name,
      city,
      address,
      education: edu,
      professional,
      salary
    });

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (err) {
    console.error('Error creating profile:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/profiles', async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({
    message: 'Profiles retrieved successfully',
    profiles
  });
});

app.delete('/api/profiles/:id', async (req, res) => {
  const id = req.params.id;
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

app.put('/api/profiles/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const replacedProfile = await Profile.findByIdAndUpdate(id, newData, { new: true, overwrite: true });
  res.status(200).json({
    message: 'Profile replaced successfully',
    replacedProfile
  });
});

module.exports = app;