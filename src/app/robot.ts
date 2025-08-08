import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin-dashboard/ ,/owner-dashboard/ ,/seeker-dashboard/',
        },
        sitemap: 'https://www.gharpadharo.com/sitemap.xml',
    }
}