import { ProfileValues } from "@/app/types";
import { redirect } from "next/navigation";

export const getProfile = async (userId: string) => {
    const response = await fetch(`/api/user/profile/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    const data = await response.json();
    return data;
}

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

export const updateProfile = async (userId: string, data: ProfileValues) => {
    try {
        const response = await fetch(`/api/user/profile/${userId}`, {
            method: 'PUT',
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
        console.error('Profile edit error:', error);
        throw error;
    }
}