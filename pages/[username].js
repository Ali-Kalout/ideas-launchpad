import React from 'react';
import Head from 'next/head';
import connectDB from './../database/connectDB';
import User from './../database/models/user';
import Post from './../database/models/post';
import { Container } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Profile from './../components/profile/Profile';

const ProfilePage = ({ user, posts }) => {
    return (
        <div>
            <Head>
                <title>{user?.username} ({user?.fullName})</title>
            </Head>
            {!user ? (
                <span id='centery'><CircularProgress style={{ width: '100px', height: '100px' }} /></span>
            ) : (
                <Container maxWidth='md' className='mt-4'>
                    <Profile user={user} posts={posts} />
                </Container>
            )}
        </div>
    );
}

export const getServerSideProps = async context => {
    await connectDB();
    const { username, tab } = context.query;
    let user = await User.findOne({ username: username }), posts = [];

    if (tab === 'posts') {
        posts = await Post.find({ creator: String(user._id) }).sort({ _id: -1 });

        if (posts?.length === 0)
            posts = 'None';
    }

    return {
        props: {
            user: {
                id: String(user?._id),
                username: user?.username || '',
                bio: user?.bio || '',
                fullName: user?.fullName,
                tagsFrequency: user?.tagsFrequency || {},
                github: user?.github || null,
                twitter: user?.twitter || null,
                personal: user?.personal || null
            },
            posts: posts === 'None' ? 'None' : posts?.map(post => ({
                _id: String(post?._id),
                title: post?.title,
                description: post?.description,
                upVotes: post?.upVotes,
                downVotes: post?.downVotes,
                tags: post?.tags,
                createdAt: String(post?.createdAt),
                creator: post?.creator,
                status: post?.status ? post?.status : '',
                creatorUsername: post?.creatorUsername ? post?.creatorUsername : ''
            }))
        }
    };
}

export default ProfilePage;