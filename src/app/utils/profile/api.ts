import { ProfileValues } from "@/app/types";
import { redirect } from "next/navigation";

export const createProfile = async (data: ProfileValues) => {
    try {
        const response = await fetch('/api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return redirect('/plan')
    } catch (error) {
        console.error('Profile creation error:', error);
        throw error;
    }
}