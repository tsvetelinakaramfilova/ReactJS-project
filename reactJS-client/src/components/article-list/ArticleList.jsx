import ArticleListItem from "./article-list-item/ArticleListItem";

export default function ArticleList() {
  const articles = [
    {
      article_id: "61731621b7c322000963d550",
      name: "An Introduction to JSON",
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20191206140918/JSON6.png",
        "https://coursework.vschool.io/content/images/2016/04/json-banner-750x220.jpg",
      ],
      description:
        "This article provides a comprehensive introduction to JSON (JavaScript Object Notation).",
      dateOfEntry: "2022-10-20T08:00:00.000Z",
      timeRead: 10,
      tags: ["JSON", "JavaScript", "Data Serialization"],
      comments: [
        {
          date: "2022-10-20T08:00:00.000Z",
          text: "Great product! I highly recommend it.",
          user: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password123",
          },
        },
        {
          date: "2022-11-20T08:00:00.000Z",
          text: "Excellent service! The product arrived on time and exceeded my expectations.",
          user: {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@example.com",
            password: "password123",
          },
        },
      ],
    },
  ];

  return (
    <>
      {articles.map((article) => {
        return <ArticleListItem key={article.article_id} article={article} />;
      })}
    </>
  );
}
