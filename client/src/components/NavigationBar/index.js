import './index.css';

const NavigationBar = () => {
    return(
        <div className="nav-main-content">
            <div className="nav-row">
                <div className="nav-world-text">
                    Where in the World?
                </div>
                <div className='nav-dark-mode'>
                    <nav>
                        <a href="#">Dark Mode</a>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;