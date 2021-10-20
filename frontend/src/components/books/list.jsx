import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Typography, TextField }
    from "@material-ui/core";
import {Paper} from "@material-ui/core";





export default function BookList() {
    const coverStyle = {
        maxWidth: '150px',
        maxHeight: '150px',
    }
    function createData(cover, title, author, Genre, year) {
        return {cover, title, author, Genre, year};
    }
    // mock data
    const rows = [
        createData('http://prodimage.images-bn.com/pimages/9781499369748_p0_v3_s1200x630.jpg',
                    'Pride and Prejudice', 'Jane Austen', 'Romance', '1813'),
        createData('https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg',
                    'To Kill a Mockingbird', 'Harper Lee', 'Bildungsroman', '1960'),
        createData('https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
                    'The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy', '1925'),
        createData('https://images-na.ssl-images-amazon.com/images/I/71IWwBoDNsL.jpg',
                    'One Hundred Years of Solitude', 'Gabriel García Márquez', 'Magic Realism', '1967'),
    ];
    return (
        <Paper elevation={3} className="book-list">
            <Typography variant="h4" color="inherit" component="div">
                <b>List of Books</b>
            </Typography>
            
            <TextField id='standard-basic' label='Search for a book'/>

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
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >   
                                <TableCell component="th" scope="row">
                                            {row.title}
                                </TableCell>
                                <TableCell >{row.author}</TableCell>
                                <TableCell >{row.Genre}</TableCell>
                                <TableCell >{row.year}</TableCell>
                                <TableCell>
                                    <img src={row.cover} style={coverStyle}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>

    );
}