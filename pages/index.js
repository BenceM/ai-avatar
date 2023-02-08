import Head from "next/head";
import Image from "next/image";

const Home = () => {
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
							want (within reason)
						</h2>
					</div>
					<div className="prompt-container">
						<input type="text" className="prompt-box" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
