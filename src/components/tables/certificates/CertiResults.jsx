import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styles from "../../../Style";

const CertiResults = ({ certificates, error }) => {
  const handleCopyPath = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã sao chép liên kết chứng nhận!");
    });
  };

  if (error) {
    return <div style={styles.notFoundText}>Lỗi: {error}</div>;
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div style={styles.notFoundContainer}>
        <span style={styles.notFoundText}>Không tìm thấy chứng nhận</span>
      </div>
    );
  }

  return (
    <div style={styles.resultContainer}>
      <span style={styles.formControlText}>
        Kết quả: {certificates.length} chứng nhận
      </span>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={styles.tableCol10}>#</TableCell>
            <TableCell style={styles.tableCol20}>Họ tên</TableCell>
            <TableCell style={styles.tableCol20}>Email</TableCell>
            <TableCell style={styles.tableCol20}>Mã Hoạt Động</TableCell>
            <TableCell style={styles.tableCol20}>Ngày cấp</TableCell>
            <TableCell style={styles.tableCol20}>Liên kết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates.map((cert, index) => (
            <TableRow key={index}>
              <TableCell style={styles.tableRowCenter}>{index + 1}</TableCell>
              <TableCell style={styles.tableRowLeft}>
                {cert.User_Name || "Chưa có"}
              </TableCell>
              <TableCell style={styles.tableRowLeft}>
                {cert.Email || "Chưa có"}
              </TableCell>
              <TableCell style={styles.tableRowCenter}>
                {cert.Activity_ID || "Chưa có"}
              </TableCell>
              <TableCell style={styles.tableRowCenter}>
                {cert.Registration_Date || "Chưa có"}
              </TableCell>
              <TableCell style={styles.tableRowCenter}>
                {cert["Merged Doc URL - Certificate_01"] ? (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        handleCopyPath(cert["Merged Doc URL - Certificate_01"])
                      }
                      startIcon={<ContentCopyIcon />}
                    >
                      Sao chép
                    </Button>
                    <a
                      href={cert["Merged Doc URL - Certificate_01"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: 10, textDecoration: "none" }}
                    >
                      <Button size="small" variant="text">Xem</Button>
                    </a>
                  </>
                ) : (
                  <span style={{ fontStyle: "italic", color: "gray" }}>
                    Chưa có
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CertiResults;
