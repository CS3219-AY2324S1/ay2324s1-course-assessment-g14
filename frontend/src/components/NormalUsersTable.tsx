import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TablePagination, SelectChangeEvent, Grid, Typography, Button } from '@mui/material';
import { useData } from '../data/data.context';
import { updateUser } from '../api/user';

interface NormalUser {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10]; // Number of items to display per page

const NormalUsersTable: React.FC = () => {
  const [normalUsersData, setNormalUsers] = useState<NormalUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);
  const { normalUsers, getNormalUsers } = useData();

  useEffect(() => {
    async function getUsers() {
      getNormalUsers();
    }
    getUsers();
  }, []);

  useEffect(() => {
    setNormalUsers(normalUsers);
    console.log('check')
  }, [normalUsers]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeItemsPerPage = (
    event: SelectChangeEvent<unknown>,
  ) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(0);
  };
  
  const giveAdmin = async (user: NormalUser, index: number) => {
    await updateUser({
      email: user?.email ? user?.email : "",
      name: user?.name ? user?.name : "",
      year: user?.year ? user?.year : "",
      major: user?.major ? user.major : "",
      role: "admin",
      completed: user?.completed ? user.completed : 0,
    })
    setNormalUsers(normalUsersData.filter((e, i) => i !== index));
  }

  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = normalUsersData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <><div style={{ maxHeight: '400px', overflowY: 'auto', width: '100%' }}>

          <TableContainer component={Paper} style={{ margin: '10px', padding: '10px' }}>
          <Grid container>
          <Grid item xs={3}>
            <Typography fontWeight={600}>Normal Users:</Typography>
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
                          <TableCell>Grant Privileges</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {currentUsers.map((user:NormalUser, index:number) => (
                          <TableRow key={index}>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.year}</TableCell>
                              <TableCell>{user.major}</TableCell>
                              <TableCell>
                                <Button   onClick={() => giveAdmin(user, index)}>
                                  Confirm
                                </Button>
                              </TableCell>
                              
                              {/* <TableCell>{user.role}</TableCell> */}
                              {/* <TableCell>{user.completed}</TableCell> */}
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
                  count={normalUsersData.length}
                  rowsPerPage={itemsPerPage}
                  page={currentPage}
                  onPageChange={handlePageChange} />
          </div></>
    
  );
};

export default NormalUsersTable;