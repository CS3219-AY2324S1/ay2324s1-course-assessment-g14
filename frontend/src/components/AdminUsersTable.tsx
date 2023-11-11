import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TablePagination, SelectChangeEvent, Grid, Typography, Button } from '@mui/material';
import { useData } from '../data/data.context';
import { updateUser } from '../api/user';

interface AdminUser {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10]; // Number of items to display per page

const AdminUsersTable: React.FC = () => {
  const [adminUsersData, setAdminUsers] = useState<AdminUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);
  const { adminUsers, getAdminUsers } = useData();

  useEffect(() => {
    async function getAdmins() {
      getAdminUsers();
    }
    getAdmins();
  }, []); // eslint-disable-line

  useEffect(() => {
    setAdminUsers(adminUsers);
    console.log('check')
  }, [adminUsers]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeItemsPerPage = (
    event: SelectChangeEvent<unknown>,
  ) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(0);
  };
  
  const removeAdmin = async (admin: AdminUser, index: number) => {
    await updateUser({
      email: admin?.email ? admin?.email : "",
      name: admin?.name ? admin?.name : "",
      year: admin?.year ? admin?.year : "",
      major: admin?.major ? admin.major : "",
      role: "user",
      completed: admin?.completed ? admin.completed : 0,
    })
    setAdminUsers(adminUsersData.filter((e, i) => i !== index));
  }

  const indexOfLastAdmin = (currentPage + 1) * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = adminUsersData.slice(indexOfFirstAdmin, indexOfLastAdmin);

  return (
    <><div style={{ maxHeight: '400px', overflowY: 'auto', width: '100%' }}>

          <TableContainer component={Paper} style={{ margin: '10px', padding: '10px' }}>
          <Grid container>
          <Grid item xs={3}>
            <Typography fontWeight={600}>Administrators:</Typography>
          </Grid>
        </Grid>
              <Table style={{ minWidth: 650, fontSize: '14px' }}>
                  <TableHead>
                      <TableRow >
                          <TableCell>Email</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Year</TableCell>
                          <TableCell>Major</TableCell>
                          {/* <TableCell>Role</TableCell> */}
                          {/* <TableCell>Completed</TableCell> */}
                          <TableCell>Remove Privileges</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {currentAdmins.map((admin:AdminUser, index:number) => (
                          <TableRow key={index}>
                              <TableCell>{admin.email}</TableCell>
                              <TableCell>{admin.name}</TableCell>
                              <TableCell>{admin.year}</TableCell>
                              <TableCell>{admin.major}</TableCell>
                              <TableCell>
                                <Button   onClick={() => removeAdmin(admin, index)}>
                                  Confirm
                                </Button>
                              </TableCell>
                              
                              {/* <TableCell>{admin.role}</TableCell> */}
                              {/* <TableCell>{admin.completed}</TableCell> */}
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div><div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                  value={itemsPerPage}
                  onChange={handleChangeItemsPerPage}
                  style={{ marginTop: '10px' }}
              >
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                          {`${option} per page`}
                      </MenuItem>
                  ))}
              </Select>

              <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={adminUsersData.length}
                  rowsPerPage={itemsPerPage}
                  page={currentPage}
                  onPageChange={handlePageChange} />
          </div></>
    
  );
};

export default AdminUsersTable;