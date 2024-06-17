import React, { useState } from "react";

const AboutPage = () => {
  const [first, setfirst] = useState();

  console.log(first);

  return (
    <div>
      <input type="text" onChange={(e) => setfirst(e.target.value)} />
    </div>
  );
};

export default AboutPage;
