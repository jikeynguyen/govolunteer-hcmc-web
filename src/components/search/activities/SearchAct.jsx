import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../Style";

const API_FIND_ACTIVITIES = "https://api-govolunteer.onrender.com/find-activities";

const SearchAct = () => {
  const [fullName, setFullName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [selectedYear, setSelectedYear] = useState("all");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !citizenId) return;

    setIsLoading(true);
    setError(null);
    setActivities([]);
    setSearched(true);
    setSelectedYear("all");

    try {
      const response = await fetch(API_FIND_ACTIVITIES, {
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

  const uniqueYears = useMemo(() => {
    const years = new Set();
    activities.forEach((act) => {
      const parts = act.Registration_Date?.split("/");
      if (parts?.length === 3) years.add(parts[2]);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (selectedYear === "all") return activities;
    return activities.filter((a) => a.Registration_Date?.endsWith(selectedYear));
  }, [activities, selectedYear]);

  const renderStatusBadge = (status) => {
    const norm = status?.toLowerCase();
    let bg = "#f3f4f6", color = "#374151";
    if (norm === "đã hoàn thành") {
      bg = "#d1fae5";
      color = "#065f46";
    } else if (norm === "chưa hoàn thành") {
      bg = "#fee2e2";
      color = "#991b1b";
    }
    return (
      <span style={{
        backgroundColor: bg,
        color,
        padding: "4px 10px",
        borderRadius: "16px",
        fontWeight: 600,
        fontSize: "0.875rem"
      }}>
        {status || "Không rõ"}
      </span>
    );
  };

  return (
    <div style={styles.resultContainer}>
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
            startIcon={<FontAwesomeIcon icon={faInbox} beatFade />}
          >
            Tra cứu
          </Button>
        </div>
      </form>

      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <CircularProgress />
        </div>
      )}

      {!isLoading && error && (
        <div style={styles.notFoundText}>Lỗi: {error}</div>
      )}

      {!isLoading && searched && filteredActivities.length === 0 && (
        <div style={styles.notFoundContainer}>
          <span style={styles.notFoundText}>Không tìm thấy hoạt động</span>
        </div>
      )}

      {filteredActivities.length > 0 && (
        <>
          <div style={{ marginBottom: 12, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={styles.formControlText}>
              Kết quả: {filteredActivities.length} hoạt động
            </span>
            {uniqueYears.length > 1 && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px"
                }}
              >
                <option value="all">Tất cả các năm</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>Năm {year}</option>
                ))}
              </select>
            )}
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableCol10}>#</TableCell>
                <TableCell style={styles.tableCol20}>Tên Hoạt Động</TableCell>
                <TableCell style={styles.tableCol15}>Vai trò</TableCell>
                <TableCell style={styles.tableCol15}>Ngày đăng ký</TableCell>
                <TableCell style={styles.tableCol20}>Email</TableCell>
                <TableCell style={styles.tableCol10}>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredActivities.map((act, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{act.Activity_Name}</TableCell>
                  <TableCell>{act.Role}</TableCell>
                  <TableCell>{act.Registration_Date}</TableCell>
                  <TableCell>{act.Email}</TableCell>
                  <TableCell>{renderStatusBadge(act.Status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default SearchAct;
