import React, { useState } from "react";
import { Button, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SearchLoading from "../../loading/SearchLoading";
import styles from "../../../Style";
import CertiResults from "../../tables/certificates/CertiResults";

const SearchCerti = () => {
  const [fullName, setFullName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const API_FIND = "https://api-govolunteer.onrender.com/find-certificates";
  const API_REQUEST = "https://api-govolunteer.onrender.com/request-pdf";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !citizenId) return;

    setIsLoading(true);
    setError(null);
    setCertificates([]);
    setEmailNotice(null);
    setSearched(true);

    try {
      const res = await fetch(API_FIND, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, citizenId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Không thể tra cứu.");
      setCertificates(data.certificates || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPDF = async (cert) => {
    const emailToSend = customEmail || cert.Email;
    if (!emailToSend) {
      setEmailNotice("❌ Không có email để gửi chứng chỉ.");
      return;
    }

    try {
      setSendingEmail(true);
      const res = await fetch(API_REQUEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          citizenId,
          email: emailToSend,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Gửi thất bại.");

      setEmailNotice(`✅ Đã gửi chứng chỉ tới ${emailToSend}. Hãy kiểm tra email (kể cả spam).`);
    } catch (err) {
      setEmailNotice(`❌ ${err.message}`);
    } finally {
      setSendingEmail(false);
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
            <FontAwesomeIcon style={styles.icon} icon={faInbox} /> Tra cứu
          </Button>
        </div>
      </form>

      {isLoading ? (
        <SearchLoading />
      ) : (
        <>
          <CertiResults certificates={certificates} error={error} />

          {searched && !certificates.length && !error && (
            <div style={styles.notFoundContainer}>
              <span style={styles.notFoundText}>Không tìm thấy chứng nhận</span>
            </div>
          )}

          {certificates.length > 0 && (
            <div style={styles.formLabel}>
              <InputLabel style={styles.customInputLabel}>
                Nhập email muốn nhận chứng chỉ (nếu khác email hệ thống)
              </InputLabel>
              <input
                style={styles.customInput}
                type="email"
                placeholder="example@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
              />
              <div style={styles.buttonContainer}>
                <Button
                  variant="contained"
                  size="large"
                  style={styles.button}
                  disabled={sendingEmail || (!customEmail && !certificates[0]?.Email)}
                  onClick={() => handleRequestPDF(certificates[0])}
                >
                  <FontAwesomeIcon style={styles.icon} icon={faEnvelope} />{" "}
                  {sendingEmail ? "Đang gửi..." : "Nhận chứng chỉ qua email"}
                </Button>
              </div>
            </div>
          )}

          {emailNotice && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: "#edf7ed",
                border: "1px solid #4caf50",
                color: "#256029",
                borderRadius: 8,
              }}
            >
              {emailNotice}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchCerti;
