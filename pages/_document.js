import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<meta
					property="og:title"
					content="BenceM AI Avatar Generator"
					key="title"
				/>
				<meta
					property="og:description"
					content="Ai Avatar generator"
					key="description"
				/>
				<meta name="twitter:card" content="summary_large_image"></meta>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
