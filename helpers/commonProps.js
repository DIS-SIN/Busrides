import PropTypes from 'prop-types';

export let cp_t = PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]));

export let cp_author = PropTypes.shape({
    bio: PropTypes.string,
    cover_image: PropTypes.string,
    id: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    profile_image: PropTypes.string,
    slug: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    url: PropTypes.string,
    website: PropTypes.string
});

export let cp_tag = PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    feature_image: PropTypes.string,
    url: PropTypes.string
});

export let cp_apiOptions = PropTypes.shape({
    filter: PropTypes.string.isRequired,
    include: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired
});

export let cp_postsMeta = PropTypes.shape({
    pagination: PropTypes.shape({
        limit: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        pages: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
    })
});

export let cp_post = PropTypes.shape({
    authors: PropTypes.arrayOf(cp_author).isRequired,
    comment_id: PropTypes.string,
    created_at: PropTypes.string,
    excerpt: PropTypes.string,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    html: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    primary_author: cp_author.isRequired,
    primary_tag: cp_tag.isRequired,
    published_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    slug: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(cp_tag).isRequired,
    title: PropTypes.string.isRequired,
    updated_at: PropTypes.string,
    url: PropTypes.string,
    uuid: PropTypes.string
});

export let cp_page = PropTypes.shape({
    comment_id: PropTypes.string,
    created_at: PropTypes.string,
    excerpt: PropTypes.string,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    html: PropTypes.string.isRequired,
    id: PropTypes.string,
    page: PropTypes.bool,
    published_at: PropTypes.string,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updated_at: PropTypes.string,
    url: PropTypes.string,
    uuid: PropTypes.string
});

export let cp_searchResults = PropTypes.shape({
    posts: PropTypes.arrayOf(cp_post).isRequired,
    searchTerm: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
});

export let cp_settings = PropTypes.shape({
    title: PropTypes.string,
    cover_image: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    logo: PropTypes.string,
    navigation: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    url: PropTypes.string
});

export let cp_children = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
]);