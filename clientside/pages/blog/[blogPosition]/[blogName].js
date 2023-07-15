import React from 'react';
import { useRouter } from 'next/router';

export default function BlogName() {
    const router = useRouter();
    const { blogPosition, blogName } = router.query;

    return (
        <div>
            <h1>Blog Position: {blogPosition}</h1>
            <h1>Blog Name: {blogName}</h1>
        </div>
    );
}
