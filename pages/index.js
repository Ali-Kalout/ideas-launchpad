import { Container } from '@material-ui/core';
import Head from 'next/head';
import Post from './../database/models/post';
import connectDB from './../database/connectDB';
import Posts from './../components/post/Posts';
import Search from './../components/search/Search';
import _ from 'lodash';

// TODO: add contibuter list, only the proposer(creator) can modify them

const Index = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Container maxWidth="lg" className="p-3">
                <Search />
                <Posts posters={posts} />
            </Container>
        </>
    );
}

export const getServerSideProps = async context => {
    let { search, tags, order_by } = context?.query, posts = [], orderKey, orderValue;
    tags = tags?.split(',')?.filter(tag => tag?.length > 0)?.map(tag => _?.lowerCase(tag)?.split(' ')?.join(''));
    await connectDB();

    if (order_by) {
        const vals = order_by?.split('_');
        orderKey = vals[0];
        orderValue = vals[1];
    } else {
        orderKey = 'date';
        orderValue = -1;
    }

    if (!search?.length && !tags?.length) {
        // const page = 1, LIMIT = 12, startIndex = (Number(page) - 1) * LIMIT;
        posts = orderKey === 'date' ? (
            orderValue === '1' ? await Post.find().sort({ _id: 1 }) : await Post.find().sort({ _id: -1 })
        ) : (
            orderKey === 'votes' ? (
                orderValue === '1' ? await Post.find().sort({ _id: 1 }) : await Post.find().sort({ _id: -1 })
            ) : ([])
        );

    } else {
        const regex = new RegExp(search, 'i');
        posts = await Post.find({ $or: [{ title: regex }, { description: regex }, { tags: { $in: tags } }] });
    }

    return {
        props: {
            posts: posts?.map(post => ({
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
    }
}

export default Index;