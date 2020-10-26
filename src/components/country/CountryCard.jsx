import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardMedia } from "@material-ui/core";
import WeatherInfoModal from "../weather/WeatherInfoModal";
import { WEATHER_API_ACCESS_KEY, WEATHER_API_BASE_URL } from "../../utils/constants";
import Axios from "axios";
import { ERROR_FETCHING_WEATHER } from "../../utils/messages";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    media: {
        height: 140,
    },
});

const CountryCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const [capitalWeatherInfo, setCapitalWeatherInfo] = useState({});
    const { country } = props;
    const classes = useStyles();

    const handleClickOpen = (currentCountry) => {
        const apiEndpoint = `current?access_key=${WEATHER_API_ACCESS_KEY}&query=${currentCountry.capital}`;
        Axios.get(WEATHER_API_BASE_URL + apiEndpoint)
            .then((response) => {
                const { data } = response;
                setCapitalWeatherInfo(data.current);
                setOpen(true);
            })
            .catch((error) => {
                setOpen(false);
                alert(ERROR_FETCHING_WEATHER);
                console.log(error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={country.flag}
                        title={country.name}
                    />
                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Capital - {country.capital}
                        </Typography>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Latlong - {country.latlng[0] + ", " + country.latlng[1]}
                        </Typography>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >
                            Population - {country.population}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        onClick={() => handleClickOpen(country)}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Capital Weather
                    </Button>
                </CardActions>
            </Card>
            <WeatherInfoModal
                open={open}
                handleClose={handleClose}
                capitalWeatherInfo={capitalWeatherInfo}
            />
        </div>
    );
};

export default CountryCard;
