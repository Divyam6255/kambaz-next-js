import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Lab2Page() {
    return (
        <div className="container-fluid p-3">
            <h1><b>Lab 2</b></h1>
            <nav className="mb-4">
                <b>
                    <a href="#css-selectors">CSS Selectors</a> |{" "}
                    <a href="#css-colors">Colors</a> |{" "}
                    <a href="#css-borders">Borders</a> |{" "}
                    <a href="#css-margins">Margins</a> |{" "}
                    <a href="#css-corners">Corners</a> |{" "}
                    <a href="#css-dimensions">Dimensions</a> |{" "}
                    <a href="#css-position">Position</a> |{" "}
                    <a href="#css-float">Float</a> |{" "}
                    <a href="#css-grid">Grid</a> |{" "}
                    <a href="#css-flex">Flex</a> |{" "}
                    <a href="#react-icons">Icons</a> |{" "}
                    <a href="#bootstrap">Bootstrap</a>
                </b>
            </nav>

            <div id="css-selectors" className="mb-5">
                <h2><b>CSS Selectors</b></h2>
                
                <h3>ID Selectors</h3>
                <p id="wd-p-id-1" style={{ color: 'white', backgroundColor: 'red', padding: '10px' }}>
                    White on red paragraph using ID selector
                </p>
                <p id="wd-p-id-2" style={{ color: 'black', backgroundColor: 'yellow', padding: '10px' }}>
                    Black on yellow paragraph using ID selector
                </p>

                <h3>Class Selectors</h3>
                <p className="wd-bg-yellow wd-fg-blue" style={{ color: 'blue', backgroundColor: 'yellow', padding: '10px' }}>
                    Blue on yellow paragraph using class selectors
                </p>
                <h4 className="wd-bg-yellow wd-fg-blue" style={{ color: 'blue', backgroundColor: 'yellow', padding: '10px' }}>
                    Blue on yellow heading using class selectors
                </h4>

                <h3>Document Structure</h3>
                <div style={{ color: 'white', backgroundColor: 'red', padding: '20px', margin: '10px 0' }}>
                    White on red DIV
                    <span style={{ color: 'blue', backgroundColor: 'yellow', padding: '5px', fontSize: '12px', marginLeft: '10px' }}>
                        Blue on yellow small span within the DIV
                    </span>
                </div>
            </div>

            <div id="css-colors" className="mb-5">
                <h2><b>CSS Colors</b></h2>
                
                <h3>Foreground Color</h3>
                <h4 style={{ color: 'blue' }}>Blue on white heading</h4>
                <p style={{ color: 'red' }}>Red on white text</p>
                <p style={{ color: 'green' }}>Green on white text</p>

                <h3>Background Color</h3>
                <h4 style={{ color: 'white', backgroundColor: 'blue', padding: '10px' }}>White on blue heading</h4>
                <p style={{ color: 'black', backgroundColor: 'red', padding: '10px' }}>Black on red paragraph</p>
                <span style={{ color: 'white', backgroundColor: 'green', padding: '5px' }}>White on green span</span>
            </div>

            <div id="css-borders" className="mb-5">
                <h2><b>CSS Borders</b></h2>
                <p style={{ border: '10px solid red', padding: '10px', margin: '10px 0' }}>
                    Fat red border
                </p>
                <p style={{ border: '4px dashed blue', padding: '10px', margin: '10px 0' }}>
                    Thin blue dashed border
                </p>
            </div>

            <div id="css-margins" className="mb-5">
                <h2><b>CSS Margins and Padding</b></h2>
                <div style={{ border: '10px solid red', backgroundColor: 'yellow', paddingTop: '30px', paddingLeft: '30px', margin: '10px 0' }}>
                    Fat red border with yellow background and big padding above and left
                </div>
                <div style={{ border: '10px solid blue', backgroundColor: 'yellow', paddingBottom: '30px', margin: '10px 0' }}>
                    Fat blue border with yellow background and big padding at bottom
                </div>
                <div style={{ border: '10px solid yellow', backgroundColor: 'blue', padding: '30px', margin: '10px 0' }}>
                    Fat yellow border with blue background and big padding all around
                </div>
                <div style={{ border: '10px solid red', backgroundColor: 'yellow', marginBottom: '30px' }}>
                    Fat red border with yellow background and margin at bottom
                </div>
                <div style={{ border: '10px solid blue', backgroundColor: 'yellow', margin: '0 auto', width: '50%' }}>
                    Fat blue border with yellow background and centered because margins on both sides
                </div>
                <div style={{ border: '10px solid yellow', backgroundColor: 'blue', margin: '30px' }}>
                    Fat yellow border with blue background and big margins all around
                </div>
            </div>

            <div id="css-corners" className="mb-5">
                <h2><b>CSS Rounded Corners</b></h2>
                <div style={{ border: '2px solid black', padding: '20px', margin: '10px 0', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                    Div with rounded corners at top left and right
                </div>
                <div style={{ border: '2px solid black', padding: '20px', margin: '10px 0', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                    Div with rounded corners at bottom left and right
                </div>
                <div style={{ border: '2px solid black', padding: '20px', margin: '10px 0', borderRadius: '15px' }}>
                    Div with all rounded corners
                </div>
                <div style={{ border: '2px solid black', padding: '20px', margin: '10px 0', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                    Div with rounded corners all around except top right
                </div>
            </div>

            <div id="css-dimensions" className="mb-5">
                <h2><b>CSS Dimensions</b></h2>
                <div style={{ backgroundColor: 'yellow', width: '100px', height: '200px', margin: '10px', display: 'inline-block' }}>
                    Yellow DIV taller than it's longer
                </div>
                <div style={{ backgroundColor: 'blue', width: '200px', height: '100px', margin: '10px', display: 'inline-block' }}>
                    Blue DIV longer than it's taller
                </div>
                <div style={{ backgroundColor: 'red', width: '150px', height: '150px', margin: '10px', display: 'inline-block' }}>
                    Red DIV height same as width
                </div>
            </div>

            <div id="css-position" className="mb-5">
                <h2><b>CSS Position</b></h2>
                
                <h3>Relative Position</h3>
                <div style={{ position: 'relative', backgroundColor: 'yellow', top: '10px', left: '10px', width: '200px', height: '100px' }}>
                    Yellow DIV with text nudged down and right
                </div>
                <div style={{ position: 'relative', backgroundColor: 'blue', top: '-10px', right: '-20px', width: '200px', height: '100px' }}>
                    Blue DIV moved up and right a bit
                </div>

                <h3>Absolute Position</h3>
                <div style={{ position: 'relative', height: '400px', border: '1px solid #ccc' }}>
                    <div style={{ position: 'absolute', backgroundColor: 'yellow', width: '100px', height: '200px', top: '50px', left: '50px' }}>
                        Portrait
                    </div>
                    <div style={{ position: 'absolute', backgroundColor: 'blue', width: '200px', height: '100px', top: '100px', left: '200px', zIndex: 10 }}>
                        Landscape
                    </div>
                    <div style={{ position: 'absolute', backgroundColor: 'red', width: '150px', height: '150px', top: '150px', left: '350px' }}>
                        Square
                    </div>
                </div>

                <h3>Fixed Position</h3>
                <div style={{ position: 'fixed', backgroundColor: 'blue', color: 'white', padding: '10px', top: '200px', right: '20px', zIndex: 1000 }}>
                    Blue Fixed position rectangle
                </div>
            </div>

            <div id="css-float" className="mb-5">
                <h2><b>CSS Floating</b></h2>
                
                <h3>Floating Elements</h3>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'left', backgroundColor: 'yellow', width: '100px', height: '100px', margin: '10px' }}>1</div>
                    <div style={{ float: 'left', backgroundColor: 'blue', width: '100px', height: '100px', margin: '10px' }}>2</div>
                    <div style={{ float: 'left', backgroundColor: 'red', width: '100px', height: '100px', margin: '10px' }}>3</div>
                </div>

                <h3>Image Float</h3>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', backgroundColor: 'green', width: '200px', height: '100px', margin: '10px' }}>
                        Image on the right
                    </div>
                    <p>This text wraps around the floated image on the right side of the container.</p>
                </div>
            </div>

            <div id="css-grid" className="mb-5">
                <h2><b>CSS Grid Layout</b></h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div style={{ backgroundColor: 'red', padding: '20px' }}>Grid Item 1</div>
                    <div style={{ backgroundColor: 'blue', padding: '20px' }}>Grid Item 2</div>
                    <div style={{ backgroundColor: 'green', padding: '20px' }}>Grid Item 3</div>
                    <div style={{ backgroundColor: 'yellow', padding: '20px' }}>Grid Item 4</div>
                    <div style={{ backgroundColor: 'purple', padding: '20px' }}>Grid Item 5</div>
                    <div style={{ backgroundColor: 'orange', padding: '20px' }}>Grid Item 6</div>
                </div>
            </div>

            <div id="css-flex" className="mb-5">
                <h2><b>CSS Flexbox</b></h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ backgroundColor: 'red', padding: '20px', flex: 1 }}>Column 1</div>
                    <div style={{ backgroundColor: 'blue', padding: '20px', flex: 1 }}>Column 2</div>
                    <div style={{ backgroundColor: 'green', padding: '20px', flex: 1 }}>Column 3</div>
                </div>
            </div>

            <div id="react-icons" className="mb-5">
                <h2><b>React Icons</b></h2>
                <div style={{ fontSize: '2rem', display: 'flex', gap: '20px' }}>
                    <span>🏠</span>
                    <span>⭐</span>
                    <span>💖</span>
                    <span>🔔</span>
                    <span>⚙️</span>
                    <span>👤</span>
                </div>
            </div>

            <div id="bootstrap" className="mb-5">
                <h2><b>Bootstrap Components</b></h2>

                <h3>Bootstrap Containers</h3>
                <div className="container border p-3 mb-3">
                    <p>Container with thin padding all around Lab 2</p>
                </div>

                <h3>Bootstrap Grid</h3>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-6 bg-primary text-white p-3">Left Half</div>
                        <div className="col-6 bg-secondary text-white p-3">Right Half</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4 bg-success text-white p-3">One Third</div>
                        <div className="col-8 bg-info text-white p-3">Two Thirds</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3 bg-warning p-3">Sidebar</div>
                        <div className="col-9 bg-light p-3">Main Content</div>
                    </div>
                </div>

                <h3>Bootstrap Responsive</h3>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 bg-primary text-white p-2 mb-2">A</div>
                    <div className="col-12 col-md-3 bg-secondary text-white p-2 mb-2">B</div>
                    <div className="col-12 col-md-3 bg-success text-white p-2 mb-2">C</div>
                    <div className="col-12 col-md-3 bg-danger text-white p-2 mb-2">D</div>
                </div>

                <div className="row mb-3">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="col-6 col-md-1 bg-info text-white p-2 mb-1 text-center">
                            {i + 1}
                        </div>
                    ))}
                </div>

                <div className="position-fixed bottom-0 end-0 bg-dark text-white p-2" style={{ fontSize: '12px' }}>
                    <span className="d-block d-sm-none">XS</span>
                    <span className="d-none d-sm-block d-md-none">SM</span>
                    <span className="d-none d-md-block d-lg-none">MD</span>
                    <span className="d-none d-lg-block d-xl-none">LG</span>
                    <span className="d-none d-xl-block">XL</span>
                </div>

                <h3>Bootstrap Tables</h3>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Quiz</th>
                                <th>Date</th>
                                <th>Score</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Q1</td>
                                <td>2024-01-15</td>
                                <td>85</td>
                                <td>Good performance on basic concepts</td>
                            </tr>
                            <tr>
                                <td>Q2</td>
                                <td>2024-01-22</td>
                                <td>90</td>
                                <td>Excellent understanding of advanced topics</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Bootstrap Lists</h3>
                <ul className="list-group mb-3">
                    <li className="list-group-item active">The Matrix</li>
                    <li className="list-group-item">Inception</li>
                    <li className="list-group-item">Interstellar</li>
                    <li className="list-group-item">The Dark Knight</li>
                </ul>

                <div className="list-group mb-3">
                    <a href="#" className="list-group-item list-group-item-action">The Great Gatsby</a>
                    <a href="#" className="list-group-item list-group-item-action">To Kill a Mockingbird</a>
                    <a href="#" className="list-group-item list-group-item-action">1984</a>
                </div>

                <h3>Bootstrap Forms</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="textarea" className="form-label">Message</label>
                    <textarea className="form-control" id="textarea" rows="3"></textarea>
                </div>

                <select className="form-select mb-3">
                    <option>Choose an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>

                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="switch1" />
                    <label className="form-check-label" htmlFor="switch1">Switch 1</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="range" className="form-label">Range</label>
                    <input type="range" className="form-range" id="range" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="text" className="form-control" placeholder="Amount" />
                    <span className="input-group-text">.00</span>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Horizontal on wide screens" />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Vertical on narrow screens" />
                    </div>
                </div>

                <h3>Bootstrap Navigation</h3>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <a className="nav-link active" href="#tab1">Tab 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#tab2">Tab 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#tab3">Tab 3</a>
                    </li>
                </ul>

                <ul className="nav nav-pills mb-3">
                    <li className="nav-item">
                        <a className="nav-link" href="/labs/lab1">Lab 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/labs/lab2">Lab 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/kanbas">Kanbas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/yourusername/repo" target="_blank">GitHub</a>
                    </li>
                </ul>

                <h3>Bootstrap Cards</h3>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Starship</h5>
                        <p className="card-text">SpaceX's Starship is a fully reusable transportation system designed to carry both crew and cargo to Earth orbit, the Moon, Mars, and beyond.</p>
                        <a href="#" className="btn btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
