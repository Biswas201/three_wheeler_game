import { supabase } from '../../../supabase/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { score } = req.body;
    
    const { data, error } = await supabase
      .from('scores')
      .insert([{ score }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Score saved successfully' });
  }
}
