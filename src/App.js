import React from "react";
import { Head, Loading, Router } from "react-static";
import { hot } from "react-hot-loader";

import Footer from "./components/Footer";
import PageContainer from "./containers/PageContainer";

import "./app.css";
import loadCss from "./loadCss";

const App = () => (
	<React.Fragment>
		<Head key="head">
			<link href="/image/favicon.png" rel="shortcut icon" />
			<style>{loadCss}</style>
			<script
				defer
				data-domain="poee.lol"
				src="https://plausible.io/js/plausible.js"
			></script>
		</Head>
		<Router key="router">
			<Loading>
				{({ loading }) => {
					if (loading) {
						return (
							<div className="heart">
								<div />
							</div>
						);
					}
					return (
						<React.Fragment>
							<PageContainer key="container" />,
							<Footer key="footer" />
						</React.Fragment>
					);
				}}
			</Loading>
		</Router>
	</React.Fragment>
);

export default hot(module)(App);
