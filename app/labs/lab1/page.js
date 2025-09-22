export default function Lab1() {
    return (
        <div id="lab1" style={{ fontFamily: "Arial, sans-serif", margin: 24 }}>
            <h1><b>Lab 1</b></h1>
            <nav style={{ marginBottom: 24 }}>
                <b>
                    <a href="#lab1">Lab 1</a> |{" "}
                    <a href="#heading-tags">Heading Tags</a> |{" "}
                    <a href="#paragraph-tags">Paragraphs</a> |{" "}
                    <a href="#lists">Lists</a> |{" "}
                    <a href="#table-tags">Table</a> |{" "}
                    <a href="#images">Images</a> |{" "}
                    <a href="#forms">Form</a> |{" "}
                    <a href="#anchor-tag">Anchor</a>
                </b>
            </nav>

           <div id="paragraph-tags" style={{ marginBottom: 32 }}>
                <h2><b>Paragraph Tag</b></h2>
                <p id="wd-p-1">
                    This is a sample paragraph for demonstration purposes.
                </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to render the gaps.
                </p>
            </div>

            <div id="lists" style={{ marginBottom: 32 }}>
                <h2><b>Lists</b></h2>
                <div id="ordered-list-elements" style={{ marginBottom: 16 }}>
                    <h3>Ordered List Elements</h3>
                    <p>Planting a small garden:</p>
                    <ol id="wd-ol" style={{ listStyleType: "decimal", paddingLeft: 24 }}>
                        <li>Choose a sunny spot for your garden.</li>
                        <li>Prepare the soil by removing weeds and rocks.</li>
                        <li>Add compost or fertilizer to enrich the soil.</li>
                        <li>Select the seeds or plants you want to grow.</li>
                        <li>Plant seeds at the recommended depth.</li>
                        <li>Water gently but thoroughly.</li>
                        <li>Keep the soil moist as plants grow.</li>
                        <li>Harvest and enjoy your fresh produce!</li>
                    </ol>
                </div>
                <div id="favorite-recipe" style={{ marginBottom: 16 }}>
                    <h3>My Favorite Recipe (Ordered List)</h3>
                    <ol id="wd-your-favorite-recipe" style={{ listStyleType: "upper-roman", paddingLeft: 24 }}>
                        <li>Boil pasta in salted water until al dente.</li>
                        <li>Heat olive oil in a pan and garlic.</li>
                        <li>Add tomatoes or sauce and simmer.</li>
                        <li>Drain pasta and toss it with the sauce.</li>
                        <li>Top with basil and grated Parmesan cheese.</li>
                        <li>Serve hot and enjoy your pasta!</li>
                    </ol>
                </div>
                <div id="unordered-list-elements" style={{ marginBottom: 16 }}>
                    <h3>Unordered List Elements</h3>
                    <p>Steps to relax:</p>
                    <ul id="wd-ul" style={{ listStyleType: "circle", paddingLeft: 24 }}>
                        <li>Take a deep breath</li>
                        <li>Listen to music</li>
                        <li>Read a book</li>
                        <li>Go for a walk</li>
                    </ul>
                </div>
                <div id="favorite-books">
                    <h3>Your Favorite Books (Unordered List)</h3>
                    <ul id="wd-your-favorite-books" style={{ listStyleType: "square", paddingLeft: 24 }}>
                        <li>The Great Gatsby</li>
                        <li>To Kill a Mockingbird</li>
                        <li>1984</li>
                        <li>Harry Potter and the Sorcerer's Stone</li>
                        <li>The Hobbit</li>
                    </ul>
                </div>
            </div>

            <div id="table-tags" style={{ marginBottom: 32 }}>
                <h2><b>Table Example</b></h2>
                <table border={1} id="wd-table" style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quiz</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-01-15</td>
                            <td>Q3</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>2024-01-22</td>
                            <td>Q4</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>2024-01-29</td>
                            <td>Q5</td>
                            <td>88</td>
                        </tr>
                        <tr>
                            <td>2024-02-05</td>
                            <td>Q6</td>
                            <td>92</td>
                        </tr>
                        <tr>
                            <td>2024-02-12</td>
                            <td>Q7</td>
                            <td>95</td>
                        </tr>
                        <tr>
                            <td>2024-02-19</td>
                            <td>Q8</td>
                            <td>87</td>
                        </tr>
                        <tr>
                            <td>2024-02-26</td>
                            <td>Q9</td>
                            <td>93</td>
                        </tr>
                        <tr>
                            <td>2024-03-04</td>
                            <td>Q10</td>
                            <td>89</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="images" style={{ marginBottom: 32 }}>
                <h2><b>Images</b></h2>
                <div style={{ display: "flex", gap: 32 }}>
                    <div id="starship-image">
                        <h4>Starship image</h4>
                        <img
                            src="/screenshot-2025-03-15-at-17-22-30-starship-carrying-tesla-bot-to-depart-for-mars-by-end-of-2026-musk-1742034356.webp"
                            alt="Starship"
                            width={300}
                            style={{ border: "1px solid #ccc", borderRadius: 8, objectFit: "cover" }}
                        />
                    </div>
                    <div id="teslabot-image">
                        <h4>Teslabot image</h4>
                        <img
                            src="/666162a44fc3151463d52b64_dfe896_7aca0cc3d4224feea60f21fd6b77ce2e~mv2.png"
                            alt="Teslabot"
                            width={320}
                            style={{ border: "1px solid #ccc", borderRadius: 8, objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>

            <div id="forms" style={{ marginBottom: 32 }}>
                <h2><b>Form Example</b></h2>
                <div style={{
                    padding: 24,
                    maxWidth: 420
                }}>
                    <form id="wd-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none",
                                    minHeight: 60
                                }}
                            ></textarea>
                        </div>
                        <div>
                            <label>Favorite Genre (Radio):</label><br />
                            <input type="radio" id="comedy-radio" name="genre-radio" value="comedy" />
                            <label htmlFor="comedy-radio">Comedy</label>
                            <input type="radio" id="drama-radio" name="genre-radio" value="drama" />
                            <label htmlFor="drama-radio">Drama</label>
                            <input type="radio" id="scifi-radio" name="genre-radio" value="scifi" />
                            <label htmlFor="scifi-radio">SciFi</label>
                            <input type="radio" id="fantasy-radio" name="genre-radio" value="fantasy" />
                            <label htmlFor="fantasy-radio">Fantasy</label>
                        </div>
                        <div>
                            <label>Favorite Genre (Checkbox):</label><br />
                            <input type="checkbox" id="comedy-checkbox" name="genre-checkbox" value="comedy" />
                            <label htmlFor="comedy-checkbox">Comedy</label>
                            <input type="checkbox" id="drama-checkbox" name="genre-checkbox" value="drama" />
                            <label htmlFor="drama-checkbox">Drama</label>
                            <input type="checkbox" id="scifi-checkbox" name="genre-checkbox" value="scifi" />
                            <label htmlFor="scifi-checkbox">SciFi</label>
                            <input type="checkbox" id="fantasy-checkbox" name="genre-checkbox" value="fantasy" />
                            <label htmlFor="fantasy-checkbox">Fantasy</label>
                        </div>
                        <div>
                            <label htmlFor="dropdown">Select one option:</label>
                            <select
                                id="dropdown"
                                name="dropdown"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            >
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="multi-select">Select many options:</label>
                            <select
                                id="multi-select"
                                name="multi-select"
                                multiple
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none",
                                    minHeight: 60
                                }}
                            >
                                <option value="optionA">Option A</option>
                                <option value="optionB">Option B</option>
                                <option value="optionC">Option C</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="salary">Salary:</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating:</label>
                            <input
                                type="range"
                                id="rating"
                                name="rating"
                                min="1"
                                max="10"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "3px 0",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                style={{
                                    border: "2px solid #222",
                                    borderRadius: 5,
                                    padding: "6px 10px",
                                    marginLeft: 10,
                                    background: "#fff",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <button type="submit" style={{
                            border: "2px solid #1976d2",
                            borderRadius: 5,
                            padding: "8px 16px",
                            background: "#1976d2",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginTop: 8
                        }}>Submit</button>
                    </form>
                </div>
            </div>

            <div id="anchor-tag" style={{ marginBottom: 32 }}>
                <h2><b>Anchor Tag</b></h2>
                <a href="https://www.northeastern.edu/" target="_blank" rel="noopener noreferrer">
                    Visit Northeastern University
                </a>
            </div>
        </div>
    );
}