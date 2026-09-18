import React from 'react'

function Awards() {
    return ( 
        <div className='container mt-s'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/images/largestBroker.svg' alt='largestBroker'/>
                </div>
                <div className='col-6 p-5 mt-4'>
                    <h1 className='fs-2'>Largest stocks Brokerage in India</h1>
                    <p className='mb-5'>
                        2+ million Zerodha clients contribute to over 15% of all retail order volumes in India dily by trading and investing in:
                    </p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    <p>Future and Options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    <p>Stocks & IPOs</p>
                                </li>
                                <li>
                                    <p>Direct Mutual funds</p>
                                </li>
                                <li>
                                    <p>Bonds and Government securities</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src='media/images/pressLogos.png' alt='pressLogo' style={{width:"90%"}} />
                </div>
            </div>
        </div>
     );
}

export default Awards;