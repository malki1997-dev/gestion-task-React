import React from "react";

const Unauthorized = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">403 - Accès refusé</h1>
      <p className="text-lg mt-4">Vous navez pas la permission daccéder à cette page.</p>
    </div>
  );
};

export default Unauthorized;
