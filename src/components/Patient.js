import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Patient.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    cardNum: "",
    age: "",
    diagnosis: "",
    name: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/patients", newPatient);
      fetchPatients(); // Refresh the patient list
      setNewPatient({
        cardNum: "",
        age: "",
        diagnosis: "",
        name: "",
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="patients-container">
      <div className="patients-header">Patient Registration</div>

      <form className="patient-form" onSubmit={handleAddPatient}>
        <input
          type="text"
          name="cardNum"
          value={newPatient.cardNum}
          placeholder="Card Number"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          value={newPatient.age}
          placeholder="Age"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="diagnosis"
          value={newPatient.diagnosis}
          placeholder="Diagnosis"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          value={newPatient.name}
          placeholder="Name"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Register Patient</button>
      </form>

      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id}>
            <div>
              <strong>{patient.cardNum}</strong>: {patient.name} ({patient.age} years)
            </div>
            <div>Diagnosis: {patient.diagnosis}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
