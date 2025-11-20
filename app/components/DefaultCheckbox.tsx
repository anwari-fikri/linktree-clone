'use client';

import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

interface DefaultCheckboxProps {
    id: string;
    instruction: string;
    checked?: boolean;
    onCheckChange?: (id: string, checked: boolean) => void;
}

const DefaultCheckbox = ({
    id,
    instruction,
    checked = false,
    onCheckChange,
}: DefaultCheckboxProps) => {
    const handleCheckedChange = (newChecked: boolean) => {
        onCheckChange?.(id, newChecked);
    };

    return (
        // <div className="flex items-center mb-1">
        //     <input
        //         id={uniqueId}
        //         type="checkbox"
        //         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //     />
        //     <label
        //         htmlFor={uniqueId}
        //         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        //     >
        //         {instruction}
        //     </label>
        // </div>
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={handleCheckedChange}
            />
            <label htmlFor={id}>
                <p>{instruction}</p>
            </label>
        </div>
    );
};

export default DefaultCheckbox;
