import React, { useState } from "react";
import SearchLoading from "../../loading/SearchLoading";
import { Button, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import ActResults from "../../tables/activities/ActResults";

import styles from "../../../Style";


const SearchAct = () => {
  const [fullName, setFullName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !citizenId) return;
    setIsLoading(true);
    setError(null);
    setActivities([]);
    setSearched(true);
    try {
      const response = await fetch("https://api-govolunteer.onrender.com/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, citizenId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Không thể tra cứu.");
      setActivities(data.activities || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={styles.formLabel}>
          <InputLabel style={styles.customInputLabel}>Họ và Tên</InputLabel>
          <input
            style={styles.customInput}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div style={styles.formLabel}>
          <InputLabel style={styles.customInputLabel}>CCCD</InputLabel>
          <input
            style={styles.customInput}
            type="text"
            value={citizenId}
            onChange={(e) => setCitizenId(e.target.value)}
          />
        </div>
        <div style={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={styles.button}
            disabled={!fullName || !citizenId}
          >
            <FontAwesomeIcon style={styles.icon} icon={faInbox} beatFade /> Tra cứu
          </Button>
        </div>
      </form>

      {isLoading ? (
        <SearchLoading />
      ) : (
        <ActResults activities={activities} error={error} searched={searched} />
      )}
    </div>
  );
};

export default SearchAct;
