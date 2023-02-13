import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

const Home = () => {
	const [input, setInput] = useState("");
	const [img, setImg] = useState("");
	const maxRetries = 20;
	const [retry, setRetry] = useState(0);
	const [retryCount, setRetryCount] = useState(maxRetries);
	const [isGenerating, setIsGenerating] = useState(false);
	const [finalPrompt, setFinalPrompt] = useState("");

	const onChange = (e) => {
		setInput(e.target.value);
	};
	const generateAction = async () => {
		console.log("retrycount:", retryCount);
		if (isGenerating && retry === 0) return;
		setIsGenerating(true);
		if (retry > 0) {
			setRetryCount((prevState) => {
				if (retryCount === 0) {
					return 0;
				} else {
					return prevState - 1;
				}
			});
			setRetry(0);
		}
		const finalInput = input.replace(/[Bb]ence/, "bencemesz");

		const res = await fetch("api/generate", {
			method: "POST",
			headers: {
				"Content-type": "image/jpeg",
			},
			body: JSON.stringify({ finalInput }),
		});
		const data = await res.json();
		if (res.status === 503) {
			console.log(data.error);
			setRetry(data.estimated_time);
			return;
		}
		if (!res.ok) {
			console.log(data.error);
			setIsGenerating(false);
			return;
		}
		setFinalPrompt(input);
		setInput("");
		setImg(data.image);
		setIsGenerating(false);
	};

	const sleep = (ms) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	};

	useEffect(() => {
		const runRetry = async () => {
			if (retryCount === 0) {
				console.log(
					`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`
				);
				setRetryCount(maxRetries);
				return;
			}
			console.log(`Trying again in ${retry} seconds.`);
			console.log(`${retryCount} retries remaining out of 20`);
			await sleep(retry * 1000);

			await generateAction();
		};
		if (retry === 0) {
			return;
		}
		runRetry();
	}, [retry]);
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
							Include Bence to use my face or generate anything else you want!
							<span>(within reason😉)</span>
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
							<div className="prompt-loading">
								{isGenerating ? (
									<p>The model might take a while to generate</p>
								) : (
									<p></p>
								)}
							</div>
							<a
								className={
									isGenerating ? "generate-button loading" : "generate-button"
								}
								onClick={generateAction}
							>
								<div className="generate">
									{isGenerating ? (
										<span className="loader"></span>
									) : (
										<p>Generate</p>
									)}
								</div>
							</a>
						</div>
					</div>
				</div>
				{img && (
					<div className="output-content">
						<Image src={img} width={512} height={512} alt={input} />
						<p>{finalPrompt}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
