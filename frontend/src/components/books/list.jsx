import { React, Component } from "react";
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Typography, }
    from "@material-ui/core";
import {Paper} from "@material-ui/core";

class BookList extends Component {

    constructor(props) {
            super(props);
            this.state = {
                books: [],
                loading: true,
                input: '',
            }
            this.updateInput = this.updateInput.bind(this);
        }


    async componentDidMount() {
        const response = await fetch('/api/books');
        const body = await response.json();
        this.setState({books: body});
        if (this.state.books != null)
        {
            this.setState({loading: false});
        }
    }

    updateInput(event) {
        this.setState({input: event.target.value});
    }

    render() {
        let books = this.state.books;
        books = books.filter((val)=>{
                                        if(this.state.input === "") {
                                            return val;
                                        }
                                        else if (val.title.toLowerCase().includes(this.state.input.toLowerCase())) {
                                            return val;
                                        }
                                       });
        let stringBooks = JSON.stringify(books);
        stringBooks = stringBooks.replace(/_/g,' ');
        books = JSON.parse(stringBooks);
        let splitByColon = []
        let genreString = ''
        for (var i = 0; i < books.length; i++) {
            const genre = JSON.stringify(books[i],["genre"]);
            splitByColon = genre.split(':');
            genreString = splitByColon[1];
            genreString = genreString.replace('}', '').replaceAll('"', '');
            let separated = genreString.split(' ');
            for (var j = 0; j < separated.length; j++) {
                separated[j] = separated[j].charAt(0).toUpperCase() + separated[j].slice(1);
                let combined = separated.join(' ');
                console.log(combined);
                if (combined === 'Null')
                    combined = 'N/A';
                books[i].genre = combined;
            }

        }

        return (
            <Paper elevation={3} className="book-list">
                <Typography variant="h4" color="inherit" component="div">
                    <b>List of Books</b>
                </Typography>
                <br/>
                <div className="ui icon input"><input type="text" onChange={this.updateInput} placeholder="Search..."/><i aria-hidden="true" className="search icon"></i></div>
                <br/>
                {this.state.loading ? <div><br/><Typography variant="h6">Loading, please wait...</Typography></div> :
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
                                    key={book.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Paper>
        );
    }
}

export default BookList;