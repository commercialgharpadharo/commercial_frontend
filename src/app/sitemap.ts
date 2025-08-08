import { MetadataRoute } from 'next';
import api from '@/utils/axiosInstace';

interface Property {
    _id: string;
    slug: string
}

type ChangeFrequency = 'daily' | 'monthly' | 'weekly' | 'always' | 'hourly' | 'yearly' | 'never';

async function fetchAllRoomIds(): Promise<string[]> {
    try {
        const response = await api.get('/room/all-rooms');
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data.map((property: Property) => property.slug);
        }
    } catch (error) {
        console.error('Error fetching room IDs for sitemap:', error);
    }
    return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://gharpadharo.com';

    // Fetch all property IDs
    const propertyIds = await fetchAllRoomIds();

    // Static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/properties`,
            lastModified: new Date(),
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFrequency,
            priority: 0.5,
        },
    ];

    // Dynamic routes for properties
    const propertyRoutes = propertyIds.map((id) => ({
        url: `${baseUrl}/properties/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 0.7,
    }));

    return [...staticRoutes, ...propertyRoutes];
}