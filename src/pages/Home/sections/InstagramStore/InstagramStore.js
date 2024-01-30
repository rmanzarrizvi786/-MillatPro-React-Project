import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';


const g1 = require('../../../../images/g1.jpg');
const g2 = require('../../../../images/g2.jpg');
const g3 = require('../../../../images/g3.jpg');
const g4 = require('../../../../images/g4.jpg');
const g5 = require('../../../../images/g5.jpg');
const g6 = require('../../../../images/g6.jpg');
const g7 = require('../../../../images/g7.jpg');



const InstagramStore = () => {
    return (
        <>
            <Box component='div' className='instamain'>
                <hr />
                <Box className='container_insta' component='div'>
                    <Typography variant='h2' className='heading_'>INSTAGRAM STORE</Typography>
                </Box>
                <Grid container fixed>
                    <Grid xs={6} sm={6} md={2} lg={2} item>
                        <Box className='image_box_container img_img_' component='div'>
                            <Box className='image_box_image ' component='img' src={g1}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                        <Box className='image_box_container img_img_ ' component='div'>
                            <Box className='image_box_image ' component='img' src={g2}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'>
                                    <FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid className='abc_1' xs={6} sm={6} md={6} lg={6} item>
                        <Box className='image_box_container_full img_img_' component='div'>
                            <Box className='image_box_image_full ' component='img' src={g3}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={6} sm={6} md={2} lg={2} item>
                        <Box className='image_box_container img_img_' component='div'>
                            <Box className='image_box_image ' component='img' src={g4}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                        <Box className='image_box_container img_img_' component='div'>
                            <Box className='image_box_image ' component='img' src={g5}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid className='abc' xs={6} sm={6} md={2} lg={2} item>
                        <Box className='image_box_container img_img_' component='div'>
                            <Box className='image_box_image ' component='img' src={g6}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                        <Box className='image_box_container img_img_' component='div'>
                            <Box className='image_box_image ' component='img' src={g7}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                    </Grid>
                     <Grid className='abc_2' xs={6} sm={6} md={6} lg={6} item>
                        <Box className='image_box_container_full img_img_' component='div'>
                            <Box className='image_box_image_full ' component='img' src={g3}></Box>
                            <Box component='div' className='image_hover_content'>
                                <Link className='heart_link'>280</Link>
                                <Link className='comment_link'><FontAwesomeIcon icon={faMessage} />22</Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default InstagramStore
