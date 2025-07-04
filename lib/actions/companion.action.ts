'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"
import { error } from "console"
import { features } from "process"
import { revalidatePath } from "next/cache"

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author })
        .select()
        .single()
    if (error || !data) throw new Error(error?.message || 'Failed to create a Companion')

    return data[0]

}
// Consider this as blackbox for now 
// This part is used to get all the companions on companion page 
//It also has the main logic for search filter and search text feature
export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if (error) throw new Error(error.message);

    return companions;
}

// Gives single companion
export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id)

    if (error) return console.log(error)

    return data[0]
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })
    console.log(companionId)
    console.log(error)
    if (error) throw new Error(error.message);
    return data;
}
export const getRecentSession = async (limit: 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('session_history')
        .select(`companion:companion_id(*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    return data?.map(({ companion }) => companion)
}

export const getUserSession = async (userId: string, limit: 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('session_history')
        .select(`companion:companion_id(*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    return data?.map(({ companion }) => companion)
}
export const getUserCompanion = async (userId: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if (error) throw new Error(error.message);

    return data;
}

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: 'pro' })) return true;
  if (has({ feature: '3_companion_limit' })) limit = 3;
  else if (has({ feature: '10_companion_limit' })) limit = 10;

  const { count, error } = await supabase
    .from('companions')
    .select('*', { count: 'exact', head: true })
    .eq('author', userId);

  if (error) throw new Error(error.message);
  console.log(count)

  if (count === null) throw new Error('Failed to retrieve companion count');
  return count < limit;
};


