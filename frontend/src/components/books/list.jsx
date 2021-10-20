import { React, Component } from "react";
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Typography, TextField }
    from "@material-ui/core";
import {Paper} from "@material-ui/core";

class BookList extends Component {

    state = {
        books: []
    };

    async componentDidMount() {
        const response = await fetch('/api/books');
        const body = await response.json();
        this.setState({books: body});
    }

    render() {
        const {books} = this.state;

        return (
            <Paper elevation={3} className="book-list">
                <Typography variant="h4" color="inherit" component="div">
                    <b>List of Books</b>
                </Typography>
                <TableContainer>
                    <Table sx={{minWidth: 0}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                <Typography variant="body2" color="inherit" component="div">
                                    Title
                                </Typography>
                                </TableCell>
                                <TableCell ><Typography variant="body2" color="inherit" component="div">
                                    Author
                                </Typography>
                                </TableCell>
                                <TableCell ><Typography variant="body2" color="inherit" component="div">
                                    Genre
                                </Typography></TableCell>
                                <TableCell ><Typography variant="body2" color="inherit" component="div">
                                  Published
                                </Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(book =>
                                <TableRow
                                    key={book.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}

export default BookList;