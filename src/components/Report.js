import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Report.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    reportNum: "",
    role: "",
    notes: "",
    status: "",
    lastUpdateBy: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reports", newReport);
      fetchReports(); // Refresh the report list
      setNewReport({
        reportNum: "",
        role: "",
        notes: "",
        status: "",
        lastUpdateBy: "",
      });
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-header">Reports</div>

      <form className="report-form" onSubmit={handleAddReport}>
        <input
          type="text"
          name="reportNum"
          value={newReport.reportNum}
          placeholder="Report Number"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="role"
          value={newReport.role}
          placeholder="Role"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="notes"
          value={newReport.notes}
          placeholder="Notes"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="status"
          value={newReport.status}
          placeholder="Status (e.g., pending, success, failed)"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastUpdateBy"
          value={newReport.lastUpdateBy}
          placeholder="Last Updated By"
          onChange={handleInputChange}
        />
        <button type="submit">Add Report</button>
      </form>

      <ul className="report-list">
        {reports.map((report) => (
          <li key={report.uuid}>
            <div>
              <strong>{report.reportNum}</strong>: {report.notes}
            </div>
            <div className={`report-status ${report.status.toLowerCase()}`}>
              {report.status}
            </div>
          </li>
        ))}
      </ul>

      <div className="reports-footer">Report Management System © 2025</div>
    </div>
  );
};

export default Reports;
