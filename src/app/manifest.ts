import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SmarRackAPP',
        short_name: 'SmartRack',
        description: 'SmartRack WebApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#e7e5e4',
        theme_color: '#024a70',
        icons: [
            {
                src: '/Smart(3).png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/Smart(3).png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}