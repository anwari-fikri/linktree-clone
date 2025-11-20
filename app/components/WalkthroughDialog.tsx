'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ChevronsUp } from 'lucide-react';
import DefaultCheckbox from './DefaultCheckbox';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'walkthrough-checkboxes';

export function WalkthroughDialog() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
        {},
    );
    const [isHydrated, setIsHydrated] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (error) {
                console.error(
                    'Failed to parse saved walkthrough state:',
                    error,
                );
            }
        }
        setIsHydrated(true);
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
        }
    }, [checkedItems, isHydrated]);

    const handleCheckChange = (checkboxId: string, checked: boolean) => {
        setCheckedItems((prev) => ({
            ...prev,
            [checkboxId]: checked,
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex w-44 cursor-pointer flex-col items-center gap-1 rounded-t-3xl bg-[#8129D9] p-6 text-white">
                    <ChevronsUp />
                    <h4 className="text-white">Walkthrough</h4>
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll bg-white sm:max-w-[425px] lg:max-w-screen-lg">
                <DialogClose asChild>
                    <Button type="button">
                        <p>Close</p>
                    </Button>
                </DialogClose>
                <DialogHeader className="bg-white text-left">
                    <h3>Walkthrough</h3>
                    <h6>
                        This guide offers step-by-step instructions to showcase
                        the functionalities of this application.
                    </h6>
                    <p className="font-bold">1. Creator profile</p>
                    <DefaultCheckbox
                        id="creator-profile-1"
                        instruction="Click on any one of the creators"
                        checked={checkedItems['creator-profile-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="creator-profile-2"
                        instruction="Try clicking on one of the links"
                        checked={checkedItems['creator-profile-2'] || false}
                        onCheckChange={handleCheckChange}
                    />

                    <p className="font-bold">2. Log in as creator</p>
                    <h3 className="pb-2 text-base">Login</h3>
                    <DefaultCheckbox
                        id="login-1"
                        instruction="Click 'Login' button - located at the top right"
                        checked={checkedItems['login-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="login-2"
                        instruction="Use the provided login credential"
                        checked={checkedItems['login-2'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <h3 className="pb-2 text-base ">Add new link</h3>
                    <DefaultCheckbox
                        id="add-link-1"
                        instruction="Go to test_user admin page - it's at the top right profile button"
                        checked={checkedItems['add-link-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="add-link-2"
                        instruction="Enter the URL of your new link"
                        checked={checkedItems['add-link-2'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="add-link-3"
                        instruction="Try your newly added link"
                        checked={checkedItems['add-link-3'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <h3 className="pb-2 text-base ">Edit link</h3>
                    <DefaultCheckbox
                        id="edit-link-1"
                        instruction="Click the pencil icon on your link"
                        checked={checkedItems['edit-link-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="edit-link-2"
                        instruction="Edit your link"
                        checked={checkedItems['edit-link-2'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="edit-link-3"
                        instruction="Click the tick button when you are done"
                        checked={checkedItems['edit-link-3'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <h3 className="pb-2 text-base ">Delete link</h3>
                    <DefaultCheckbox
                        id="delete-link-1"
                        instruction="On the right side of the link, press the trashcan icon to delete"
                        checked={checkedItems['delete-link-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <h3 className="pb-2 text-base ">Change profile picture</h3>
                    <DefaultCheckbox
                        id="profile-pic-1"
                        instruction="After clicking the pencil button on your profile picture, press 'Choose File'"
                        checked={checkedItems['profile-pic-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="profile-pic-2"
                        instruction="Select any image you want to use for profile picture then upload. You will see your new profile picture"
                        checked={checkedItems['profile-pic-2'] || false}
                        onCheckChange={handleCheckChange}
                    />

                    <p className="font-bold">3. Sign up as creator</p>
                    <h3 className="pb-2 text-base ">Sign Up</h3>
                    <DefaultCheckbox
                        id="signup-1"
                        instruction="Click 'Login' button"
                        checked={checkedItems['signup-1'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="signup-2"
                        instruction="On Login page, Click 'Sign Up' button"
                        checked={checkedItems['signup-2'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="signup-3"
                        instruction="Enter your username, email and password"
                        checked={checkedItems['signup-3'] || false}
                        onCheckChange={handleCheckChange}
                    />
                    <DefaultCheckbox
                        id="signup-4"
                        instruction="You should be redirected to your admin page and be able to do all the things from previous tutorial"
                        checked={checkedItems['signup-4'] || false}
                        onCheckChange={handleCheckChange}
                    />

                    {/* <div className="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                        <strong className="font-bold">Warning!</strong>
                        <p>
                            Please use throwaway email and password because I do
                            not even know how secure my app is lol
                        </p>
                    </div> */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
