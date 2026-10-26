import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
];

const Auth = () => {
    const { init, isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    const next = new URLSearchParams(location.search).get("next") || "/";

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, navigate, next]);

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="text-center">
                        <h1>Welcome</h1>
                        <h2>Log in to Continue your Journey</h2>
                    </div>

                    {isLoading ? (
                        <button className="auth-button animate-pulse" disabled>
                            Signing you in...
                        </button>
                    ) : auth.isAuthenticated ? (
                        <button className="auth-button" onClick={auth.signOut}>
                            Log Out
                        </button>
                    ) : (
                        <button className="auth-button" onClick={auth.signIn}>
                            Log In
                        </button>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Auth;