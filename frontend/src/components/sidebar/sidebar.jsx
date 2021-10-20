import { Typography, Paper} from "@material-ui/core";

function Link(props) {
    const linkStyle = {
        textDecoration: 'none',
        padding: '10px 0 10px 0',
        textAlign: 'left'
    }
    return (
        <div style={linkStyle}>
            <Typography variant="h6" color="inherit" component="div">
                {props.text}
            </Typography>
        </div>

    )
}

export default function Sidebar() {
    const linkText = ['Add New Book', 'Categories', 'Tags']
    return (
        <Paper elevation={3} className="sidebar">
            {linkText.map(item => {
                return(
                <Link text={item} />
            )})}
        </Paper>
    )
}