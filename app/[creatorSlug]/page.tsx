"use client";

import React, { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import Image from "next/image";

type Link = {
    id: number;
    title: string;
    url: string;
};

const CreatorLinksPage = ({ params }: { params: { creatorSlug: string } }) => {
    // Authentication
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authUserId, setAuthUserId] = useState<string | undefined>();
    const [authEmail, setAuthEmail] = useState<string | undefined>();
    const [authUsername, setAuthUsername] = useState<string | undefined>();

    useEffect(() => {
        const getAuthUser = async () => {
            const user = await supabase.auth.getUser();
            const userData = user.data.user;

            if (userData) {
                const userId = userData?.id;

                setIsAuthenticated(true);
                setAuthUserId(userId);
                setAuthEmail(userData?.email);

                try {
                    const { data, error } = await supabase
                        .from("users")
                        .select("username")
                        .eq("id", userId);

                    if (error) throw error;
                    setAuthUsername(data[0]?.username);
                } catch (error) {
                    console.log(
                        "Error fetching username of logged in user: ",
                        error
                    );
                }
            }
        };

        getAuthUser();
    }, []);

    // CRUD

    // Read
    const { creatorSlug } = params;
    const [profilePicture, setProfilePicture] = useState<string | undefined>();
    const [creatorId, setCreatorId] = useState<string | undefined>();
    const [creatorLinks, setCreatorLinks] = useState<Link[]>();

    const fetchData = async () => {
        try {
            // Fetch profile picture and creator ID
            const { data: profileData, error: profileError } = await supabase
                .from("users")
                .select("id, profile_picture_url")
                .eq("username", creatorSlug);
            if (profileError) throw profileError;

            const fetchedCreatorId = profileData[0]?.id;
            setProfilePicture(profileData[0]?.profile_picture_url);
            setCreatorId(fetchedCreatorId);
        } catch (error) {
            console.log("Error fetching profile data: ", error);
        }
    };

    useEffect(() => {
        if (creatorSlug) {
            fetchData();
        }
    }, [creatorSlug]);

    const fetchLinks = async () => {
        try {
            // Fetch creator links using creatorId
            const { data: linksData, error: linksError } = await supabase
                .from("links")
                .select("id, title, url")
                .eq("user_id", creatorId);
            if (linksError) throw linksError;

            setCreatorLinks(linksData);
        } catch (error) {
            console.log("Error fetching links data: ", error);
        }
    };

    useEffect(() => {
        if (creatorId) {
            fetchLinks();
        }
    }, [creatorId]);

    // Delete
    const deleteLink = async (linkId: number) => {
        try {
            const { error } = await supabase
                .from("links")
                .delete()
                .eq("id", linkId);

            if (error) throw error;

            // Optionally, you can update the state to reflect the new list of links after deletion.
            // For simplicity, we will re-fetch all links after deletion.
            fetchLinks();
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <div>
            {isAuthenticated && (
                <button
                    className="bg-black text-white p-1 rounded-lg"
                    onClick={async () => await supabase.auth.signOut()}
                >
                    Sign Out
                </button>
            )}
            <h1>Logged in as: {authUsername}!</h1>
            <h1>Logged in email: {authEmail}!</h1>
            {profilePicture && (
                <div>
                    <Image
                        src={profilePicture}
                        alt="profile_picture"
                        width={0}
                        height={0}
                        sizes={"1"}
                        className="w-48 rounded-full"
                        priority
                    />
                </div>
            )}
            <h1>@{creatorSlug}</h1>
            {creatorLinks?.map((link: Link, index: number) => (
                <div key={index}>
                    <h1>{link.title}</h1>
                    <h1>{link.url}</h1>
                    <div className="flex flex-row gap-1">
                        <button
                            className="py-1 px-2 bg-black text-white rounded-lg"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    "Are you sure you want to delete this?"
                                );
                                if (confirmDelete) {
                                    deleteLink(link.id);
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button className="py-1 px-2 bg-black text-white rounded-lg">
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CreatorLinksPage;
