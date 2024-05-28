import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const ListUser = () => {
    const [data, setData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
        const authEmail = localStorage.getItem('authEmail');
        if (authEmail !== 'admin.btc@gmail.com') {
            setIsAuthorized(false);
            return;
        }

        const fetchData = async () => {
            const response = await axios.get('http://localhost:3307/api/taikhoan/findall');
            setData(response.data);
        };

        fetchData();
    }, []);

    const handleDelete = async (MaTaiKhoan) => {
        await axios.delete(`http://localhost:3307/api/taikhoan/delete/${MaTaiKhoan}`);
        setData(data.filter((item) => item.MaTaiKhoan !== MaTaiKhoan));
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TableContainer component={Paper} style={{ maxWidth: '80%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Tài Khoản</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => {
                            if (row.MaTaiKhoan !== 1) {
                                return (
                                    <TableRow key={row.TenTaiKhoan}>
                                        <TableCell component="th" scope="row">
                                            {row.TenTaiKhoan}
                                        </TableCell>
                                        <TableCell>{row.SoDienThoai}</TableCell>
                                        <TableCell>{row.DiaChi}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row.MaTaiKhoan)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListUser;