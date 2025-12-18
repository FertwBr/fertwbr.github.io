import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function GitHubStats({ t }) {
  const [stats, setStats] = useState([
    { key: 'repos', value: "...", icon: "folder_open", color: "primary" },
    { key: 'stars', value: "...", icon: "star", color: "tertiary" },
    { key: 'followers', value: "...", icon: "groups", color: "secondary" },
  ]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/fertwbr');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/fertwbr/repos?per_page=100');
        const reposData = await reposRes.json();
        
        const totalStars = Array.isArray(reposData) 
          ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
          : 0;

        setStats([
          { key: 'repos', value: userData.public_repos, icon: "folder_open", color: "primary" },
          { key: 'stars', value: totalStars, icon: "star", color: "tertiary" },
          { key: 'followers', value: userData.followers, icon: "groups", color: "secondary" },
        ]);

      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setStats([
            { key: 'repos', value: "35+", icon: "folder_open", color: "primary" },
            { key: 'stars', value: "15+", icon: "star", color: "tertiary" },
            { key: 'followers', value: "15+", icon: "groups", color: "secondary" },
        ]);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto 120px auto', padding: '0 24px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2.5rem' }}>{t.title}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            style={{
              background: 'var(--md-sys-color-surface-container)',
              padding: '32px 24px',
              borderRadius: '24px',
              textAlign: 'center',
              border: '1px solid var(--md-sys-color-outline-variant)',
              cursor: 'default'
            }}
          >
            <div style={{
              width: '56px', height: '56px', margin: '0 auto 16px auto', borderRadius: '50%',
              background: `var(--md-sys-color-${stat.color}-container)`,
              color: `var(--md-sys-color-on-${stat.color}-container)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{stat.icon}</span>
            </div>
            
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0', color: 'var(--md-sys-color-on-surface)' }}>
              {stat.value}
            </h3>
            
            <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 500 }}>
              {t.stats[stat.key] || "Followers"} 
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}