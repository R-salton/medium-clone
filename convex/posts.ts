import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    authorId: v.id("users"), // must match your schema
    likes: v.optional(v.number()), // optional, default 0
  },
  handler: async (ctx, args) => {
    // Ensure slug is unique
    const existing = await ctx.db
      .query("posts")
      .withIndex("bySlug", q => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`A post with slug "${args.slug}" already exists`);
    }

    // Insert post
    const newPostId = await ctx.db.insert("posts", {
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      content: args.content,
      coverImage: args.coverImage,
      author: args.authorId,
      likes: args.likes ?? 0, // default to 0 if not provided
    });

    return newPostId;
  },
});
