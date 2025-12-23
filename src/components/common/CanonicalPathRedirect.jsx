import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const MAP = {
    '/PixelPulse': '/pixelpulse',
    '/PixelCompass': '/pixelcompass',
    '/Site': '/site'
}

/**
 * CanonicalPathRedirect
 *
 * Redirects legacy/capitalized paths to their canonical lowercase equivalents
 * using react-router's `useLocation` and `useNavigate`. If the current
 * `location.pathname` matches an entry in `MAP`, navigates to the mapped
 * canonical path preserving the query string and replacing the history entry.
 *
 * No props. Returns `null`.
 */
export default function CanonicalPathRedirect() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const canonical = MAP[location.pathname]
        if (canonical) {
            navigate(`${canonical}${location.search}`, { replace: true })
        }
    }, [location.pathname, location.search, navigate])

    return null
}
