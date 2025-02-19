import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Assessment.css";

const Assessment = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/reports/${reportId}`, {
        report_Status: parseInt(newStatus, 10), // Konversi ke Integer
      });
      fetchReports();
    } catch (error) {
      console.error("Error updating report status:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <div className="assessment-container">
      <h2>Assessment Page</h2>
      <table className="assessment-table">
        <thead>
          <tr>
            <th>Report Number</th>
            <th>Notes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.uuid}>
              <td>{report.reportNum}</td>
              <td>{report.notes}</td>
              <td>
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.uuid, e.target.value)}
                >
                  {[...Array(7).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;
