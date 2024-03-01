const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((item) => item.likes);
  const sumOfLikes = likes.reduce((sum, current) => sum + current, 0);

  return sumOfLikes;
};

const favoriteBlog = (blogs) => {
  /* function that finds blog that has most likes */
  let mostLikes = blogs[0];
  blogs.map((item) => {
    if (item.likes > mostLikes.likes) {
      mostLikes = item;
    }
  });

  return mostLikes;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
