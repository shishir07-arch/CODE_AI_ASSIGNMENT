const { getSupabaseClient } = require('../config/supabase');

const getUserByEmail = async (email) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('users').select('*').eq('email', email).maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

const createUser = async ({ name, email, password }) => {
  const supabase = getSupabaseClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        name,
        email,
        password,
        created_at: now,
        updated_at: now
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const findUserById = async (id) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  getUserByEmail,
  createUser,
  findUserById
};
