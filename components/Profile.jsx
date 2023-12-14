"use client";

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section>
      <h1 className="head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
