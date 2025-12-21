import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * GitHubStats React component.
 *
 * Fetches public GitHub user and repository data for the user `fertwbr`,
 * aggregates basic statistics (repo count, total stars, followers) and computes
 * most used languages across repositories. Renders a small dashboard with the
 * user's profile, key stats and a language usage bar.
 *
 * @param {object} props - Component props.
 * @param {object} props.t - Translations / text resources used by the component.
 * @param {object} props.t.stats - Translated labels for stats (repos, stars, followers).
 * @param {string} props.t.title - Section title text.
 * @returns {JSX.Element|null} The GitHub stats section or null while loading.
 */
export default function GitHubStats({ t }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/fertwbr');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/fertwbr/repos?per_page=100&sort=updated');
        const reposData = await reposRes.json();

        if (!Array.isArray(reposData)) throw new Error("Failed to fetch repos");

        const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

        const langMap = {};
        reposData.forEach(repo => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(langMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
            .map(([name, count]) => ({
              name,
              percent: Math.round((count / reposData.length) * 100)
            }));

        setData({
          user: {
            avatar: userData.avatar_url,
            name: userData.name,
            login: userData.login,
            bio: userData.bio,
            url: userData.html_url
          },
          stats: [
            { key: 'repos', value: userData.public_repos, icon: "folder_open", label: t.stats.repos },
            { key: 'stars', value: totalStars, icon: "star", label: t.stats.stars },
            { key: 'followers', value: userData.followers, icon: "groups", label: t.stats.followers },
          ],
          topLanguages
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setData({
          user: { name: "Fernando Vaz", login: "fertwbr", avatar: null, url: "https://github.com/fertwbr" },
          stats: [
            { key: 'repos', value: "35+", icon: "folder_open", label: "Repositories" },
            { key: 'stars', value: "15+", icon: "star", label: "Stars" },
            { key: 'followers', value: "15+", icon: "groups", label: "Followers" },
          ],
          topLanguages: [
            { name: "Kotlin", percent: 60 },
            { name: "JavaScript", percent: 30 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [t.stats]);

  if (loading) return null;

  return (
      <section style={{ maxWidth: '1200px', margin: '0 auto 80px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t.title}</h2>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1.1rem' }}>
            Contributions, statistics and open source activity.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                background: 'var(--md-sys-color-surface-container)',
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--md-sys-color-outline-variant)'
              }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <img
                  src={data.user.avatar || "https://github.com/fertwbr.png"}
                  alt="Profile"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--md-sys-color-outline-variant)' }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{data.user.name}</h3>
                <p style={{ margin: 0, color: 'var(--md-sys-color-primary)', fontFamily: 'monospace' }}>@{data.user.login}</p>
              </div>
            </div>

            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px', lineHeight: 1.6 }}>
              {data.user.bio || "Building things for Android and the Web."}
            </p>

            <a
                href={data.user.url}
                target="_blank"
                rel="noreferrer"
                className="btn-glow"
                style={{ textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
            >
              View GitHub Profile
            </a>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {data.stats.map((stat, i) => (
                  <motion.div
                      key={stat.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        background: 'var(--md-sys-color-surface-container-high)',
                        borderRadius: '20px',
                        padding: '20px 12px',
                        textAlign: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                      }}
                  >
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--md-sys-color-primary)', marginBottom: '8px' }}>
                  {stat.icon}
                </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{stat.label}</span>
                  </motion.div>
              ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  background: 'var(--md-sys-color-surface-container-low)',
                  borderRadius: '24px',
                  padding: '24px',
                  flex: 1,
                  border: '1px solid var(--md-sys-color-outline-variant)'
                }}
            >
              <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                Most Used Languages
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.topLanguages.map(lang => (
                    <div key={lang.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>{lang.name}</span>
                        <span style={{ opacity: 0.6 }}>{lang.percent}%</span>
                      </div>
                      <div style={{
                        width: '100%', height: '8px',
                        background: 'var(--md-sys-color-surface-variant)',
                        borderRadius: '4px', overflow: 'hidden'
                      }}>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            style={{ height: '100%', background: 'var(--md-sys-color-primary)', borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>
  );
}