import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import styles from "../../../Style";

const ActResults = ({ activities, error }) => {
  if (error) {
    return <div style={styles.notFoundText}>Lỗi: {error}</div>;
  }

  if (!activities || activities.length === 0) {
    return (
      <div style={styles.notFoundContainer}>
        <span style={styles.notFoundText}>Không tìm thấy hoạt động</span>
      </div>
    );
  }

  return (
    <div style={styles.resultContainer}>
      <span style={styles.formControlText}>
        Kết quả: {activities.length} hoạt động
      </span>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={styles.tableCol10}>#</TableCell>
            <TableCell style={styles.tableCol20}>Họ tên</TableCell>
            <TableCell style={styles.tableCol20}>Email</TableCell>
            <TableCell style={styles.tableCol20}>Tên Hoạt Động</TableCell>
            <TableCell style={styles.tableCol20}>Vai trò</TableCell>
            <TableCell style={styles.tableCol20}>Ngày đăng ký</TableCell>
            <TableCell style={styles.tableCol10}>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((act, index) => (
            <TableRow key={index}>
              <TableCell style={styles.tableRowCenter}>{index + 1}</TableCell>
              <TableCell style={styles.tableRowLeft}>{act.User_Name}</TableCell>
              <TableCell style={styles.tableRowLeft}>{act.Email}</TableCell>
              <TableCell style={styles.tableRowLeft}>{act.Activity_Name}</TableCell>
              <TableCell style={styles.tableRowLeft}>{act.Role}</TableCell>
              <TableCell style={styles.tableRowCenter}>{act.Registration_Date}</TableCell>
              <TableCell style={styles.tableRowCenter}>{act.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActResults;
