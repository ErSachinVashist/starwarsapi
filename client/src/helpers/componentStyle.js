import {red} from "@material-ui/core/colors";

const headerCss = (theme) => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'block',
        color: 'white',
        fontFamily: "'Kaushan Script', cursive"
    },
    linkStyle: {
        color: 'white',
        textDecoration: 'none'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
})

const loginCss = (theme) => ({
    paper: {
        padding: 20,
        minHeight: 300,
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        margin: '0 auto',
        position: 'relative'
    },
    avatar: {
        left: '37%',
        border: '8px solid white',
        top: -50,
        height: 100,
        width: 100,
        background: 'slategrey',
        position: 'absolute'
    },
    form: {
        marginTop: '15%',
        textAlign: 'center'
    },
    subButton: {
        marginTop: 10,
    }
});

const userCss = (theme) => ({
    paper: {
        padding: 20,
        minHeight: 300,
        position: 'relative'
    },
    mainPaper: {
        background: 'whitesmoke',
        height: 340,
        overflow: 'auto'
    },
    userCard: {
        width: '98%',
        margin: '5px auto'
    },
    form: {
        textAlign: 'center'
    },
    subButton: {
        marginTop: 10,
    }
});


const navCss = (theme) => ({
    card: {}

});
const searchCss = (theme) => ({
    rootPaper: {
        minHeight: 290
    },
    detailCard: {
        position: 'relative',
        height: 290
    },
    detailCardHead: {
        padding:'10px 10px 0px 10px'
    },
    detailCardContent:{
        padding:'10px 10px 0px 10px'
    },
    catTitle: {
        fontWeight:'bolder',
        fontSize: 25,
        padding: 10,
        color:'brown'
    },
    detailAvatar: {
        backgroundColor: red[500],
    },
    searchField: {
        background: 'white',
        margin: 0
    },
    searchIcon: {
        margin: '0px 0px 0px 5px'
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {},
    selectRoot: {
        padding: 9,
        background: 'white'
    },
    detailsPaper: {
        background: 'white'
    }
});
const notFoundCss = (theme) => ({
    card: {
        maxWidth: 400,
        margin: '14vh auto',
        [theme.breakpoints.down('xs')]: {
            width: 300
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardHead: {
        textAlign: 'center'
    }

});


export {
    headerCss,
    notFoundCss,
    loginCss,
    userCss,
    navCss,
    searchCss
}
