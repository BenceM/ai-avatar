import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const Home = () => {
	const [input, setInput] = useState("");
	const onChange = (e) => {
		setInput(e.target.value);
	};
	const generateAction = () => {};
	return (
		<div className="root">
			<Head>
				<title>BenceM AI Avatar Generator</title>
			</Head>
			<div className="container">
				<div className="header">
					<div className="header-title">
						<h1>Create an Avatar of Me!</h1>
					</div>
					<div className="header-subtitle">
						<h2>
							Include "bencemesz" to use my face or generate anything else you
							want (within reason😉)
						</h2>
					</div>
					<div className="prompt-container">
						<input
							type="text"
							className="prompt-box"
							value={input}
							onChange={onChange}
						/>
						<div className="prompt-buttons">
							<a className="generate-button" onClick={generateAction}>
								<div className="generate">
									<p>Generate</p>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
