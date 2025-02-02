import { ProfileValues } from "@/app/types";

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

export const createProfile = async (profileValues: ProfileValues): Promise<Response> => {
    const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileValues),
    });
    return res;
}

export const updateProfile = async (userId: string, profileValues: ProfileValues): Promise<Response> => {
    const res = await fetch(`/api/user/profile/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileValues),
    });
    return res;
}