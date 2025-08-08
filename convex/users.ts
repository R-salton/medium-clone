import { v, Validator } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/nextjs/server";
import { use } from "react";



export const getUser = query({

    args: {},
    handler: async  ctx =>{
        return await ctx.db.query("users").collect();
    }
})


export const getRecentUsers = query({

    args: {},
    handler: async ctx => {
        return await ctx.db.query("users").order("desc").take(5);
    }
})


export const current = query({
    args: {},
    handler : async ctx => {
        return  await getCurrentUser(ctx);
    }
})

export const upsertFromClerk = internalMutation({
    args: {data: v.any() as Validator<UserJSON>},
    async handler(ctx, {data}){
        const userAttributes = {
            email: data.email_addresses[0].email_address,
            clerkUserId: data.id,
            firstName: data.first_name ?? undefined,
            lastName: data.last_name ?? undefined,
            imageUrl: data.image_url ?? undefined,
        };

        const user = await userByClerkUserId(ctx, userAttributes.clerkUserId);

        if(user == null){
            await ctx.db.insert("users", userAttributes);

        }
        else{
            await ctx.db.patch(user._id, userAttributes);
    }
}


})


export const deleteFromClerk = internalMutation({
    args: {clerkUserId: v.string()},
    async handler(ctx, {clerkUserId}){
        const user = await userByClerkUserId(ctx, clerkUserId);
       if (user !== null) {

    }
    else{
        console.warn(`User with clerkUserId ${clerkUserId} not found.`);

    }
}})


export  async function getCurrentUserOrThrow(ctx: QueryCtx){
    const userRecord = await getCurrentUser(ctx);

    if(!userRecord) throw new Error("Can't get current user");
    return userRecord;
}


export async function getCurrentUser(ctx: QueryCtx){

    const identity  = await ctx.auth.getUserIdentity();

    if(identity == null) return null;

    return await userByClerkUserId(ctx, identity.subject);
}



 async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {

   return ctx.db.query("users").withIndex("byClerkUserId", q => q.eq("clerkUserId", clerkUserId)).first();
 }