"use server";
import axios from '@/utils/axios/server';
import { redirect } from 'next/navigation';

const logout = async (userType: string) => {
    await axios.post(`/${userType}/logout`);

    redirect(`/${userType}/login`);
};

export default logout;