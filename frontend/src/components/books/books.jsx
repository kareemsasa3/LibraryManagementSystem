import { Grid } from '@material-ui/core';
import React from 'react';
import Sidebar from '../sidebar/sidebar';
import BookList from './list';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={0} md={1} />
                    <Grid item sm={2} md={2}>
                        <Sidebar />
                    </Grid>
                    <Grid item sm={9} md={8}>
                        <BookList />
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Books;