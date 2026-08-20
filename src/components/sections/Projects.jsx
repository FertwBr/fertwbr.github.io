import {motion, useMotionValue, useTransform, useSpring} from "framer-motion";
import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";

/**
 * Projects section component.
 *
 * @param {Object} props
 * @param {Object} props.t
 * @returns {JSX.Element}
 */
export default function Projects({t}) {
    return (
        <section id="projects" className="projects-container">
            <div className="projects-header">
                <h2 className="projects-title">
                    {t.title}
                </h2>
                <p className="projects-subtitle">
                    {t.subtitle}
                </p>
            </div>

            <div className="projects-list">
                {t.items.map((project, index) => (
                    <ProjectCard key={project.id} project={project} t={t} index={index}/>
                ))}
            </div>
        </section>
    );
}

/**
 * Individual Project Card component.
 * Features a 3D tilt effect on the visual container and alternating layout.
 *
 * @param {Object} props
 * @param {Object} props.project
 * @param {Object} props.t
 * @param {number} props.index
 * @returns {JSX.Element}
 */
function ProjectCard({project, t, index}) {
    const ref = useRef(null);
    const navigate = useNavigate();

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    /**
     * @param {React.MouseEvent<HTMLDivElement>} e
     */
    const handleMouseMove = (e) => {
        if (window.innerWidth < 900) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isInternalLink = project.link && project.link.startsWith('/');

    /**
     * @param {React.MouseEvent<HTMLDivElement>} e
     */
    const handleCardClick = (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;

        if (isInternalLink) {
            navigate(project.link);
        } else {
            window.open(project.link, '_blank');
        }
    };

    const ViewButton = () => {
        const content = (
            <>
                {t.view_project} <span className="material-symbols-outlined btn-icon-small">arrow_forward</span>
            </>
        );

        if (isInternalLink) {
            return (
                <Link to={project.link} className="btn-glow project-btn">
                    {content}
                </Link>
            );
        }

        return (
            <a
                href={project.link}
                className="btn-glow project-btn"
                target="_blank"
                rel="noopener noreferrer"
            >
                {content}
            </a>
        );
    };

    // Alternate layout for even/odd items
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-50px"}}
            transition={{duration: 0.6}}
            className={`project-card-wrapper ${isReversed ? 'reversed' : ''}`}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    background: `linear-gradient(135deg, var(--md-sys-color-${project.color}-container), var(--md-sys-color-surface-container))`
                }}
                className="glass-card project-card-visual"
            >
                {/* Visual Layers: Pattern, Glow, then the actual 3D icon */}
                <div className="project-card-pattern"></div>

                {project.icon_url && (
                    <div
                        className="project-card-glow"
                        style={{ backgroundImage: `url(${project.icon_url})` }}
                    ></div>
                )}

                <div className="project-card-3d-inner">
                    {project.icon_url ? (
                        <img
                            src={project.icon_url}
                            alt={project.title}
                            className="project-app-icon"
                        />
                    ) : (
                        <div
                            className="project-generic-wrapper"
                            style={{ background: `var(--md-sys-color-${project.color}-container)` }}
                        >
                            <span
                                className="material-symbols-outlined project-generic-icon"
                                style={{ color: `var(--md-sys-color-on-${project.color}-container)` }}
                            >
                                {project.icon}
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>

            <div className="project-card-content">
                <span className="project-card-category" style={{
                    color: `var(--md-sys-color-${project.color})`
                }}>
                    {project.category}
                </span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">
                    {project.desc}
                </p>

                <div className="project-tags-container">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="project-actions">
                    <ViewButton/>
                    <a href={project.repo} target="_blank" rel="noreferrer" className="btn-outline project-btn">
                        {t.source_code} <span className="material-symbols-outlined btn-icon-small">code</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}