"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import AuthStore from "../interfaces/AuthStore";
import { useRouter } from "next/navigation";

const Header = observer(() => {
    const router = useRouter();
    async function signOut() {
        try {
            await AuthStore.handleSignOut();

            if (!!!AuthStore.isAuthenticated) {
                console.log("Logged out");
                router.push("/login");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        setIsUserLoggedIn(AuthStore.isAuthenticated);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AuthStore.isAuthenticated]);

    return (
        <div className="px-10 flex justify-between items-center h-14 bg-black text-white">
            <Link href={"/"}>
                <h2>Linktree Clone</h2>
            </Link>

            {isUserLoggedIn ? (
                <>
                    <Link href={`/${AuthStore.authUsername}`}>
                        <h2>
                            {AuthStore.authEmail} / {AuthStore.authUsername}
                        </h2>
                    </Link>
                    <button
                        className="bg-red-600 text-white px-2 py-1 rounded-lg"
                        onClick={signOut}
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <Link href={`/login`}>
                        <button>Log in</button>
                    </Link>
                </>
            )}
        </div>
    );
});

export default Header;
