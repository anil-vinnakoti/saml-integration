export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/auth/saml/login";
  };

  return <button onClick={handleLogin}>Login with SSO</button>;
}
