import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function RecipeReviewCard(props) {
    const {classes,searchData,FetchSwapData} = props,data=searchData.searchData;
    let finalObj={
        title:'No information found',
        subheader:'suggestion : please check spellings or right correct ID',
        content :'',
        icon:'',
        urls:[]
    };

    if(data && Object.keys(data).length>0){
        finalObj=data.error?
            {
                title:'Some problem occured with SWAPI',
                subheader:data.error,
                content :'',
                icon:'',
                urls:[]
            }
            :(function(){
            switch (searchData.searchCat) {
                case 'films':return {
                    title:data.title,
                    subheader:`By ${data.director} / Release Date : ${data.release_date}`,
                    content :<span>
                        <p>Producer : {data.producer}</p>
                        {data.opening_crawl}</span>,
                    icon:'',
                    urls:['characters','planets','species','starships','vehicles']
                };
                case 'people': return {
                    title:data.name,
                    subheader:`Birth year:${data.birth_year}`,
                    content :<ul>
                        <li>Gender : {data.gender}</li>
                        <li>Height : {data.height} cm</li>
                        <li>Mass : {data.mass}</li>
                        <li>Hair Color : {data.hair_color}</li>
                        <li>Eye Color : {data.eye_color}</li>
                        <li>Skin Color : {data.skin_color}</li>
                    </ul>,
                    icon:'',
                    urls:['homeworld','species','starships','vehicles','films']

                };
                case 'planets': return {
                    title:data.name,
                    subheader:`Population :${data.population}`,
                    content :<ul>
                        <li>Climate : {data.climate}</li>
                        <li>Terrain : {data.terrain}</li>
                        <li>Diameter : {data.diameter}</li>
                        <li>Gravity : {data.gravity}</li>
                        <li>Orbital Peroid : {data.orbital_period}</li>
                        <li>Rotation Period : {data.rotation_period}</li>
                        <li>Surface Water : {data.surface_water}</li>
                    </ul>,
                    icon:'',
                    films:['films','residents','people']
                };
                case 'species': return {
                    title:data.name,
                    subheader:data.designation,
                    content :<ul>
                        <li>Hair Color : {data.language}</li>
                        <li>Classification : {data.classification}</li>
                        <li>Height : {data.average_height}</li>
                        <li>Lifespan : {data.average_lifespan}</li>
                        <li>Hair Color : {data.hair_colors}</li>
                        <li>Eye Color : {data.eye_colors}</li>
                        <li>Skin Color : {data.skin_colors}</li>
                    </ul>,
                    icon:'',
                    urls:['films','homeworld','people']

                };
                case 'starships': return {
                    title:data.name,
                    subheader:data.manufacturer,
                    content :<ul>
                        <li>Model : {data.model}</li>
                        <li>Starship Class : {data.starship_class}</li>
                        <li>Capacity : {data.cargo_capacity}</li>
                        <li>Consumable : {data.consumables}</li>
                        <li>Cost : {data.cost_in_credits}</li>
                        <li>Crew : {data.crew}</li>
                        <li>Length : {data.length}</li>
                    </ul>,
                    icon:'',
                    urls:['films']
                };
                case 'vehicles': return  {
                    title:data.name,
                    subheader:data.manufacturer,
                    content :<ul>
                        <li>Model : {data.model}</li>
                        <li>Capacity : {data.cargo_capacity}</li>
                        <li>Consumable : {data.consumables}</li>
                        <li>Cost : {data.cost_in_credits}</li>
                        <li>Crew : {data.crew}</li>
                        <li>Passengers : {data.passengers}</li>
                        <li>Length : {data.length}</li>
                        <li>Vehicle Class : {data.vehicle_class}</li>
                    </ul>,
                    icon:'',
                    urls:['films']

                };
                default : //

            }
        })()

    }

    return (
        <>
            <Typography variant='h2' className={classes.catTitle} align='right'>{searchData.searchCat.toUpperCase()}</Typography>
        <Card className={classes.detailCard}>
            <CardHeader
                className={classes.detailCardHead}
                avatar={
                    <Avatar aria-label="recipe" className={classes.detailAvatar} src={finalObj.icon}/>
                }
                title={finalObj.title}
                subheader={finalObj.subheader}
            />
            <CardContent className={classes.detailCardContent}>
                <Typography variant="body2" color="textSecondary" component="div">
                    {finalObj.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{position:'absolute',bottom:0}}>
                {finalObj.urls && finalObj.urls.map((url,index)=>{
                    return <Button key={index}
                    onClick={()=>{
                         if(data[url] && data[url].length>0){
                             let keysArray=[]
                             if(Array.isArray(data[url]) && data[url].length>0){
                                 keysArray=data[url][0]
                             }
                             keysArray=keysArray.split('/')
                             keysArray=keysArray.slice(keysArray.length-3,keysArray.length-1)
                             FetchSwapData({searchCat:keysArray[0],searchKey:keysArray[1]})
                         }
                    }}
                    >{url}</Button>
                })}
            </CardActions>
        </Card>
            </>
    );
}
