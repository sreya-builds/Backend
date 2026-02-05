import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [profiles, setProfiles] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  function fetchProfiles() {
    axios.get("http://localhost:3000/api/profiles").then((res) => {
      setProfiles(res.data.profiles);
    });
  }

  useEffect(() => {
    fetchProfiles();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const { name, city, address, education, profession, salary } =
      e.target.elements;

    axios
      .post("http://localhost:3000/api/profiles", {
        name: name.value,
        city: city.value,
        address: address.value,
        education: education.value,
        profession: profession.value,
        salary: Number(salary.value),
      })
      .then(() => {
        fetchProfiles();
        e.target.reset();
      });
  }
  function handleDelete(id) {
    axios.delete(`http://localhost:3000/api/profiles/${id}`)
    .then(() => {
      fetchProfiles();
    });
  }

  function handleUpdateClick(profile) {
    setSelectedProfile(profile);
    setShowPopup(true);
  }
  function handleUpdateSubmit(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/api/profiles/${selectedProfile._id}`, {
        name: selectedProfile.name,
        city: selectedProfile.city,
        address: selectedProfile.address,
        education: selectedProfile.education,
        professional: selectedProfile.professional,
        salary: Number(selectedProfile.salary),
      })
      .then(() => {
        fetchProfiles();
        setShowPopup(false);
      });
  }

  return (
    <>
      {/* Create Form */}
      <form className="user-create-form" onSubmit={handleSubmit}>
        <h2>Create Profile</h2>
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="City" name="city" required />
        <input type="text" placeholder="Address" name="address" required />
        <input type="text" placeholder="Education" name="education" required />
        <input type="text" placeholder="Profession" name="profession" required />
        <input type="number" placeholder="Salary" name="salary" required />
        <button type="submit">Create Profile</button>
      </form>

      {/* Profiles List */}
      <div className="profiles">
        {profiles.map((profile) => (
          <div className="profile-card" key={profile._id}>
            <h2>{profile.name}</h2>

            <p>
              <b>City:</b> {profile.city}
            </p>
            <p>
              <b>Address:</b> {profile.address}
            </p>
            <p>
              <b>Education:</b> {profile.education}
            </p>
            <p>
              <b>Profession:</b> {profile.professional}
            </p>
            <p>
              <b>Salary:</b> ₹{profile.salary}
            </p>

            {/* Buttons */}
            <div className="btn-group">
              <button className="delete-btn"onClick={() => handleDelete(profile._id)}>
                Delete
              </button>

              <button
                className="update-btn"
                onClick={() => handleUpdateClick(profile)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Popup Update Form */}
      {showPopup && selectedProfile && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Update Profile</h2>

            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                value={selectedProfile.name}
                onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={selectedProfile.city}
                onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    city: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={selectedProfile.address}
                onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    address: e.target.value,
                  })
                }
              />

      <input type="text"value={selectedProfile.education} onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    education: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={selectedProfile.professional}
                onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    professional: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={selectedProfile.salary}
                onChange={(e) =>
                  setSelectedProfile({
                    ...selectedProfile,
                    salary: e.target.value,
                  })
                }
              />

              <button type="submit">Save Changes</button>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
