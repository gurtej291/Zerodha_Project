import React from 'react'

function Education() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/images/education.svg' alt='education' style={{width:"70%"}}/>
                </div>
                <div className='col-6 p-5 mt-4'>
                    <h1 className='fs-2 mb-3'>Free and open market education</h1>
                    <p className='mb-3'>
                    Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>
                    <a href='' style={{textDecoration:"none"}}>Versity <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <p className='mb-3 mt-5'>
                    TradingQ&A, the most active trading and investment community in India for all your market related queries.                    </p>
                    <a href='' style={{textDecoration:"none"}}>TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
     );
}

export default Education;