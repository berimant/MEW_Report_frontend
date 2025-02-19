import React, { useEffect, useState } from "react";

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gantilah URL dengan endpoint Spring Boot yang sesuai
    fetch("http://localhost:8080/api/data") 
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Data from Spring Boot</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> // Ganti 'name' dengan kolom yang sesuai dari API
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
