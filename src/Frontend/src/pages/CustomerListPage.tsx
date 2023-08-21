import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  interface DepaInterface
  {
    code: string;
    description: string;
  }

  interface CustomerListQuery {
    id: number;
    firstName: string;
    address: string;
    email: string;
    phone: string;
    depa: DepaInterface
  }
 

  export default function CustomerListPage() {
    const [list, setList] = useState<CustomerListQuery[]>([]);
    const [filter, setFilter] = useState("");
    

    const [clickedButton, setClickedButton] = useState('');

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };


    useEffect(() => {
      fetch("/api/employees/list?FirstName=" + filter)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setList(result as CustomerListQuery[])
        });
    }, []);  

    

    return (
      <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
          Customers
        </Typography>
        
        <div className ="App">
          <h4 className="title">Filtro</h4>
          <small className="subtitle">Search by name</small>
          <input type="text" id="filter" placeholder="Search" onChange={(e) => setFilter(e.target.value)}  value={filter}></input>

          <button onClick={buttonHandler} className="button" name="button 1">
          Button 1
        </button>


        </div>
        <h1>
        {clickedButton !== ""
          ? `You have clicked "${filter}"` 
          : "No button clicked yet"}
      </h1>
 
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Address</StyledTableHeadCell>
                <StyledTableHeadCell>Email</StyledTableHeadCell>
                <StyledTableHeadCell>Phone</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  
  const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  }));
  