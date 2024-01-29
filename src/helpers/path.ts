const paths = {
  homePage() {
    return "/";
  },
  showTopic(slug: string) {
    return `/topics/${slug}`;
  },

  createPost(slug: string) {
    return `/topics/${slug}/posts/new`;
  },

  showPost(slug: string, postID: string) {
    return `/topics/${slug}/posts/${postID}`;
  },
};

export default paths;
