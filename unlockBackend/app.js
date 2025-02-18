import express from 'express';
import supabase from './config/supabase.js';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import pinata from './config/pinata.js';


const app = express();

app.use(cors());
app.use(express.json());

// Get all contents
app.get('/api/contents', async (req, res) => {
  try {
    let query = supabase.from('contents').select('*');

    // Add filters if provided
    if (req.query.category) {
      query = query.eq('category', req.query.category);
    }

    if (req.query.creator) {
      query = query.eq('creator_address', req.query.creator);
    }

    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    query = query.range(start, end);

    // Order by creation date, newest first
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return res.json({
      contents: data,
      page,
      pageSize,
      total: count
    });
  } catch (err) {
    console.error('Error fetching contents:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Get content by ID
app.get('/api/contents/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Content not found' });
      }
      throw error;
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching content:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Create new content
app.post('/api/contents', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      price, 
      creator_address, 
      content_id,
      // preview_image,  // URL dari frontend
      // content_url     // URL dari frontend
    } = req.body;

    // Validasi field yang diperlukan
    if (!title || !description || !category || !creator_address || !content_id) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['title', 'description', 'category', 'creator_address', 'content_id'],
        received: req.body
      });
    }

    // Insert data ke database
    const { data, error } = await supabase
      .from('contents')
      .insert([
        {
          id: content_id,
          creator_address,
          title,
          description,
          category,
          // preview_image,
          // content_url,
          price: price || 0,
          is_free: price === '0' || !price,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return res.status(201).json(data);

  } catch (error) {
    console.error('Error creating content:', error);
    return res.status(500).json({
      error: 'Failed to create content',
      details: error.message
    });
  }
});

// Upload SBT metadata to IPFS
app.post('/api/sbt/metadata', async (req, res) => {
  try {
    const { tokenId, contentId, ownerAddress, name, description, image } = req.body;

    if (!tokenId || !contentId || !ownerAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create metadata JSON
    const metadata = {
      name: name || `Unlock Access #${tokenId}`,
      description: description || `Access token for content #${contentId}`,
      image: image || 'ipfs://QmDefaultImageHash', // Default image if not provided
      creatorId: ownerAddress,
      attributes: [
        {
          trait_type: 'Content ID',
          value: contentId
        },
        {
          trait_type: 'Token Type',
          value: 'Access SBT'
        }
      ]
    };

    // Upload metadata to IPFS
    const result = await pinata.pinJSONToIPFS(metadata);
    const metadataUri = `ipfs://${result.IpfsHash}`;

    // Store in database
    const { data, error } = await supabase
      .from('sbt_metadata')
      .insert([
        {
          token_id: tokenId,
          content_id: contentId,
          owner_address: ownerAddress,
          ipfs_hash: result.IpfsHash,
          metadata_uri: metadataUri
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      ...data,
      metadata
    });
  } catch (err) {
    console.error('Error creating SBT metadata:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Get SBT metadata by token ID
app.get('/api/sbt/metadata/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;

    const { data, error } = await supabase
      .from('sbt_metadata')
      .select('*')
      .eq('token_id', tokenId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Metadata not found' });
      }
      throw error;
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching SBT metadata:', err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});