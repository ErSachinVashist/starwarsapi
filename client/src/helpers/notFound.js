import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {notFoundCss} from './componentStyle';
class NotFound extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHead}
                    title='404'
                    subheader='Page Not Found'
                />
            </Card>
        );
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(notFoundCss)(NotFound);
