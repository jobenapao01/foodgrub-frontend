import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

type Auth0ProviderWithNavigateProps = {
	children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({
	children,
}: Auth0ProviderWithNavigateProps) => {
	const domain = import.meta.env.VITE_AUTH0_DOMAIN;
	const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
	const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

	const navigate = useNavigate();

	//Redirect function for auth0
	const onRedirectCallback = () => {
		navigate('/auth/callback');
	};

	if (!domain || !clientId || !redirectUri || !audience) {
		throw new Error('Unable to initialize auth.');
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{ redirect_uri: redirectUri, audience }}
			onRedirectCallback={onRedirectCallback}
			useRefreshTokens
			cacheLocation='localstorage'
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithNavigate;
