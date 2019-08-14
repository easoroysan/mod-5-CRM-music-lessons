import React from 'react'
import LoginForm from '../components/login';


export function Home(){
    return <div>
        <h2 className="ui icon center aligned header">
            <i aria-hidden="true" className="music circular icon"></i>
            Welcome to Easo's Music Lessons Scheduler
            <div className="sub header">A new and personalized application for music schools</div>
        </h2>
        <div className="ui divider"></div>
        <LoginForm />
        <div className="ui divider"></div>
        <br/>
        <div className="ui text container">
            <h2 className="ui header">What is Easo's Music Lessons Scheduler?</h2>
            <p>Easo Scheduler is an application developed by Roysan Easo. This application is primarily used to organize students for a music school and keep track of information such as lessons, attendance, and so on. It is also designed to make the enrollment process easier by doing things like automatically sending emails upon enrollment. Because it is in the early development stages, Roysan is able to add or change features to accomodate users upon request.</p>
        </div>
        <br/><br/>
        <div className="ui text container">
            <h2 className="ui header">How much does it cost?</h2>
            <p>Because this application has only recently been created and is only managed by one person, it is currently free!</p>
        </div>
        <br/><br/>
        <div className="ui text container">
            <h2 className="ui header">How do I get started?</h2>
            <p>Simply send an email to easo.applications@gmail.com and Roysan will keep direct contact with you to answer any questions you may have and set up an account for you.</p>
        </div>
        <br/>
    </div>
}