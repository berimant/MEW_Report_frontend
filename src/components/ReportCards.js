import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ReportCards.css";

const ReportCards = () => {
  const [reportCards, setReportCards] = useState([]);
  const [newReportCard, setNewReportCard] = useState({
    uuid: "",
    reportNum: "",
    date: "",
    lastUpdateBy: "",
  });

  useEffect(() => {
    fetchReportCards();
  }, []);

  const fetchReportCards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reports/cards");
      setReportCards(response.data);
    } catch (error) {
      console.error("Error fetching report cards:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReportCard({ ...newReportCard, [name]: value });
  };

  const handleAddReportCard = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reports/cards", newReportCard);
      fetchReportCards(); // Refresh list
      setNewReportCard({
        uuid: "",
        reportNum: "",
        date: "",
        lastUpdateBy: "",
      });
    } catch (error) {
      console.error("Error adding report card:", error);
    }
  };

  return (
    <div className="report-cards">
      <h2>Report Cards</h2>
      <form onSubmit={handleAddReportCard}>
        <input
          type="text"
          name="uuid"
          placeholder="UUID"
          value={newReportCard.uuid}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="reportNum"
          placeholder="Report Number"
          value={newReportCard.reportNum}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newReportCard.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastUpdateBy"
          placeholder="Last Update By"
          value={newReportCard.lastUpdateBy}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Report Card</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Report Number</th>
            <th>Date</th>
            <th>Last Update By</th>
          </tr>
        </thead>
        <tbody>
          {reportCards.map((card) => (
            <tr key={card.uuid}>
              <td>{card.uuid}</td>
              <td>{card.reportNum}</td>
              <td>{card.date}</td>
              <td>{card.lastUpdateBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportCards;
