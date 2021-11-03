import { React, Component } from "react";
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Typography, }
    from "@material-ui/core";
import {Paper} from "@material-ui/core";
import { Dropdown } from 'semantic-ui-react'

class BookList extends Component {

    constructor(props) {
            super(props);
            this.state = {
                books: [],
                loading: true,
                input: '',
                genres: [],
                genreQuery: '',
            }
            this.updateInput = this.updateInput.bind(this);
            this.handleTitleClick = this.handleTitleClick.bind(this);
            this.filterBooks = this.filterBooks.bind(this);
        }


    async componentDidMount() {
        const response = await fetch('/api/books');
        const body = await response.json();
        this.setState({books: body});
        this.setState({books: this.sortAlphabeticallyByTitle(this.state.books)});
        
                let splitByColon = []
                let genreString = ''
                for (var i = 0; i < this.state.books.length; i++) {
                    const genre = JSON.stringify(this.state.books[i],["genre"]);
                    splitByColon = genre.split(':');
                    genreString = splitByColon[1];
                    genreString = genreString.replace('}', '').replaceAll('"', '').replace('_', ' ');
                    let separated = genreString.split(' ');
                    for (var j = 0; j < separated.length; j++) {
                        separated[j] = separated[j].charAt(0).toUpperCase() + separated[j].slice(1);
                        let combined = separated.join(' ');
                        if (combined === 'Null')
                            combined = 'N/A';
                        this.state.books[i].genre = combined;

                        if (this.state.genres.indexOf(combined) === -1 && j=== separated.length-1) {
                            this.state.genres.push(combined);
                        }
                    }
        
                    if (this.state.books[i].author === null) {
                        this.state.books[i].author = 'N/A';
                    }
        
                }

        if (this.state.books != null)
        {
            this.setState({loading: false});
        }
    }

    updateInput(event) {
        this.setState({input: event.target.value});
    }

    handleTitleClick(event) {
        if (event.target.className === 'angle down icon') {
            event.target.className = 'angle up icon';
            this.sortAlphabeticallyByTitleDesc(this.state.books);
        }
        else {
            event.target.className = 'angle down icon';
            this.sortAlphabeticallyByTitle(this.state.books);
        }
    }

    filterBooks() {
        let books = this.state.books;

        books = books.filter((val)=>{
                                        if(this.state.input === "") {
                                            return val;
                                        }
                                        else if (val.title.toLowerCase().includes(this.state.input.toLowerCase())) {
                                            return val;
                                        }
                                       });

        books = books.filter((val)=>{
                                        if(this.state.genreQuery.length === 0) {
                                           return val;
                                       }
                                        else if (this.state.genreQuery.some( g => val.genre.includes(g))) {
                                           return val;
                                        }
                                       });

        return books;
    }

    handleGenreChange = (e, {genreQuery,value}) => {
        this.setState({genreQuery: value})
        }

    handleGenreSearchChange = (e, {genreQuery,value}) => {
                                      this.setState({genreQuery: value})
                                      console.log(this.state.genreQuery)
                                      }

    compareStrings(a, b) {
          // Assuming you want case-insensitive comparison
          a = a.toLowerCase();
          b = b.toLowerCase();

          return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    sortAlphabeticallyByTitle(list) {
        let n = list.length;
        for (var i = 0; i < n-1; i++) {

            for (var j = 0; j < n-i-1; j++) {
                if ( this.compareStrings(list[j].title, list[j+1].title) > 0 ) {
                    let temp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }
        this.forceUpdate();

        return (list);

    }

    sortAlphabeticallyByTitleDesc(list) {
            let n = list.length;
            for (var i = 0; i < n-1; i++) {

                for (var j = 0; j < n-i-1; j++) {
                    if ( this.compareStrings(list[j].title, list[j+1].title) < 0 ) {
                        let temp = list[j];
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
            this.forceUpdate();

            return (list);

        }

    render() {
        let books = this.filterBooks();

        let genresMap = this.state.genres.map( (genre, index) => ({
            key: index,
            text: genre,
            value: genre,
        }) )

        return (
            <Paper elevation={3} className="book-list">
                <Typography variant="h4" color="inherit" component="div">
                    <b>List of Books</b>
                </Typography>
                <br/>
                <div className="ui icon input"><input type="text" onChange={this.updateInput} placeholder="Search..."/><i aria-hidden="true" className="search icon"></i></div>
                <br/>
                <br/>
                <Dropdown
                    placeholder='Filter by genres...'
                    fluid
                    multiple
                    search
                    selection
                    options={genresMap}
                    onChange={this.handleGenreChange}
                  />
                <br/>
                {this.state.loading ? <div><br/><Typography variant="h6">Loading, please wait...</Typography></div> :
                books.length === 0 ? <div><br/><Typography variant="h6">No results found.</Typography></div> :
                <TableContainer>
                    <Table sx={{minWidth: 0}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                <Typography variant="body2" color="inherit" component="div">
                                    Title <i onClick={this.handleTitleClick} className='angle down icon'/>
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