import { useState, useEffect } from 'react';
import { mockProjects } from '../data/mockProjects';

export function useProjects() {
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local'); // 'sheets' | 'airtable' | 'local'

  useEffect(() => {
    let isMounted = true;

    async function fetchRemoteProjects() {
      const googleSheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const airtableKey = import.meta.env.VITE_AIRTABLE_API_KEY;
      const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

      try {
        // 1. Check Google Sheets API
        if (googleSheetId && googleApiKey) {
          const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetId}/values/A2:I?key=${googleApiKey}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Google Sheets HTTP ${res.status}`);
          const data = await res.json();
          if (data.values && data.values.length > 0) {
            const mapped = data.values.map((row, idx) => ({
              id: row[0] || `quest-${idx + 1}`,
              title: row[1] || "Misión sin título",
              description: row[2] || "",
              tagline: row[2] ? row[2].slice(0, 75) + "..." : "",
              technologies: row[3] ? row[3].split(',').map(t => t.trim()) : [],
              year: parseInt(row[4], 10) || 2026,
              githubUrl: row[5] || "#",
              demoUrl: row[6] || "#",
              imageUrl: row[7] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
              featured: String(row[8]).toLowerCase() === 'true',
              category: "Quest",
              difficultyRank: "A-Rank"
            }));
            if (isMounted) {
              setProjects(mapped);
              setSource('sheets');
              setLoading(false);
              return;
            }
          }
        }

        // 2. Check Airtable API
        if (airtableKey && airtableBaseId) {
          const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/Projects`, {
            headers: { Authorization: `Bearer ${airtableKey}` }
          });
          if (!res.ok) throw new Error(`Airtable HTTP ${res.status}`);
          const data = await res.json();
          if (data.records && data.records.length > 0) {
            const mapped = data.records.map(rec => ({
              id: rec.id,
              title: rec.fields.title || rec.fields.quest_title || "Misión",
              tagline: rec.fields.tagline || "",
              description: rec.fields.description || rec.fields.quest_lore || "",
              technologies: Array.isArray(rec.fields.technologies) 
                ? rec.fields.technologies 
                : (rec.fields.technologies || "").split(',').map(t => t.trim()),
              year: rec.fields.year || 2026,
              githubUrl: rec.fields.github_url || "#",
              demoUrl: rec.fields.demo_url || "#",
              imageUrl: rec.fields.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
              featured: Boolean(rec.fields.featured),
              category: rec.fields.category || "Fullstack",
              difficultyRank: rec.fields.difficulty_rank || "A-Rank"
            }));
            if (isMounted) {
              setProjects(mapped);
              setSource('airtable');
              setLoading(false);
              return;
            }
          }
        }

        // 3. Fallback to Local Mock Data
        if (isMounted) {
          setProjects(mockProjects);
          setSource('local');
          setLoading(false);
        }
      } catch (err) {
        console.warn("No se pudo cargar desde API remota, usando datos locales:", err.message);
        if (isMounted) {
          setProjects(mockProjects);
          setSource('local');
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchRemoteProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, error, source };
}
