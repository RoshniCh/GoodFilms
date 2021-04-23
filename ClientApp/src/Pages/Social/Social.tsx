import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Social.scss';
import { Timeline } from 'react-twitter-widgets';
import InstagramEmbed from 'react-instagram-embed';

export function Social() : JSX.Element {
return (
    <div>
        <div className="content-sub-container">
        <h1 className="title">GoodFilms - The Home of Indian Movies!</h1>
        </div>
        <div className="left-and-right-container">
        <div className="content-sub-container-half">
            <h2 className="sub-heading"> Bollywood Tweets</h2>
                <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'Bollyhungama'
                }}
            />
        </div>
        <div className="content-sub-container-half">
            <h2 className="sub-heading"> Listen to popular Radio </h2><br/>
            <h2 className="sub-heading"> Hits Of Bollywood </h2>
            <iframe
                    width="500px"
                    src='https://liveonlineradio.net/hits-of-bollywood'
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
            </iframe><br/><br/>
            <h2 className="sub-heading"> Vividh Bharathi!! </h2>
            <iframe
                    width="500px"
                    src='https://liveonlineradio.net/vividh-bharti-online'
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
            </iframe><br/><br/>
            <h2 className="sub-heading"> Radio Mango </h2>
            <iframe
                    width="500px"
                    src='https://onlineradiofm.in/stations/mango'
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
            </iframe>
        </div>
        </div>
        {/* <div className="content-sub-container-half">
            <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                clientAccessToken='123|456'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
                />
        </div> */}
    </div>
);
}