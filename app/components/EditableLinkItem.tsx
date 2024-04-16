import React, { useEffect, useState } from 'react';
import {
    Check,
    GripVertical,
    Pencil,
    ToggleLeft,
    ToggleRight,
    X,
} from 'lucide-react';
import { Link } from '../types/linkTypes';
import { updateLinkTitle, updateLinkUrl } from '../utils/profile';
import { DeleteLinkButton } from './DeleteLinkButton';

const EditableLinkItem = ({ link }: { link: Link }) => {
    const [preSubmittedTitle, setPreSubmittedTitle] = useState(link.title);
    const [editableTitle, setEditableTitle] = useState(link.title);
    const [isEditing, setIsEditing] = useState(false);
    const [editableUrl, setEditableUrl] = useState(link.url);
    const [preSubmittedUrl, setPreSubmittedUrl] = useState(link.url);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableUrl(e.target.value);
    };

    const handleEditToggle = () => {
        if (isEditing) {
            setEditableTitle(preSubmittedTitle);
            setEditableUrl(preSubmittedUrl);
        } else {
            setPreSubmittedTitle(editableTitle);
            setPreSubmittedUrl(editableUrl);
        }
        setIsEditing(!isEditing);
    };

    const handleEditConfirm = () => {
        setIsEditing(false);
        setPreSubmittedTitle(editableTitle);
        setPreSubmittedUrl(editableUrl);
        updateLinkTitle(link.id, editableTitle);
        updateLinkUrl(link.id, editableUrl);
    };

    const CharacterLimitedText = ({
        text,
        limit,
    }: {
        text: string;
        limit: number;
    }) => {
        const [truncatedText, setTruncatedText] = useState(text);

        useEffect(() => {
            if (text.length > limit) {
                setTruncatedText(text.slice(0, limit) + '...');
            } else {
                setTruncatedText(text);
            }
        }, [text, limit]);

        return truncatedText;
    };

    return (
        <div className="flex w-full items-center justify-between rounded-2xl border bg-white p-2 px-6 py-9 shadow">
            <div className="flex flex-col items-center">
                {/* <GripVertical /> */}
                <div className="flex basis-5/6 flex-col gap-2 ">
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editableTitle}
                                onChange={handleTitleChange}
                                className="w-full rounded-lg p-1"
                            />
                        ) : (
                            <h6>
                                <CharacterLimitedText
                                    text={editableTitle}
                                    limit={26}
                                />
                            </h6>
                        )}
                        {isEditing ? (
                            <div className="flex gap-2 pr-2">
                                <X
                                    className="w-4 cursor-pointer"
                                    onClick={handleEditToggle}
                                />
                                <Check
                                    className="w-4 cursor-pointer"
                                    onClick={handleEditConfirm}
                                />
                            </div>
                        ) : (
                            <Pencil
                                className="w-4 cursor-pointer"
                                onClick={handleEditToggle}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <small>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editableUrl}
                                    onChange={handleUrlChange}
                                    className="w-full rounded-lg p-1"
                                />
                            ) : (
                                <CharacterLimitedText
                                    text={editableUrl}
                                    limit={30}
                                />
                            )}
                        </small>
                    </div>
                </div>
            </div>
            {!!!isEditing && (
                <div className="flex basis-1/6 justify-end gap-2">
                    {/* {link.show ? <ToggleRight /> : <ToggleLeft />} */}
                    <DeleteLinkButton linkId={link.id} />
                </div>
            )}
        </div>
    );
};

export default EditableLinkItem;
