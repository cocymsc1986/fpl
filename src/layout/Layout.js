import { ThemeProvider, createGlobalStyle } from "styled-components/macro";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { theme as themeProperties } from '../styles/theme';

export const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={themeProperties}>
			<GlobalStyle />
			<Header />
			<main>
				<div>{children}</div>
			</main>
			<Footer />
		</ThemeProvider>
	);
};

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: ${({ theme }) => theme.font.familyDefault};
		font-size: ${({ theme }) => theme.font.size.body};
		color: ${({ theme }) => theme.colours.black};
	};

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		};
	};
`;