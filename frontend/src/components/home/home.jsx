import React from 'react';
import Sidebar from '../sidebar/sidebar';
import { Grid, Typography } from '@material-ui/core';
import BookList from '../books/list';

class Home extends React.Component {
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
        );
    }
}
 
export default Home;