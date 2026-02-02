import React from 'react'
import './index.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
function App() {

 const [profiles, setProfiles] = useState([
  { name: 'John Doe', city: 'New York', professional: 'Engineer', salary: 100000 },
  { name: 'Jane Smith', city: 'Los Angeles', professional: 'Designer', salary: 90000 },
  { name: 'Mike Johnson', city: 'Chicago', professional: 'Developer', salary: 95000 },
  { name: 'Emily Davis', city: 'San Francisco', professional: 'Manager', salary: 120000 },
  { name: 'David Wilson', city: 'Seattle', professional: 'Analyst', salary: 85000 },
  { name: 'Sarah Brown', city: 'Boston', professional: 'Consultant', salary: 110000 },
  { name: 'Chris Lee', city: 'Austin', professional: 'Architect', salary: 115000 },
  { name: 'Anna Garcia', city: 'Miami', professional: 'Coordinator', salary: 80000 },
  { name: 'James Martinez', city: 'Denver', professional: 'Specialist', salary: 95000 },
  { name: 'Laura Rodriguez', city: 'Portland', professional: 'Administrator', salary: 90000 },
]);

useEffect(() => {
  axios.get('http://localhost:3000/api/profiles')
    .then(res => {
      setProfiles(prev => {
  const combined = [...prev, ...res.data.profiles];
  const unique = combined.filter(
    (item, index, self) =>
      index === self.findIndex(p => p.name === item.name)
  );
  return unique;
});
    })
}, []);

  return (
   <>
    <div className="profiles">
      {profiles.map((prof, index)  => (
        <div className="profile" key={index}>
          <h1>{prof.name}</h1>
           <h2>{prof.city}</h2>
           <h3>{prof.professional}</h3>
           <h4>{prof.salary}</h4>

        </div>
      ))}
    </div>
   </>
  )
}

export default App