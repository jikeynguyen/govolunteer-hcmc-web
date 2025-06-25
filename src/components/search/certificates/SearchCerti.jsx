import React, { useState } from "react";
import { Button, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import CertiResults from "../../tables/certificates/CertiResults";
import SearchLoading from "../../loading/SearchLoading";
import lookupAPI from "../../../API/lookupAPI";
import styles from "../../../Style";

const SearchCerti = () => {
  const [fullName, setFullName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !citizenId) return;
    setIsLoading(true);
    setError(null);
    setCertificates([]);
    setSearched(true);
    try {
      const response = await lookupAPI.searchCertificates(fullName, citizenId);
      setCertificates(response);
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
        <CertiResults certificates={certificates} error={error} />
      )}

      {searched && !isLoading && !certificates.length && !error && (
        <div style={styles.notFoundContainer}>
          <span style={styles.notFoundText}>Không tìm thấy chứng nhận</span>
        </div>
      )}
    </div>
  );
};

export default SearchCerti;
