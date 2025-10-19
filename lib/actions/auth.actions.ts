'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({fullName , email , password , riskTolerance , preferredIndustry, country, investmentGoals} : SignUpFormData)=>{
    try {
        const response = await auth.api.signUpEmail({
            body: { email , password , name: fullName},
        })

        if (response){
            await inngest.send({
                name:'app/user.created',
                data:{
                    email,
                    name:fullName,
                    country,
                    preferredIndustry,
                    investmentGoals,
                    riskTolerance
                }
            })
        }

        return {success:true , data : response};
    } catch (err) {
        console.log('Sign Up failed' , err);
        return {success: false, error: 'Sign Up failed'};
    }
}

export const signInWithEmail = async ({ email , password} : SignInFormData)=>{
    try {
        const response = await auth.api.signInEmail({
            body: { email , password },
        })

        return {success:true , data : response};
    } catch (err) {
        console.log('Sign In failed' , err);
        return {success: false, error: 'Sign In failed'};
    }
}

export const signOut = async ()=>{
    try {
        await auth.api.signOut({headers: await headers()})
    } catch (err){
        console.log('Sign Out failed' , err);
        return {success: false, error: 'Sign Out failed'};
    }
}